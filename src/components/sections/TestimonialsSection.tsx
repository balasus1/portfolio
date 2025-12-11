import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "Project Director",
    company: "Reserve Bank of India",
    content:
      "Bala's architectural expertise transformed our job scheduling platform. His deep understanding of distributed systems and ability to design fault-tolerant solutions was exceptional. The Kafka-based fallback mechanism he implemented has been crucial for our operations.",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Engineering Manager",
    company: "Barnes & Noble",
    content:
      "Working with Bala on our e-commerce platform was a game-changer. His ReactJS expertise and attention to performance optimization resulted in a significantly improved user experience. He translated complex Figma designs into pixel-perfect components.",
    rating: 5,
  },
  {
    id: 3,
    name: "Michael Rodriguez",
    role: "Technical Lead",
    company: "Morgan Stanley",
    content:
      "Bala delivered a high-throughput processing engine that handles millions of records with zero production defects. His ability to optimize database interactions and implement concurrent processing patterns is truly remarkable.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      if (newDirection === 1) {
        return prev === testimonials.length - 1 ? 0 : prev + 1;
      }
      return prev === 0 ? testimonials.length - 1 : prev - 1;
    });
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 200 : -200,
      opacity: 0,
    }),
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="section-padding relative overflow-hidden bg-gradient-to-b from-background to-secondary/20">
      <div className="container-custom">
        <SectionHeading title="What People Say" subtitle="Testimonials">
          Feedback from colleagues and clients I've worked with
        </SectionHeading>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Quote Icon */}
            <div className="absolute -top-6 -left-4 md:-left-8 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Quote className="w-8 h-8 text-primary" />
            </div>

            {/* Testimonial Card */}
            <div className="glass-card p-8 md:p-12 min-h-[300px] flex items-center">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  {/* Rating */}
                  <div className="flex items-center justify-center gap-1 mb-6">
                    {Array.from({ length: currentTestimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 italic">
                    "{currentTestimonial.content}"
                  </p>

                  {/* Author */}
                  <div>
                    <p className="text-lg font-heading font-semibold text-foreground">
                      {currentTestimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {currentTestimonial.role} at{" "}
                      <span className="text-primary">{currentTestimonial.company}</span>
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <div className="flex items-center gap-3">
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

              {/* Dots */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > currentIndex ? 1 : -1);
                      setCurrentIndex(index);
                    }}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      index === currentIndex
                        ? "w-8 bg-primary"
                        : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
