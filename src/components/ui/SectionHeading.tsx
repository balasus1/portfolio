import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  align?: "left" | "center";
}

const SectionHeading = ({ title, subtitle, children, align = "center" }: SectionHeadingProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`mb-12 md:mb-16 ${align === "center" ? "text-center" : "text-left"}`}
    >
      {subtitle && (
        <motion.span 
          className="font-medium text-sm uppercase tracking-wider mb-2 block"
          style={{
            background: "linear-gradient(135deg, hsl(174, 85%, 65%) 0%, hsl(200, 90%, 55%) 50%, hsl(280, 75%, 65%) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 0 8px hsl(174, 85%, 65% / 0.6))",
          }}
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {subtitle}
        </motion.span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground">
        {title}
      </h2>
      {children && (
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
          {children}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeading;