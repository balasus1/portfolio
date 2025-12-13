import { motion } from "framer-motion";
import { Building2, MapPin, Calendar } from "lucide-react";
import { experiences } from "@/data/portfolioData";
import SectionHeading from "@/components/ui/SectionHeading";

const ExperienceSection = () => {
  return (
    <section id="experience" className="experience-section-container section-padding relative">
      <div className="experience-section-wrapper container-custom">
        <SectionHeading title="Work Experience" subtitle="My Journey">
          Over two decades of building enterprise-grade solutions
        </SectionHeading>

        <div className="experience-timeline-container relative max-w-4xl mx-auto">
          {/* Timeline Line - Dotted with neon effect */}
          <div className="experience-timeline-line absolute left-0 md:left-1/2 top-0 w-0.5 md:-translate-x-px pointer-events-none" style={{ height: '100%' }}>
            {/* Dotted line background */}
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: "repeating-linear-gradient(to bottom, hsl(var(--primary)) 0px, hsl(var(--primary)) 8px, transparent 8px, transparent 16px)",
                opacity: 0.6,
              }}
            />
            {/* Neon glow effect */}
            <div 
              className="absolute inset-0 blur-sm"
              style={{
                backgroundImage: "repeating-linear-gradient(to bottom, hsl(var(--primary)) 0px, hsl(var(--primary)) 8px, transparent 8px, transparent 16px)",
                opacity: 0.4,
              }}
            />
            {/* Animated neuron pulses */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
                style={{
                  background: `radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)`,
                  boxShadow: "0 0 10px hsl(var(--primary) / 0.8), 0 0 20px hsl(var(--primary) / 0.6)",
                }}
                animate={{
                  y: ["0%", "100%"],
                  opacity: [0, 1, 1, 0],
                  scale: [0.5, 1, 1, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 1,
                  ease: "linear",
                }}
              />
            ))}
          </div>

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`relative pl-8 md:pl-0 pb-12 last:pb-0 ${
                index % 2 === 0 ? "md:pr-[52%]" : "md:pl-[52%]"
              }`}
            >
              {/* Timeline Dot - Neon glowing */}
              <div className="absolute left-0 md:left-1/2 top-0 md:-translate-x-1/2">
                {/* Outer glow ring */}
                <motion.div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full"
                  style={{
                    background: `radial-gradient(circle, hsl(var(--primary) / 0.6), transparent)`,
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.6, 0.3, 0.6],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                {/* Middle ring */}
                <motion.div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full"
                  style={{
                    background: `radial-gradient(circle, hsl(var(--primary) / 0.8), transparent)`,
                  }}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.8, 0.5, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.2,
                  }}
                />
                {/* Core dot */}
                <div
                  className="relative z-10 w-4 h-4 rounded-full border-4 border-background"
                  style={{
                    background: `hsl(var(--primary))`,
                    boxShadow: `
                      0 0 10px hsl(var(--primary) / 0.8),
                      0 0 20px hsl(var(--primary) / 0.6),
                      0 0 30px hsl(var(--primary) / 0.4),
                      inset 0 0 10px hsl(var(--primary) / 0.5)
                    `,
                  }}
                />
              </div>

              {/* Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="glass-card p-6 md:p-8 hover-lift"
                style={{
                  backgroundColor: "hsl(var(--card) / 0.8)",
                  backdropFilter: "blur(12px)",
                }}
              >
                {/* Date Badge */}
                <div className="flex items-center gap-2 text-primary text-sm font-medium mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>

                {/* Position */}
                <h3 className="text-xl md:text-2xl font-heading font-bold text-foreground mb-2">
                  {exp.position}
                </h3>

                {/* Company & Location */}
                <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
                  <span className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    {exp.company}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {exp.location}
                  </span>
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-4">{exp.description}</p>

                {/* Highlights */}
                <ul className="space-y-2">
                  {exp.highlights.map((highlight, hIndex) => (
                    <li
                      key={hIndex}
                      className="flex items-start gap-3 text-sm text-muted-foreground"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
