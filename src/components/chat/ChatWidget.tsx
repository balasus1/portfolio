import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2, RotateCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChatMessage from "./ChatMessage";
import { sendMessage, resetChat } from "@/services/geminiService";
import { quickReplies, welcomeMessage } from "@/data/chatbotData";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom when new messages arrive
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Add welcome message when chat first opens
  useEffect(() => {
    if (isOpen && !hasInteracted && messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          text: welcomeMessage,
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen, hasInteracted, messages.length]);

  const handleSendMessage = async (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText || isLoading) return;

    setHasInteracted(true);
    setInputValue("");

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: messageText,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Get AI response
    setIsLoading(true);
    try {
      const response = await sendMessage(messageText);
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        text: response,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        text: "Sorry, I encountered an error. Please try again.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleReset = () => {
    resetChat();
    setMessages([
      {
        id: "welcome",
        text: welcomeMessage,
        isUser: false,
        timestamp: new Date(),
      },
    ]);
    setHasInteracted(false);
  };

  const handleQuickReply = (text: string) => {
    handleSendMessage(text);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="chat-toggle-btn fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
        style={{
          background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(280 70% 60%) 100%)",
          boxShadow: "0 4px 20px hsl(var(--primary) / 0.4)",
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 text-primary-foreground" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6 text-primary-foreground" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="chat-window fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] rounded-2xl overflow-hidden flex flex-col"
            style={{
              background: "hsl(var(--card) / 0.95)",
              backdropFilter: "blur(20px)",
              border: "1px solid hsl(var(--border) / 0.5)",
              boxShadow: "0 8px 40px hsl(0 0% 0% / 0.4)",
              height: "500px",
              maxHeight: "min(600px, calc(100vh - 140px))",
            }}
          >
            {/* Header */}
            <div 
              className="chat-header px-4 py-3 flex items-center justify-between shrink-0"
              style={{
                background: "linear-gradient(135deg, hsl(var(--primary) / 0.15) 0%, hsl(280 70% 60% / 0.15) 100%)",
                borderBottom: "1px solid hsl(var(--border) / 0.3)",
              }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(280 70% 60%) 100%)",
                  }}
                >
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm">Bala's AI Assistant</h3>
                  <p className="text-xs text-muted-foreground">Ask me anything!</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleReset}
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                title="Reset conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>

            {/* Messages Container */}
            <div 
              className="chat-messages px-4 py-4 overflow-y-auto flex-1 min-h-0"
            >
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message.text}
                  isUser={message.isUser}
                  timestamp={message.timestamp}
                />
              ))}
              
              {/* Loading indicator */}
              {isLoading && (
                <div className="flex justify-start mb-3">
                  <div 
                    className="px-4 py-3 rounded-2xl rounded-bl-md bg-secondary/80"
                    style={{ boxShadow: "0 2px 8px hsl(0 0% 0% / 0.2)" }}
                  >
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-primary" />
                      <span className="text-sm text-muted-foreground">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length <= 1 && !isLoading && (
              <div className="chat-quick-replies px-4 pb-2 flex flex-wrap gap-2 shrink-0">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply.text)}
                    className="text-xs px-3 py-1.5 rounded-full transition-colors"
                    style={{
                      background: "hsl(var(--secondary))",
                      border: "1px solid hsl(var(--border) / 0.5)",
                      color: "hsl(var(--foreground))",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "hsl(var(--primary) / 0.2)";
                      e.currentTarget.style.borderColor = "hsl(var(--primary) / 0.5)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "hsl(var(--secondary))";
                      e.currentTarget.style.borderColor = "hsl(var(--border) / 0.5)";
                    }}
                  >
                    {reply.text}
                  </button>
                ))}
              </div>
            )}

            {/* Input Area */}
            <div 
              className="chat-input px-4 py-3 flex items-center gap-2 shrink-0"
              style={{
                borderTop: "1px solid hsl(var(--border) / 0.3)",
                background: "hsl(var(--card) / 0.5)",
              }}
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask me anything..."
                disabled={isLoading}
                className="flex-1 bg-transparent text-foreground text-sm placeholder:text-muted-foreground focus:outline-none disabled:opacity-50"
              />
              <Button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isLoading}
                size="icon"
                className="h-9 w-9 rounded-full"
                style={{
                  background: inputValue.trim() 
                    ? "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(280 70% 60%) 100%)" 
                    : "hsl(var(--muted))",
                }}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
