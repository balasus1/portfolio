import { useEffect, useRef, useState } from "react";
import { useAnimation } from "@/contexts/AnimationContext";

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "fade";
}

/**
 * Hook that provides scroll-triggered animations using Intersection Observer
 * Returns ref to attach to element and className for animations
 */
export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = "0px 0px -50px 0px",
    triggerOnce = true,
    delay = 0,
    direction = "up",
  } = options;

  const { animationsEnabled } = useAnimation();
  const elementRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!animationsEnabled) {
      // If animations disabled, show immediately without animation
      setIsVisible(true);
      if (elementRef.current) {
        elementRef.current.classList.remove("section-visible");
      }
      return;
    }

    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            element.classList.add("section-visible");
            if (triggerOnce) {
              setHasAnimated(true);
              observer.unobserve(element);
            }
          } else if (!triggerOnce) {
            setIsVisible(false);
            element.classList.remove("section-visible");
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [animationsEnabled, threshold, rootMargin, triggerOnce]);

  // Determine animation class based on direction and visibility
  const getAnimationClass = () => {
    if (!animationsEnabled || (!isVisible && hasAnimated)) {
      return "";
    }

    if (!isVisible) {
      // Initial hidden state
      switch (direction) {
        case "up":
          return "scroll-animate-up-initial";
        case "down":
          return "scroll-animate-down-initial";
        case "left":
          return "scroll-animate-left-initial";
        case "right":
          return "scroll-animate-right-initial";
        case "fade":
          return "scroll-animate-fade-initial";
        default:
          return "scroll-animate-fade-initial";
      }
    }

    // Visible/active state
    switch (direction) {
      case "up":
        return "scroll-animate-up-active";
      case "down":
        return "scroll-animate-down-active";
      case "left":
        return "scroll-animate-left-active";
      case "right":
        return "scroll-animate-right-active";
      case "fade":
        return "scroll-animate-fade-active";
      default:
        return "scroll-animate-fade-active";
    }
  };

  const animationClass = getAnimationClass();
  const style = delay > 0 && animationsEnabled ? { animationDelay: `${delay}ms` } : undefined;

  return {
    ref: elementRef,
    className: animationClass,
    style,
    isVisible: animationsEnabled ? isVisible : true,
  };
};

/**
 * Hook for animating children elements with staggered delays
 */
export const useStaggeredAnimation = (
  itemCount: number,
  options: UseScrollAnimationOptions = {}
) => {
  const delays = Array.from({ length: itemCount }, (_, i) => i * 100);
  
  return delays.map((delay) => ({
    ...useScrollAnimation({ ...options, delay }),
  }));
};

