import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useAnimation } from "@/contexts/AnimationContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  align?: "left" | "center";
}

const SectionHeading = ({ title, subtitle, children, align = "center" }: SectionHeadingProps) => {
  const { animationsEnabled } = useAnimation();
  const { ref, className: animationClass, style } = useScrollAnimation({
    direction: "up",
    threshold: 0.1,
  });

  const containerClass = `section-heading-container mb-12 md:mb-16 ${align === "center" ? "text-center" : "text-left"} ${animationsEnabled ? animationClass : ""}`;

  if (animationsEnabled) {
    return (
      <div ref={ref as React.RefObject<HTMLDivElement>} className={containerClass} style={style}>
        {subtitle && (
          <span 
            className="section-heading-subtitle font-medium text-sm uppercase tracking-wider mb-2 block"
            style={{
              background: "linear-gradient(135deg, hsl(174, 85%, 65%) 0%, hsl(200, 90%, 55%) 50%, hsl(280, 75%, 65%) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 8px hsl(174, 85%, 65% / 0.6))",
            }}
          >
            {subtitle}
          </span>
        )}
        <h2 className="section-heading-title text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground">
          {title}
        </h2>
        {children && (
          <p className="section-heading-description mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
            {children}
          </p>
        )}
      </div>
    );
  }

  // Plain HTML when animations disabled
  return (
    <div className={containerClass}>
      {subtitle && (
        <span 
          className="section-heading-subtitle font-medium text-sm uppercase tracking-wider mb-2 block"
          style={{
            background: "linear-gradient(135deg, hsl(174, 85%, 65%) 0%, hsl(200, 90%, 55%) 50%, hsl(280, 75%, 65%) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 0 8px hsl(174, 85%, 65% / 0.6))",
          }}
        >
          {subtitle}
        </span>
      )}
      <h2 className="section-heading-title text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground">
        {title}
      </h2>
      {children && (
        <p className="section-heading-description mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
          {children}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;