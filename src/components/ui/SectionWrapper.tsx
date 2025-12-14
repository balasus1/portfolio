import { ReactNode, HTMLAttributes } from "react";
import { motion, MotionProps } from "framer-motion";
import { useAnimation } from "@/contexts/AnimationContext";

/**
 * Motion wrapper that conditionally applies framer-motion animations
 * Falls back to plain div when animations are disabled
 */
export const ConditionalMotion = ({
  children,
  initial,
  whileInView,
  viewport,
  transition,
  className = "",
  ...props
}: {
  children: ReactNode;
  initial?: any;
  whileInView?: any;
  viewport?: any;
  transition?: any;
  className?: string;
  [key: string]: any;
} & MotionProps) => {
  const { animationsEnabled } = useAnimation();

  if (animationsEnabled && (initial || whileInView)) {
    return (
      <motion.div
        initial={initial}
        whileInView={whileInView}
        viewport={viewport}
        transition={transition}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  // When animations disabled or no animation props, render as plain div
  const { animate, ...restProps } = props;
  return (
    <div className={className} {...restProps}>
      {children}
    </div>
  );
};

