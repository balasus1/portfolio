import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="cta-section-container py-20 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="cta-background absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10" />
      
      {/* Decorative Orbs */}
      <motion.div
        className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(174 72% 56% / 0.2) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-1/2 right-1/4 w-64 h-64 rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(280 70% 60% / 0.2) 0%, transparent 70%)",
        }}
        animate={{ scale: [1.2, 1, 1.2] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="cta-content-wrapper container-custom relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Ready to Start a Project?</span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            Let's Build Something{" "}
            <span className="gradient-text">Extraordinary</span> Together
          </h2>

          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            I'm available for remote opportunities and exciting projects. Whether you need a technical architect, fullstack developer, or a consultant for your enterprise application, let's discuss how I can help.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="min-w-[180px] gap-2 font-semibold"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Get in Touch
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="min-w-[180px] font-semibold"
              onClick={() => window.open("https://www.linkedin.com/in/spike0027/", "_blank")}
            >
              View LinkedIn
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
