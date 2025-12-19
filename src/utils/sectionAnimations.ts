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
      // When animations disabled (default), ensure all sections are visible immediately
      // This prevents scroll issues on first load - all content appears without animation
      const sections = document.querySelectorAll("section[id]");
      sections.forEach((section) => {
        section.classList.add("section-visible");
        // Force visibility to prevent any scroll calculation issues
        section.style.opacity = "1";
        section.style.transform = "none";
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
    
    // Make first section (hero) visible immediately to prevent scroll issues
    if (sections.length > 0) {
      const firstSection = sections[0];
      firstSection.classList.add("section-visible");
      // Also ensure it's fully visible to fix scrollbar issue
      firstSection.style.opacity = "1";
      firstSection.style.transform = "none";
    }
    
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

