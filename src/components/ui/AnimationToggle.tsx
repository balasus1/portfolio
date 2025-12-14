import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, ZapOff } from "lucide-react";
import { useAnimation } from "@/contexts/AnimationContext";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AnimationToggleProps {
  className?: string;
}

const AnimationToggle = ({ className = "" }: AnimationToggleProps) => {
  const { animationsEnabled, toggleAnimations, isLowBandwidth } = useAnimation();
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const hideTooltipTimer = useRef<NodeJS.Timeout | null>(null);
  
  // Detect if device is touch-enabled (check once)
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // Handle click/tap - toggle animations and show tooltip on mobile
  const handleClick = (e: React.MouseEvent) => {
    toggleAnimations();
    
    // On mobile/touch devices, show tooltip after tap
    if (isTouchDevice) {
      setTooltipOpen(true);
      // Clear any existing timer
      if (hideTooltipTimer.current) {
        clearTimeout(hideTooltipTimer.current);
      }
      // Auto-hide after 4 seconds
      hideTooltipTimer.current = setTimeout(() => {
        setTooltipOpen(false);
      }, 4000);
    }
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (hideTooltipTimer.current) {
        clearTimeout(hideTooltipTimer.current);
      }
    };
  }, []);

  return (
    <TooltipProvider delayDuration={isTouchDevice ? 0 : 300}>
      <Tooltip 
        open={isTouchDevice ? tooltipOpen : undefined} 
        onOpenChange={isTouchDevice ? setTooltipOpen : undefined}
      >
        <TooltipTrigger asChild>
          <div className={`relative ${className}`}>
            <Button
              onClick={handleClick}
              variant="ghost"
              size="icon"
              className={`relative h-10 w-10 rounded-lg transition-all duration-300 overflow-visible ${
                animationsEnabled
                  ? "text-primary hover:bg-primary/10"
                  : "text-muted-foreground hover:bg-muted"
              }`}
              aria-label={
                animationsEnabled
                  ? "Disable animations"
                  : "Enable animations"
              }
            >
              <AnimatePresence mode="wait">
                {animationsEnabled ? (
                  <motion.div
                    key="enabled"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    transition={{ duration: 0.2 }}
                    className="relative"
                  >
                    {/* Motion blur effect with layered shadows */}
                    <div className="relative">
                      {/* Shadow layer 1 - farthest */}
                      <Activity 
                        className="h-5 w-5 absolute opacity-20 blur-[2px] translate-x-[2px] translate-y-[1px]" 
                        style={{ filter: "blur(1.5px)" }}
                      />
                      {/* Shadow layer 2 - middle */}
                      <Activity 
                        className="h-5 w-5 absolute opacity-40 blur-[1px] translate-x-[1px] translate-y-[0.5px]" 
                        style={{ filter: "blur(1px)" }}
                      />
                      {/* Main icon */}
                      <Activity className="h-5 w-5 relative" />
                    </div>
                    {/* Animated pulse effect */}
                    <motion.div
                      className="absolute inset-0 rounded-full bg-primary/20"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 0, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="disabled"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ZapOff className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>

              {isLowBandwidth && (
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-yellow-500 rounded-full border-2 border-background animate-pulse" />
              )}
            </Button>
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-xs">
          <div className="space-y-1">
            <p className="font-semibold">
              {animationsEnabled ? "Animations: On" : "Animations: Off"}
            </p>
            <p className="text-xs text-muted-foreground">
              {animationsEnabled
                ? "Click to switch to plain HTML view"
                : "Click to enable smooth animations"}
            </p>
            {isLowBandwidth && (
              <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-2">
                Low bandwidth detected - animations disabled for better performance
              </p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default AnimationToggle;

