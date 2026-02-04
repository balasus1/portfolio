import { GoogleGenerativeAI } from "@google/generative-ai";
import { profileData, skills, experiences, projects, certifications, education } from "@/data/portfolioData";
import { chatbotData } from "@/data/chatbotData";

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "");

// Build comprehensive context from portfolio data
const buildSystemContext = (): string => {
    const skillsList = skills.map(s => `${s.name} (${s.category}, ${s.level}%)`).join(", ");

    const experiencesList = experiences.map(exp =>
        `${exp.position} at ${exp.company} (${exp.startDate} - ${exp.endDate}): ${exp.description}`
    ).join("\n");

    const projectsList = projects.map(p =>
        `${p.title} for ${p.client} (${p.period}): ${p.description}. Tech: ${p.technologies.join(", ")}`
    ).join("\n");

    const certsList = certifications.map(c => `${c.name} from ${c.issuer} (${c.year})`).join(", ");

    return `You are an AI assistant for ${profileData.name}'s portfolio website. You help recruiters and visitors learn about his professional background.

## PROFILE
Name: ${profileData.name}
Title: ${profileData.title}
Location: ${profileData.location}
Email: ${profileData.email}
LinkedIn: ${profileData.linkedin}
GitHub: ${profileData.github}

## BIO
${profileData.bio}

## TOTAL EXPERIENCE
${chatbotData.totalExperience} of professional experience in software development

## CURRENT POSITION
${chatbotData.currentRole} at ${chatbotData.currentCompany}

## AVAILABILITY & NOTICE PERIOD
- Notice Period: ${chatbotData.noticePeriod}
- Available for Remote Work: ${chatbotData.availableForRemote ? "Yes" : "No"}
- Preferred Work Mode: ${chatbotData.preferredWorkMode}

## EXPECTED COMPENSATION
${chatbotData.expectedCompensation} (Negotiable: ${chatbotData.compensationNegotiable ? "Yes" : "No"})

## SKILLS
${skillsList}

## WORK EXPERIENCE
${experiencesList}

## KEY PROJECTS
${projectsList}

## EDUCATION
${education.degree} in ${education.field} from ${education.institution} (${education.period})

## CERTIFICATIONS
${certsList}

## ADDITIONAL CONTEXT
${chatbotData.additionalContext}

## RESUME
${chatbotData.resumeLocation}

## INSTRUCTIONS
- Be helpful, professional, and friendly
- Answer questions about experience, skills, projects, and availability
- If asked about resume, mention it's available in the navigation menu
- Keep responses concise but informative (2-4 sentences typically)
- Use the provided data to answer questions accurately
- If you don't know something specific, say so politely
- Format responses nicely with bullet points when listing multiple items`;
};

// Chat session management
let chatSession: ReturnType<ReturnType<typeof genAI.getGenerativeModel>["startChat"]> | null = null;
let chatHistory: Array<{ role: string; content: string }> = [];

// Initialize or get chat session
const getChatSession = () => {
    if (!chatSession) {
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: buildSystemContext(),
        });

        chatSession = model.startChat({
            generationConfig: {
                temperature: 0.7,
                topP: 0.95,
                topK: 40,
                maxOutputTokens: 500,
            },
        });
    }
    return chatSession;
};

// Reset chat session
export const resetChat = () => {
    chatSession = null;
    chatHistory = [];
};

// Fallback: Use Groq API (free tier available)
const sendMessageGroq = async (userMessage: string): Promise<string> => {
    const groqApiKey = import.meta.env.VITE_GROQ_API_KEY;
    
    if (!groqApiKey) {
        throw new Error("Groq API key not configured");
    }

    const systemPrompt = buildSystemContext();
    
    // Add user message to history
    chatHistory.push({ role: "user", content: userMessage });

    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${groqApiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "llama-3.1-8b-instant", // Fast and free model
                messages: [
                    { role: "system", content: systemPrompt },
                    ...chatHistory.slice(-10), // Keep last 10 messages for context
                ],
                temperature: 0.7,
                max_tokens: 500,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`Groq API error: ${response.status} - ${errorData.error?.message || response.statusText}`);
        }

        const data = await response.json();
        const assistantMessage = data.choices[0]?.message?.content || "Sorry, I couldn't generate a response.";
        
        // Add assistant response to history
        chatHistory.push({ role: "assistant", content: assistantMessage });
        
        return assistantMessage;
    } catch (error) {
        console.error("Groq API error:", error);
        throw error;
    }
};

