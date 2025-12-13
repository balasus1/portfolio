import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { projects } from "@/data/portfolioData";
import SectionHeading from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/button";

const ProjectsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      if (newDirection === 1) {
        return prev === projects.length - 1 ? 0 : prev + 1;
      }
      return prev === 0 ? projects.length - 1 : prev - 1;
    });
  };

  const currentProject = projects[currentIndex];

  return (
    <section id="projects" className="projects-section-container section-padding relative overflow-hidden">
      <div className="projects-section-wrapper container-custom">
        <SectionHeading title="Featured Projects" subtitle="My Work">
          Enterprise solutions designed, developed and delivered as Individual contributor
        </SectionHeading>

        {/* Project Showcase */}
        <div className="projects-showcase relative">
          {/* Main Carousel */}
          <div className="projects-carousel relative h-[600px] md:h-[500px] overflow-hidden rounded-2xl">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(_, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className="absolute inset-0"
              >
                <div className="h-full glass-card overflow-hidden">
                  <div className="grid md:grid-cols-2 h-full">
                    {/* Project Info */}
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                      <div className="mb-4">
                        <span 
                          className="text-xs font-medium uppercase tracking-wider"
                          style={{
                            background: "linear-gradient(135deg, hsl(174, 85%, 65%) 0%, hsl(200, 90%, 55%) 50%, hsl(280, 75%, 65%) 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            filter: "drop-shadow(0 0 8px hsl(174, 85%, 65% / 0.6))",
                          }}
                        >
                          {currentProject.client}
                        </span>
                        <p className="text-sm text-muted-foreground">{currentProject.period}</p>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-heading font-bold mb-4 text-foreground">
                        {currentProject.title}
                      </h3>
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {currentProject.description}
                      </p>

                      {/* Highlights */}
                      <ul className="space-y-2 mb-6">
                        {currentProject.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <ArrowRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            {highlight}
                          </li>
                        ))}
                      </ul>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {currentProject.technologies.map((tech, techIndex) => {
                          const tagColors = [
                            "bg-blue-500/20 text-blue-300 border border-blue-500/30",
                            "bg-purple-500/20 text-purple-300 border border-purple-500/30",
                            "bg-green-500/20 text-green-300 border border-green-500/30",
                            "bg-orange-500/20 text-orange-300 border border-orange-500/30",
                            "bg-pink-500/20 text-pink-300 border border-pink-500/30",
                            "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30",
                          ];
                          const colorClass = tagColors[techIndex % tagColors.length];
                          return (
                            <span
                              key={tech}
                              className={`px-3 py-1 text-xs font-medium rounded-full ${colorClass}`}
                            >
                              {tech}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* Project Visual */}
                    <div
                      className={`relative bg-gradient-to-br ${currentProject.color} hidden md:flex items-center justify-center`}
                    >
                      <div className="absolute inset-0 bg-black/20" />
                      <div className="relative text-center p-8">
                        <div className="w-32 h-32 mx-auto rounded-3xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-6">
                          <span className="text-5xl font-heading font-bold text-white">
                            {currentProject.title.charAt(0)}
                          </span>
                        </div>
                        <p className="text-white/80 font-medium">{currentProject.client}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => paginate(-1)}
                className="rounded-full"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => paginate(1)}
                className="rounded-full"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>

            {/* Pagination Dots */}
            <div className="flex items-center gap-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "w-8 bg-primary"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>

            <div className="text-sm text-muted-foreground">
              <span className="text-foreground font-medium">{String(currentIndex + 1).padStart(2, "0")}</span>
              <span className="mx-2">/</span>
              <span>{String(projects.length).padStart(2, "0")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
