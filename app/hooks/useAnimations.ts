"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function useGSAP() {
  return gsap;
}

export function useScrollTrigger() {
  return ScrollTrigger;
}

// Hook for fade-in animation on scroll
export function useFadeIn(delay: number = 0, duration: number = 1) {
  const ref = useRef<HTMLElement | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: ref.current,
      start: "top 80%",
      onEnter: () => {
        gsap.fromTo(
          ref.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration,
            delay,
            ease: "power3.out",
          }
        );
      },
      once: true,
    });

    return () => {
      scrollTriggerRef.current?.kill();
    };
  }, [delay, duration]);

  return ref;
}

// Hook for staggered children animation
export function useStaggerAnimation(
  staggerDelay: number = 0.1,
  duration: number = 0.8
) {
  const containerRef = useRef<HTMLElement | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const children = containerRef.current.children;

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 85%",
      onEnter: () => {
        gsap.fromTo(
          children,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration,
            stagger: staggerDelay,
            ease: "power2.out",
          }
        );
      },
      once: true,
    });

    return () => {
      scrollTriggerRef.current?.kill();
    };
  }, [staggerDelay, duration]);

  return containerRef;
}

// Hook for parallax effect
export function useParallax(speed: number = 0.5) {
  const ref = useRef<HTMLElement | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: ref.current,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        gsap.set(ref.current, { y: self.progress * speed * 100 });
      },
    });

    return () => {
      scrollTriggerRef.current?.kill();
    };
  }, [speed]);

  return ref;
}

// Hook for text reveal animation
export function useTextReveal(duration: number = 1) {
  const ref = useRef<HTMLElement | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: ref.current,
      start: "top 80%",
      onEnter: () => {
        gsap.fromTo(
          ref.current,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration,
            ease: "power4.out",
          }
        );
      },
      once: true,
    });

    return () => {
      scrollTriggerRef.current?.kill();
    };
  }, [duration]);

  return ref;
}

// Hook for floating animation
export function useFloatAnimation(
  amplitude: number = 10,
  duration: number = 3
) {
  const ref = useRef<HTMLElement | null>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    tweenRef.current = gsap.to(ref.current, {
      y: `+=${amplitude}`,
      duration,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
    });

    return () => {
      tweenRef.current?.kill();
    };
  }, [amplitude, duration]);

  return ref;
}

// Hook for counter animation
export function useCounterAnimation(
  endValue: number,
  duration: number = 2,
  suffix: string = ""
) {
  const ref = useRef<HTMLElement | null>(null);
  const [displayValue, setDisplayValue] = useState(`0${suffix}`);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: ref.current,
      start: "top 80%",
      onEnter: () => {
        const obj = { value: 0 };
        gsap.to(obj, {
          value: endValue,
          duration,
          ease: "power2.out",
          onUpdate: function () {
            setDisplayValue(`${Math.round(obj.value)}${suffix}`);
          },
        });
      },
      once: true,
    });

    return () => {
      scrollTriggerRef.current?.kill();
    };
  }, [endValue, duration, suffix]);

  return { ref, displayValue };
}

// Hook for magnetic button effect
export function useMagneticEffect(strength: number = 0.3) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(element, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      });
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength]);

  return ref;
}

// Hook for typewriter effect
export function useTypewriter(
  texts: string[],
  typingSpeed: number = 50,
  deletingSpeed: number = 30,
  pauseDuration: number = 2000
) {
  const ref = useRef<HTMLElement | null>(null);
  const [currentText, setCurrentText] = useState("");
  
  // Use refs to avoid dependency issues
  const textsRef = useRef(texts);
  const typingSpeedRef = useRef(typingSpeed);
  const deletingSpeedRef = useRef(deletingSpeed);
  const pauseDurationRef = useRef(pauseDuration);
  const currentIndexRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let isDeleting = false;
    let textIndex = 0;

    const type = () => {
      const currentFullText = textsRef.current[currentIndexRef.current];

      if (!isDeleting) {
        setCurrentText(currentFullText.substring(0, textIndex + 1));
        textIndex++;

        if (textIndex === currentFullText.length) {
          isDeleting = true;
          timeoutRef.current = setTimeout(type, pauseDurationRef.current);
          return;
        }
      } else {
        setCurrentText(currentFullText.substring(0, textIndex - 1));
        textIndex--;

        if (textIndex === 0) {
          isDeleting = false;
          currentIndexRef.current = (currentIndexRef.current + 1) % textsRef.current.length;
        }
      }

      timeoutRef.current = setTimeout(
        type,
        isDeleting ? deletingSpeedRef.current : typingSpeedRef.current
      );
    };

    type();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []); // No dependencies to avoid infinite loops

  return { ref, currentText };
}
