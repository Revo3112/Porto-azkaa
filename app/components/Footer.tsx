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
        <div className="w-7 h-7 bg-dashboard-accent text-white rounded-md flex items-center justify-center font-bold font-mono text-xs">
          AR
        </div>
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
