"use client";

import { useEffect, useRef } from "react";
import { Download, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const socialCardsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const decorativeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(profileRef.current, { 
        opacity: 0, x: -40, scale: 0.95 
      });
      gsap.set(mainCardRef.current, { 
        opacity: 0, y: 30, scale: 0.97 
      });
      
      const socialCards = socialCardsRef.current?.children || [];
      gsap.set(socialCards, { opacity: 0, x: 30 });

      gsap.set(subtitleRef.current, { opacity: 0, x: -20 });
      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll(".word");
        gsap.set(words, { opacity: 0, y: 20 });
      }
      gsap.set(descriptionRef.current, { opacity: 0, y: 15 });
      gsap.set(ctaRef.current, { opacity: 0, y: 10 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        delay: 0.3
      });

      tl.to(profileRef.current, {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.6,
        ease: "power3.out"
      });

      tl.to(mainCardRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5
      }, "-=0.35");

      tl.to(socialCards, {
        opacity: 1,
        x: 0,
        duration: 0.4,
        stagger: { each: 0.06, from: "start" }
      }, "-=0.3");

      tl.to(subtitleRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.4
      }, "-=0.25");

      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll(".word");
        tl.to(words, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.08
        }, "-=0.2");
      }

      tl.to(descriptionRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4
      }, "-=0.15");

      tl.to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.35
      }, "-=0.1");

      if (decorativeRef.current) {
        gsap.to(decorativeRef.current, {
          scale: 1.15,
          opacity: 0.6,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }

      const glowElement = mainCardRef.current?.querySelector(".glow-effect");
      if (glowElement) {
        gsap.to(glowElement, {
          opacity: 0.4,
          scale: 1.05,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSocialHover = (e: React.MouseEvent) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(target, {
      x: x * 0.1,
      y: y * 0.1,
      duration: 0.25,
      ease: "power2.out"
    });
  };

  const handleSocialLeave = (e: React.MouseEvent) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  return (
    <section ref={sectionRef} id="hero" className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
      {/* Profile Card */}
      <div
        ref={profileRef}
        className="lg:col-span-3 rounded-bento border border-dashboard-border shadow-card relative overflow-hidden group cursor-pointer"
        style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-110"
          style={{
            backgroundImage: "url('/Anime_Azkaa.png')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>

        {/* Decorative circles */}
        <div className="absolute top-6 left-6 w-16 h-16 rounded-full border-2 border-dashed border-white/20 opacity-50 animate-spin-slow"></div>
        <div className="absolute top-6 right-6 text-white/30 group-hover:text-white/50 transition-colors duration-300">
          <i className="fas fa-satellite-dish text-2xl animate-pulse"></i>
        </div>

        <div className="relative z-10 flex flex-col justify-end h-full p-6 pb-8">
          <div className="mb-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#064E3B]/80 text-[#34D399] border border-[#065F46] rounded text-[10px] font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(16,185,129,0.4)] backdrop-blur-sm transform hover:scale-105 transition-transform">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse"></span>
              Available
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight leading-tight mb-1">
            Azkaa R. Hardi
          </h2>
          <p className="text-sm text-slate-300 font-mono tracking-wide">
            BNSP Certified Analyst
          </p>
        </div>
      </div>

      {/* Main Hero Card */}
      <div
        ref={mainCardRef}
        className="lg:col-span-6 bg-[#0F172A] rounded-bento text-white p-8 relative overflow-hidden flex flex-col justify-center shadow-float min-h-[420px]"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-teal-500/10 animate-gradient"></div>
        
        {/* Glow effects */}
        <div
          ref={decorativeRef}
          className="glow-effect absolute top-0 right-0 w-64 h-64 bg-blue-600/30 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"
        ></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-500/20 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2 pointer-events-none animate-pulse-slow"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-20"></div>

        <div className="relative z-10 space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span
                ref={subtitleRef}
                className="text-blue-400 font-mono text-xs tracking-widest uppercase"
              >
                {"/// Mission Objective"}
              </span>
              <div className="h-px w-8 bg-gradient-to-r from-blue-500/50 to-transparent"></div>
            </div>
            <h1
              ref={titleRef}
              className="text-5xl md:text-6xl font-black tracking-tighter leading-none mb-4"
            >
              <span className="word inline-block text-white">DATA</span>
              <br />
              <span className="word inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-white animate-gradient-x">
                ANALYST
              </span>
            </h1>
            <p
              ref={descriptionRef}
              className="text-slate-300 text-lg md:text-xl font-light leading-relaxed max-w-lg"
            >
              Transforming Data into{" "}
              <span className="text-white font-medium relative">
                Strategic Growth
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-teal-400"></span>
              </span>
              . Bridging the gap between complex datasets and clear business
              decisions.
            </p>
          </div>
          <div className="pt-2">
            <a
              ref={ctaRef}
              className="inline-flex items-center gap-2 bg-white text-dashboard-dark px-6 py-3 rounded-lg font-bold text-sm hover:bg-blue-50 transition-all duration-300 group shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] relative overflow-hidden"
              href="/CV_Azkaa_Rahiila_Hardi.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Download className="w-4 h-4 group-hover:animate-bounce" />
                Download CV
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-cyan-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
          </div>
        </div>
      </div>

      {/* Contact Info Cards - 5 stacked rectangles */}
      <div ref={socialCardsRef} className="lg:col-span-3 flex flex-col gap-2">
        <a
          className="flex-1 bg-white rounded-bento border border-slate-200 p-3 flex items-center gap-3 group transition-all duration-300 hover:border-slate-400 hover:shadow-sm"
          href="tel:082213624857"
          onMouseEnter={handleSocialHover}
          onMouseLeave={handleSocialLeave}
        >
          <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center transition-all duration-300 group-hover:bg-slate-200 group-hover:text-slate-700 shrink-0">
            <i className="fas fa-phone text-sm"></i>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[9px] text-slate-400 uppercase tracking-wider font-medium">Phone</p>
            <p className="text-xs font-semibold text-slate-700">082213624857</p>
          </div>
        </a>
        <a
          className="flex-1 bg-white rounded-bento border border-slate-200 p-3 flex items-center gap-3 group transition-all duration-300 hover:border-slate-400 hover:shadow-sm"
          href="mailto:azkaarahiila17@gmail.com"
          onMouseEnter={handleSocialHover}
          onMouseLeave={handleSocialLeave}
        >
          <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center transition-all duration-300 group-hover:bg-slate-200 group-hover:text-slate-700 shrink-0">
            <i className="fas fa-envelope text-sm"></i>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[9px] text-slate-400 uppercase tracking-wider font-medium">Email</p>
            <p className="text-xs font-semibold text-slate-700 truncate">azkaarahiila17@gmail.com</p>
          </div>
        </a>
        <a
          className="flex-1 bg-white rounded-bento border border-slate-200 p-3 flex items-center gap-3 group transition-all duration-300 hover:border-slate-400 hover:shadow-sm"
          href="https://www.linkedin.com/in/azkaa-rahiila17/"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={handleSocialHover}
          onMouseLeave={handleSocialLeave}
        >
          <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center transition-all duration-300 group-hover:bg-slate-200 group-hover:text-slate-700 shrink-0">
            <i className="fab fa-linkedin-in text-sm"></i>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[9px] text-slate-400 uppercase tracking-wider font-medium">LinkedIn</p>
            <p className="text-xs font-semibold text-slate-700">azkaa-rahiila17</p>
          </div>
        </a>
        <a
          className="flex-1 bg-white rounded-bento border border-slate-200 p-3 flex items-center gap-3 group transition-all duration-300 hover:border-slate-400 hover:shadow-sm"
          href="https://github.com/azkaarahiilaa"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={handleSocialHover}
          onMouseLeave={handleSocialLeave}
        >
          <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center transition-all duration-300 group-hover:bg-slate-200 group-hover:text-slate-700 shrink-0">
            <i className="fab fa-github text-sm"></i>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[9px] text-slate-400 uppercase tracking-wider font-medium">GitHub</p>
            <p className="text-xs font-semibold text-slate-700">azkaarahiilaa</p>
          </div>
        </a>
        <div
          className="flex-1 bg-white rounded-bento border border-slate-200 p-3 flex items-center gap-3 group transition-all duration-300 hover:border-slate-400 hover:shadow-sm"
          onMouseEnter={handleSocialHover}
          onMouseLeave={handleSocialLeave}
        >
          <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center transition-all duration-300 group-hover:bg-slate-200 group-hover:text-slate-700 shrink-0">
            <i className="fas fa-map-marker-alt text-sm"></i>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[9px] text-slate-400 uppercase tracking-wider font-medium">Location</p>
            <p className="text-xs font-semibold text-slate-700">Tangerang, Indonesia</p>
          </div>
        </div>
      </div>
    </section>
  );
}
