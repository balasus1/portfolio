import { useAnimation } from "@/contexts/AnimationContext";
import { useEffect } from "react";

/**
 * Hook that automatically applies scroll animations to all sections with IDs
 * This provides smooth scroll-triggered animations for all sections
 */
export const useSectionAnimations = () => {
  const { animationsEnabled } = useAnimation();

  useEffect(() => {
    if (!animationsEnabled) {
      // When animations disabled, ensure all sections are visible
      const sections = document.querySelectorAll("section[id]");
      sections.forEach((section) => {
        section.classList.add("section-visible");
      });
      return;
    }

    // Create Intersection Observer for all sections
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("section-visible");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    // Observe all sections with IDs
    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, [animationsEnabled]);
};

