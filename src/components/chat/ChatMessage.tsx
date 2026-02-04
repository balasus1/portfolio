import { motion } from "framer-motion";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp?: Date;
}

const ChatMessage = ({ message, isUser, timestamp }: ChatMessageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}
    >
      <div
        className={`max-w-[85%] px-4 py-3 rounded-2xl ${
          isUser
            ? "bg-primary text-primary-foreground rounded-br-md"
            : "bg-secondary/80 text-foreground rounded-bl-md"
        }`}
        style={{
          boxShadow: isUser 
            ? "0 2px 8px hsl(var(--primary) / 0.3)" 
            : "0 2px 8px hsl(0 0% 0% / 0.2)",
        }}
      >
        <div className="text-sm leading-relaxed whitespace-pre-wrap">
          {formatMessage(message)}
        </div>
        {timestamp && (
          <div 
            className={`text-xs mt-1 ${
              isUser ? "text-primary-foreground/70" : "text-muted-foreground"
            }`}
          >
            {formatTime(timestamp)}
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Format message with basic markdown-like styling
const formatMessage = (text: string): React.ReactNode => {
  // Split by ** for bold text
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    // Handle bullet points
    if (part.includes("\n•") || part.includes("\n-")) {
      return part.split("\n").map((line, lineIndex) => {
        if (line.startsWith("•") || line.startsWith("-")) {
          return (
            <div key={`${index}-${lineIndex}`} className="ml-2">
              {line}
            </div>
          );
        }
        return line + (lineIndex < part.split("\n").length - 1 ? "\n" : "");
      });
    }
    return part;
  });
};

// Format timestamp
const formatTime = (date: Date): string => {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export default ChatMessage;
