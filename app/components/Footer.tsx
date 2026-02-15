"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(footerRef.current, { opacity: 0, y: 15 });

      gsap.to(footerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 95%",
          toggleActions: "play none none none"
        }
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="mt-12 py-6 border-t border-slate-100 text-center"
    >
      <div ref={contentRef} className="flex items-center justify-center gap-2 mb-3">
        <svg 
          width="28" 
          height="28" 
          viewBox="0 0 48 48"
        >
          <defs>
            <linearGradient id="footerLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#2563EB" }} />
              <stop offset="100%" style={{ stopColor: "#0D9488" }} />
            </linearGradient>
          </defs>
          <rect width="48" height="48" rx="12" fill="url(#footerLogoGrad)" />
          <text x="24" y="30" fontFamily="system-ui, -apple-system, sans-serif" fontSize="16" fontWeight="700" fill="white" textAnchor="middle">AR</text>
        </svg>
        <span className="text-sm font-semibold text-slate-700">
          Azkaa Rahiila Hardi
        </span>
      </div>

      <p className="text-slate-400 text-xs">
        Data Analyst • BNSP Certified
      </p>

      <p className="text-slate-300 text-[11px] mt-4">
        © 2026 All rights reserved
      </p>
    </footer>
  );
}
