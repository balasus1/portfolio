/**
 * Chatbot-specific data for recruiter interactions
 * This data is used as context for the AI chatbot
 */

export const chatbotData = {
    // Availability information
    noticePeriod: "90 days",
    availableForRemote: true,
    preferredWorkMode: "Remote",

    // Compensation (optional - can be hidden by setting to null)
    expectedCompensation: "70 LPA (Lakhs Per Annum)",
    compensationNegotiable: true,

    // Quick facts for common questions
    totalExperience: "20+ years",
    currentRole: "Technical Architect",
    currentCompany: "Bahwan CyberTek Pvt Ltd",

    // Resume info
    resumeLocation: "Available in the navigation menu (top-right on desktop, dropdown menu on mobile)",

    // Additional context for the AI
    additionalContext: `
    - Open to full-time remote opportunities globally
    - Prefers roles involving fullstack development (Java, ReactJS, NextJS, Spring Boot, Kafka, Postgres, MongoDB, Redis, Docker, Kubernetes, AWS, Azure, GCP)
    - Strong background in building enterprise-grade distributed systems
    - Experienced with both greenfield and legacy modernization projects
    - Available to discuss happily for remote opportunities 
  `,
};

// Quick reply suggestions for recruiters
export const quickReplies = [
    {
        text: "What's your experience?",
        icon: "briefcase",
    },
    {
        text: "Tech stack you know ?",
        icon: "code",
    },
    {
        text: "Notice period in current company ?",
        icon: "clock",
    },
    {
        text: "Are you immediately available for Remote work?",
        icon: "globe",
    },
    {
        text: "Expected salary in INR or USD ?",
        icon: "wallet",
    },
];

// Welcome message for the chatbot
export const welcomeMessage = `Hi! 👋 I'm Snowy, an AI assistant working for Balasubramanian Shanmugham. I can help you learn about his experience, skills, and availability.

**Quick questions you can ask:**
• What technologies does he work with?
• Tell me about his experience
• What is his notice period?
• Is he available for remote work?

Feel free to ask anything about his professional background!`;
