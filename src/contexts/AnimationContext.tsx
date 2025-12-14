import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { detectLowBandwidth } from "@/utils/bandwidthDetector";

interface AnimationContextType {
  animationsEnabled: boolean;
  toggleAnimations: () => void;
  isLowBandwidth: boolean;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

const STORAGE_KEY = "portfolio-animations-enabled";

export const AnimationProvider = ({ children }: { children: ReactNode }) => {
  // Check localStorage first, default to true
  const [animationsEnabled, setAnimationsEnabled] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : true;
  });
  
  const [isLowBandwidth, setIsLowBandwidth] = useState(false);

  useEffect(() => {
    // Detect low bandwidth on mount
    const checkBandwidth = async () => {
      const lowBandwidth = await detectLowBandwidth();
      setIsLowBandwidth(lowBandwidth);
      
      // Auto-disable animations if low bandwidth and user hasn't manually set preference
      if (lowBandwidth && localStorage.getItem(STORAGE_KEY) === null) {
        setAnimationsEnabled(false);
        localStorage.setItem(STORAGE_KEY, "false");
      }
    };

    checkBandwidth();

    // Monitor connection changes
    if (navigator.connection) {
      const handleConnectionChange = async () => {
        const lowBandwidth = await detectLowBandwidth();
        setIsLowBandwidth(lowBandwidth);
      };

      navigator.connection.addEventListener("change", handleConnectionChange);
      return () => {
        navigator.connection?.removeEventListener("change", handleConnectionChange);
      };
    }
  }, []);

  const toggleAnimations = () => {
    setAnimationsEnabled((prev) => {
      const newValue = !prev;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newValue));
      return newValue;
    });
  };

  // Apply animation preference to document
  useEffect(() => {
    if (animationsEnabled) {
      document.documentElement.classList.remove("no-animations");
      document.documentElement.classList.add("animations-enabled");
    } else {
      document.documentElement.classList.remove("animations-enabled");
      document.documentElement.classList.add("no-animations");
    }
  }, [animationsEnabled]);

  return (
    <AnimationContext.Provider
      value={{
        animationsEnabled,
        toggleAnimations,
        isLowBandwidth,
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error("useAnimation must be used within an AnimationProvider");
  }
  return context;
};

