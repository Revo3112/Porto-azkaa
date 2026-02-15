"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const navItems = [
  { label: "Overview", href: "#", id: "hero" },
  { label: "Experience Log", href: "#experience", id: "experience" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Qualifications", href: "#qualifications", id: "qualifications" },
];

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const pulseAnimationRef = useRef<gsap.core.Tween | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(logoRef.current, { opacity: 0, x: -20 });
      gsap.set(navRef.current, { opacity: 0, y: -8 });
      gsap.set(statusRef.current, { opacity: 0, scale: 0.95 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        delay: 0.2
      });

      tl.to(logoRef.current, { opacity: 1, x: 0, duration: 0.4 });
      tl.to(navRef.current, { opacity: 1, y: 0, duration: 0.35 }, "-=0.2");
      tl.to(statusRef.current, { opacity: 1, scale: 1, duration: 0.3 }, "-=0.15");

      navItems.forEach((item) => {
        if (item.id === "hero") {
          ScrollTrigger.create({
            trigger: document.body,
            start: "top top",
            end: "top +=100",
            onEnter: () => setActiveSection("hero"),
            onEnterBack: () => setActiveSection("hero"),
          });
        } else {
          const section = document.getElementById(item.id);
          if (section) {
            ScrollTrigger.create({
              trigger: section,
              start: "top 50%",
              end: "bottom 50%",
              onEnter: () => setActiveSection(item.id),
              onEnterBack: () => setActiveSection(item.id),
            });
          }
        }
      });
    }, headerRef);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      ctx.revert();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!statusRef.current) return;

    const dot = statusRef.current.querySelector(".pulse-dot");
    if (dot) {
      pulseAnimationRef.current = gsap.to(dot, {
        scale: 1.2,
        opacity: 0.6,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }

    return () => {
      pulseAnimationRef.current?.kill();
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    if (href === "#") {
      gsap.to(window, {
        scrollTo: { y: 0, autoKill: false },
        duration: 0.8,
        ease: "power2.inOut"
      });
    } else {
      const id = href.slice(1);
      const element = document.getElementById(id);
      if (element) {
        const offsetTop = element.offsetTop - 80;
        gsap.to(window, {
          scrollTo: { y: offsetTop, autoKill: false },
          duration: 0.8,
          ease: "power2.inOut"
        });
      }
    }
    
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-dashboard-border"
          : "bg-white/90 backdrop-blur-md border-b border-dashboard-border"
      }`}
    >
      <div className="max-w-[1280px] mx-auto w-full flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <div ref={logoRef} className="flex items-center gap-3">
          <div className="h-8 w-8 bg-dashboard-accent text-white rounded-[8px] flex items-center justify-center font-bold font-mono text-sm relative overflow-hidden group cursor-pointer">
            <span className="relative z-10">AR</span>
            <div className="absolute inset-0 bg-gradient-to-r from-dashboard-accent to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-tight leading-none">
              AZKAA RAHIILA HARDI
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav
          ref={navRef}
          className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-[8px]"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              className={`px-4 py-1.5 text-xs font-medium transition-all duration-200 rounded-[6px] relative overflow-hidden group ${
                activeSection === item.id
                  ? "text-dashboard-text bg-white shadow-sm"
                  : "text-dashboard-muted hover:text-dashboard-text hover:bg-white/50"
              }`}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
            >
              <span className="relative z-10">{item.label}</span>
              {activeSection !== item.id && (
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-[6px]"></div>
              )}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div
            ref={statusRef}
            className="hidden lg:flex items-center gap-2 text-xs font-mono text-dashboard-muted bg-slate-50 px-3 py-1.5 rounded-[8px] border border-slate-200 hover:border-dashboard-accent/30 transition-colors duration-200"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 pulse-dot"></span>
            Open to Work
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b border-dashboard-border shadow-lg md:hidden">
          <nav className="flex flex-col p-4 gap-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeSection === item.id
                    ? "text-dashboard-accent bg-slate-50"
                    : "text-dashboard-text hover:bg-slate-50"
                }`}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
