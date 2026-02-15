"use client";

import { useEffect, useRef, useState } from "react";
import { BarChart3, ArrowRight, ExternalLink } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  {
    title: "BNSP Associate Data Analyst",
    description: "Interactive Dashboard for business insights with real-time data visualization.",
    skills: ["Tableau", "Business Intel"],
    year: "2025",
    pattern: "line",
    gradient: "from-blue-500 to-cyan-400",
    gridOpacities: [0.5, 0.8, 0.6, 0.9, 0.4, 0.7, 0.55, 0.85, 0.65, 0.75, 0.45, 0.95],
  },
  {
    title: "Data Analyst Academy",
    description: "Global Bicycle Sales Analysis using Tableau for comprehensive market insights.",
    skills: ["Tableau", "Sales Analysis"],
    year: "2024",
    pattern: "card",
    gradient: "from-purple-500 to-pink-400",
    gridOpacities: [],
  },
  {
    title: "Google Data Analytics",
    description: "Data Analysis Lifecycle project with end-to-end methodology implementation.",
    skills: ["Lifecycle", "Case Study"],
    year: "2026",
    pattern: "grid",
    gradient: "from-teal-500 to-green-400",
    gridOpacities: [0.7, 0.5, 0.9, 0.4, 0.6, 0.8, 0.55, 0.75, 0.65, 0.45, 0.85, 0.35],
  },
];