// Send message to Gemini with fallback to Groq
export const sendMessage = async (userMessage: string): Promise<string> => {
    const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const groqApiKey = import.meta.env.VITE_GROQ_API_KEY;

    // Check if any API key is configured
    if (!geminiApiKey && !groqApiKey) {
        return "⚠️ Chatbot is not configured. Please add either VITE_GEMINI_API_KEY or VITE_GROQ_API_KEY to your .env file.\n\nYou can get a free Groq API key at: https://console.groq.com/";
    }

    // Try Gemini first if API key is available
    if (geminiApiKey) {
        try {
            const session = getChatSession();
            const result = await session.sendMessage(userMessage);
            const response = result.response.text();
            
            // Add to history for fallback
            chatHistory.push({ role: "user", content: userMessage });
            chatHistory.push({ role: "assistant", content: response });
            
            return response;
        } catch (error) {
            console.error("Gemini API error:", error);
            
            // Extract detailed error information
            let errorMessage = "Unknown error";
            let errorCode = "";
            
            if (error instanceof Error) {
                errorMessage = error.message;
                
                // Check for specific error types
                if (error.message.includes("API key") || error.message.includes("401")) {
                    console.warn("Gemini: Invalid API key");
                    // Fall through to Groq if available
                } else if (error.message.includes("quota") || error.message.includes("429")) {
                    console.warn("Gemini: Rate limit exceeded");
                    // Fall through to Groq if available
                } else if (error.message.includes("503") || error.message.includes("overloaded")) {
                    console.warn("Gemini: Service overloaded");
                    // Fall through to Groq if available
                } else {
                    console.warn("Gemini: Connection error -", errorMessage);
                }
            }

            // Try Groq as fallback if available
            if (groqApiKey) {
                console.log("Falling back to Groq API...");
                try {
                    return await sendMessageGroq(userMessage);
                } catch (groqError) {
                    console.error("Groq fallback also failed:", groqError);
                    return `⚠️ Both APIs failed. Gemini error: ${errorMessage}. Please check your API keys and try again later.`;
                }
            } else {
                // No fallback available, return detailed error
                if (errorMessage.includes("API key") || errorMessage.includes("401")) {
                    return "⚠️ Invalid Gemini API key. Please check your VITE_GEMINI_API_KEY configuration.";
                }
                if (errorMessage.includes("quota") || errorMessage.includes("429")) {
                    return "⚠️ Gemini API rate limit exceeded. Please try again in a moment, or add VITE_GROQ_API_KEY for a fallback option.";
                }
                if (errorMessage.includes("503") || errorMessage.includes("overloaded")) {
                    return "⚠️ Gemini API is temporarily overloaded. Please try again in a moment, or add VITE_GROQ_API_KEY for a fallback option.";
                }
                return `⚠️ Gemini API error: ${errorMessage}. Please try again or configure VITE_GROQ_API_KEY as a fallback.`;
            }
        }
    }

    // If only Groq is configured, use it directly
    if (groqApiKey) {
        try {
            return await sendMessageGroq(userMessage);
        } catch (error) {
            console.error("Groq API error:", error);
            if (error instanceof Error) {
                if (error.message.includes("API key") || error.message.includes("401")) {
                    return "⚠️ Invalid Groq API key. Please check your VITE_GROQ_API_KEY configuration.";
                }
                return `⚠️ Groq API error: ${error.message}. Please try again later.`;
            }
            return "⚠️ Groq API connection failed. Please try again later.";
        }
    }

    return "⚠️ No API configured. Please add VITE_GEMINI_API_KEY or VITE_GROQ_API_KEY to your .env file.";
};
