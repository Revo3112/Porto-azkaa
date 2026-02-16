"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { BarChart3, ArrowRight, ExternalLink } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectGallery from "./ProjectGallery";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  {
    title: "BNSP Student Performance Analysis",
    description: "Certification project analyzing 2,000+ student records using Tableau, Python & SQL to identify academic patterns and attendance correlations.",
    skills: ["Tableau", "Python", "SQL", "Data Validation"],
    year: "2025",
    image: "/BNSP.png",
    hasGallery: true,
  },
  {
    title: "MSIB - European Bike Sales Strategy",
    description: "Comprehensive analysis of bicycle sales trends across Europe, identifying key market segments and strategic recommendations for targeted marketing campaigns.",
    skills: ["Tableau", "Market Analysis", "Strategic Planning", "Data Visualization"],
    year: "2024",
    image: "/Kampus Merdeka.png",
    hasGallery: true,
    galleryType: "msib",
  },
  {
    title: "User Insights: Smart Investment Analytics",
    description: "Data mining project analyzing user demographics, digital behavior patterns, and device preferences to identify high-value investment opportunities and market segments.",
    skills: ["Data Mining", "User Analytics", "Market Segmentation", "Investment Strategy"],
    year: "2025",
    image: "/Insight Dominasi.png",
    hasGallery: true,
    galleryType: "insight",
  },
];

function ProjectPattern({
  pattern,
  gradient,
  gridOpacities,
}: {
  pattern?: string;
  gradient?: string;
  gridOpacities?: number[];
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
      {(gridOpacities || []).map((opacity, i) => (
        <div
          key={i}
          className={`bg-gradient-to-br ${gradient || "from-slate-400 to-slate-500"} rounded-sm animate-scale-in`}
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
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [activeGallery, setActiveGallery] = useState<"bnsp" | "msib" | "insight" | null>(null);
  const hoverTweensRef = useRef<Map<number, gsap.core.Tween[]>>(new Map());
  const gsapContextRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    gsapContextRef.current = gsap.context(() => {
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

      const cards = cardsContainerRef.current?.querySelectorAll(".project-card");
      if (cards && cards.length > 0) {
        gsap.set(cards, {
          opacity: 0,
          y: 80,
          scale: 0.9,
          filter: "blur(10px)",
        });

        ScrollTrigger.create({
          trigger: cardsContainerRef.current,
          start: "top 80%",
          onEnter: () => {
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
      if (gsapContextRef.current) {
        gsapContextRef.current.revert();
        gsapContextRef.current = null;
      }
      hoverTweensRef.current.forEach((tweens) => {
        tweens.forEach((tween) => tween.kill());
      });
      hoverTweensRef.current.clear();
    };
  }, []);

  const killCardTweens = useCallback((index: number) => {
    const existingTweens = hoverTweensRef.current.get(index);
    if (existingTweens) {
      existingTweens.forEach((tween) => tween.kill());
      hoverTweensRef.current.delete(index);
    }
  }, []);

  const handleCardHover = useCallback((e: React.MouseEvent, index: number) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    setHoveredCard(index);
    killCardTweens(index);

    const tweens: gsap.core.Tween[] = [];

    tweens.push(
      gsap.to(card, {
        rotateY: x * 20,
        rotateX: -y * 20,
        scale: 1.03,
        boxShadow: "0 30px 60px rgba(37, 99, 235, 0.2)",
        duration: 0.4,
        ease: "power2.out",
      })
    );

    const innerContent = card.querySelector(".card-content");
    if (innerContent) {
      tweens.push(
        gsap.to(innerContent, {
          y: -5,
          duration: 0.3,
          ease: "power2.out",
        })
      );
    }

    hoverTweensRef.current.set(index, tweens);
  }, [killCardTweens]);

  const handleCardLeave = useCallback((e: React.MouseEvent, index: number) => {
    const card = e.currentTarget;
    setHoveredCard(null);
    killCardTweens(index);

    const tweens: gsap.core.Tween[] = [];

    tweens.push(
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        scale: 1,
        boxShadow: "none",
        duration: 0.6,
        ease: "elastic.out(1, 0.4)",
      })
    );

    const innerContent = card.querySelector(".card-content");
    if (innerContent) {
      tweens.push(
        gsap.to(innerContent, {
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.4)",
        })
      );
    }

    hoverTweensRef.current.set(index, tweens);
  }, [killCardTweens]);

  const handleViewDetails = (project: typeof projects[0], index: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (project.hasGallery) {
      let galleryType: "bnsp" | "msib" | "insight" = "bnsp";
      if (index === 0) galleryType = "bnsp";
      else if (index === 1) galleryType = "msib";
      else if (index === 2) galleryType = "insight";
      setActiveGallery(galleryType);
      setGalleryOpen(true);
    }
  };

  return (
    <>
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
              onMouseLeave={(e) => handleCardLeave(e, index)}
            >
              <div
                className={`bg-slate-50 p-6 border-b border-dashboard-border relative overflow-hidden h-40 flex items-center justify-center`}
              >
                {/* Animated background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${(project as any).gradient || "from-slate-400 to-slate-500"} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                {/* Grid pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#E2E8F0_1px,transparent_1px),linear-gradient(to_bottom,#E2E8F0_1px,transparent_1px)] opacity-30"></div>
                
                {/* Animated glow on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-radial from-dashboard-accent/20 to-transparent ${
                    hoveredCard === index ? "opacity-100" : "opacity-0"
                  } transition-opacity duration-300`}
                ></div>

                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="lazy"
                    className="object-cover rounded-lg"
                  />
                ) : (
                  <ProjectPattern 
                    pattern={(project as any).pattern} 
                    gradient={(project as any).gradient} 
                    gridOpacities={(project as any).gridOpacities} 
                  />
                )}

                {/* Year badge */}
                <div className="absolute top-3 right-3 px-2 py-1 bg-white/80 backdrop-blur-sm rounded-lg text-[10px] font-mono text-slate-500 border border-slate-200">
                  {project.year}
                </div>

                {/* Gallery indicator */}
                {project.hasGallery && (
                  <div className="absolute top-3 left-3 px-2 py-1 bg-blue-500 text-white rounded-lg text-[9px] font-bold uppercase tracking-wider">
                    Interactive
                  </div>
                )}
              </div>

              <div className="card-content p-4 flex flex-col" style={{ minHeight: '220px' }}>
                <div className="flex-grow">
                  <h3 className="font-bold text-[#0F172A] text-sm mb-2 group-hover:text-dashboard-accent transition-colors line-clamp-2">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-3 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 bg-slate-50 text-slate-600 border border-slate-200 rounded text-[9px] font-mono font-medium hover:bg-dashboard-accent/10 hover:border-dashboard-accent/30 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                    {project.skills.length > 3 && (
                      <span className="px-2 py-0.5 text-[9px] text-slate-400">
                        +{project.skills.length - 3}
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-auto pt-2">
                  <button
                    onClick={(e) => handleViewDetails(project, index, e)}
                    className="w-full py-2 px-3 bg-slate-50 hover:bg-dashboard-accent border border-slate-200 hover:border-dashboard-accent text-slate-700 hover:text-white text-[11px] font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 group/btn"
                  >
                    {project.hasGallery ? "View Gallery" : "View Analysis"}
                    <ExternalLink className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Project Gallery Modal */}
      <ProjectGallery 
        isOpen={galleryOpen} 
        onClose={() => {
          setGalleryOpen(false);
          setActiveGallery(null);
        }} 
        galleryType={activeGallery}
      />
    </>
  );
}