function ProjectPattern({
  pattern,
  gradient,
  gridOpacities,
}: {
  pattern: string;
  gradient: string;
  gridOpacities: number[];
}) {
  if (pattern === "line") {
    return (
      <svg
        className="w-full h-full max-h-[80px] drop-shadow-lg"
        viewBox="0 0 100 50"
      >
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>
        </defs>
        <path
          d="M5,45 L25,30 L45,35 L65,15 L95,20"
          fill="none"
          stroke="url(#lineGrad)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
          className="animate-draw-line"
        />
        <circle
          cx="25"
          cy="30"
          fill="white"
          r="3"
          stroke="#2563EB"
          strokeWidth="2"
          className="animate-pulse"
        />
        <circle
          cx="65"
          cy="15"
          fill="white"
          r="3"
          stroke="#22D3EE"
          strokeWidth="2"
          className="animate-pulse"
          style={{ animationDelay: "0.5s" }}
        />
        <circle
          cx="95"
          cy="20"
          fill="white"
          r="3"
          stroke="#2563EB"
          strokeWidth="2"
          className="animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </svg>
    );
  }

  if (pattern === "card") {
    return (
      <div className="w-4/5 h-3/4 bg-white rounded-lg border border-slate-200 shadow-lg p-2 grid grid-cols-2 gap-2">
        <div className={`bg-gradient-to-br ${gradient} rounded h-full w-full opacity-80`}></div>
        <div className="space-y-1.5">
          <div className="bg-slate-100 h-2 w-full rounded animate-pulse"></div>
          <div className="bg-slate-100 h-2 w-3/4 rounded animate-pulse"></div>
          <div className="bg-green-50 h-8 w-full rounded mt-2 animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-3/4 h-3/4 grid grid-cols-4 gap-1">
      {gridOpacities.map((opacity, i) => (
        <div
          key={i}
          className={`bg-gradient-to-br ${gradient} rounded-sm animate-scale-in`}
          style={{
            animationDelay: `${i * 0.05}s`,
            opacity: opacity,
          }}
        ></div>
      ))}
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation - slide from left with fade
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, x: -40, filter: "blur(8px)" },
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Cards - Premium 2026 style staggered reveal
      const cards = cardsContainerRef.current?.querySelectorAll(".project-card");
      if (cards && cards.length > 0) {
        // Set initial state - completely hidden
        gsap.set(cards, {
          opacity: 0,
          y: 80,
          scale: 0.9,
          filter: "blur(10px)",
        });

        // Create ScrollTrigger for the cards container
        ScrollTrigger.create({
          trigger: cardsContainerRef.current,
          start: "top 80%",
          onEnter: () => {
            // Premium staggered reveal - one by one with depth effect
            gsap.to(cards, {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              duration: 0.9,
              stagger: {
                each: 0.15,
                from: "start",
                ease: "power2.out",
              },
              ease: "power3.out",
            });
          },
          once: true,
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  // 3D card tilt effect on hover
  const handleCardHover = (e: React.MouseEvent, index: number) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    setHoveredCard(index);

    gsap.to(card, {
      rotateY: x * 20,
      rotateX: -y * 20,
      scale: 1.03,
      boxShadow: "0 30px 60px rgba(37, 99, 235, 0.2)",
      duration: 0.4,
      ease: "power2.out",
    });

    const innerContent = card.querySelector(".card-content");
    if (innerContent) {
      gsap.to(innerContent, {
        y: -5,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleCardLeave = (e: React.MouseEvent) => {
    const card = e.currentTarget;
    setHoveredCard(null);

    gsap.to(card, {
      rotateY: 0,
      rotateX: 0,
      scale: 1,
      boxShadow: "none",
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
    });

    const innerContent = card.querySelector(".card-content");
    if (innerContent) {
      gsap.to(innerContent, {
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.4)",
      });
    }
  };

  return (
    <section ref={sectionRef} id="projects" className="space-y-4">
      <div ref={headerRef} className="flex items-center justify-between mb-2">
        <h2 className="font-bold text-dashboard-text flex items-center gap-2 text-sm uppercase tracking-wider">
          <div className="w-8 h-8 rounded-lg bg-dashboard-accent/10 flex items-center justify-center">
            <BarChart3 className="w-[18px] h-[18px] text-dashboard-accent" />
          </div>
          Featured Analytical Projects
        </h2>
        <a
          className="text-xs text-dashboard-accent font-medium hover:underline flex items-center gap-1 group relative overflow-hidden px-3 py-1.5 rounded-lg hover:bg-dashboard-accent/5 transition-colors"
          href="#"
        >
          <span className="relative z-10">View All Projects</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>

      <div ref={cardsContainerRef} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <article
            key={index}
            className="project-card bg-white rounded-[12px] shadow-card border border-dashboard-border overflow-hidden group transition-all duration-300 hover:border-dashboard-accent/30 cursor-pointer"
            style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
            onMouseEnter={(e) => handleCardHover(e, index)}
            onMouseLeave={handleCardLeave}
          >
            <div
              className={`bg-slate-50 p-6 border-b border-dashboard-border relative overflow-hidden h-40 flex items-center justify-center`}
            >
              {/* Animated background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              {/* Grid pattern */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#E2E8F0_1px,transparent_1px),linear-gradient(to_bottom,#E2E8F0_1px,transparent_1px)] opacity-30"></div>
              
              {/* Animated glow on hover */}
              <div
                className={`absolute inset-0 bg-gradient-radial from-dashboard-accent/20 to-transparent ${
                  hoveredCard === index ? "opacity-100" : "opacity-0"
                } transition-opacity duration-300`}
              ></div>

              <ProjectPattern pattern={project.pattern} gradient={project.gradient} gridOpacities={project.gridOpacities} />

              {/* Year badge */}
              <div className="absolute top-3 right-3 px-2 py-1 bg-white/80 backdrop-blur-sm rounded-lg text-[10px] font-mono text-slate-500 border border-slate-200">
                {project.year}
              </div>
            </div>

            <div className="card-content p-5 flex flex-col h-[200px]">
              <div className="flex-grow">
                <h3 className="font-bold text-[#0F172A] text-base mb-2 group-hover:text-dashboard-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-slate-50 text-slate-600 border border-slate-200 rounded text-[10px] font-mono font-medium hover:bg-dashboard-accent/10 hover:border-dashboard-accent/30 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-auto">
                <a
                  className="w-full block text-center py-2.5 bg-gradient-to-r from-slate-50 to-slate-100 hover:from-dashboard-accent hover:to-dashboard-accent border border-slate-200 text-slate-700 hover:text-white text-xs font-semibold rounded-lg transition-all duration-300 group/btn relative overflow-hidden"
                  href="#"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    View Analysis
                    <ExternalLink className="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </span>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
