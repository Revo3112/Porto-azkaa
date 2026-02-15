"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const techStack = [
  {
    name: "LARAVEL",
    icon: "fab fa-laravel",
    hoverColor: "group-hover:text-[#FF2D20]",
    hoverBg: "group-hover:bg-red-50",
    description: "PHP Framework",
  },
  {
    name: "PHP",
    icon: "fab fa-php",
    hoverColor: "group-hover:text-[#777BB4]",
    hoverBg: "group-hover:bg-indigo-50",
    description: "Backend Language",
  },
  {
    name: "PYTHON",
    icon: "fab fa-python",
    hoverColor: "group-hover:text-[#3776AB]",
    hoverBg: "group-hover:bg-blue-50",
    description: "Data Science",
  },
  {
    name: "SQL",
    icon: "fas fa-database",
    hoverColor: "group-hover:text-[#00758F]",
    hoverBg: "group-hover:bg-cyan-50",
    description: "Database Query",
  },
  {
    name: "TABLEAU",
    icon: "fas fa-chart-pie",
    hoverColor: "group-hover:text-[#E97627]",
    hoverBg: "group-hover:bg-orange-50",
    description: "Data Visualization",
  },
  {
    name: "POWER BI",
    icon: "fas fa-chart-bar",
    hoverColor: "group-hover:text-[#F2C811]",
    hoverBg: "group-hover:bg-yellow-50",
    description: "Business Intel",
  },
];

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cleanupFunctionsRef = useRef<Array<() => void>>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation - slide from left with blur effect
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, x: -30, filter: "blur(6px)" },
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Grid items - Premium 2026 style staggered reveal
      const items = gridRef.current?.querySelectorAll(".tech-item");
      if (items && items.length > 0) {
        // Set initial state - completely hidden with blur
        gsap.set(items, {
          opacity: 0,
          y: 50,
          scale: 0.85,
          filter: "blur(8px)",
        });

        // Create ScrollTrigger for premium staggered reveal
        ScrollTrigger.create({
          trigger: gridRef.current,
          start: "top 85%",
          onEnter: () => {
            // Premium staggered reveal from center outward
            gsap.to(items, {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              duration: 0.7,
              stagger: {
                each: 0.08,
                from: "center",
                ease: "power2.out",
              },
              ease: "power3.out",
            });
          },
          once: true,
        });

        // Interactive hover effects
        items.forEach((item) => {
          const handleMouseEnter = (e: Event) => {
            const mouseEvent = e as MouseEvent;
            const target = mouseEvent.currentTarget as HTMLElement;
            const rect = target.getBoundingClientRect();
            const x = (mouseEvent.clientX - rect.left) / rect.width - 0.5;
            const y = (mouseEvent.clientY - rect.top) / rect.height - 0.5;

            gsap.to(target, {
              rotateY: x * 25,
              rotateX: -y * 25,
              scale: 1.12,
              boxShadow: "0 20px 40px rgba(37, 99, 235, 0.2)",
              duration: 0.35,
              ease: "power2.out",
            });

            // Icon pop animation
            const icon = target.querySelector("i");
            if (icon) {
              gsap.to(icon, {
                scale: 1.25,
                y: -4,
                duration: 0.35,
                ease: "back.out(2)",
              });
            }
          };

          const handleMouseMove = (e: Event) => {
            const mouseEvent = e as MouseEvent;
            const target = mouseEvent.currentTarget as HTMLElement;
            const rect = target.getBoundingClientRect();
            const x = (mouseEvent.clientX - rect.left) / rect.width - 0.5;
            const y = (mouseEvent.clientY - rect.top) / rect.height - 0.5;

            gsap.to(target, {
              rotateY: x * 25,
              rotateX: -y * 25,
              duration: 0.15,
              ease: "power1.out",
            });
          };

          const handleMouseLeave = (e: Event) => {
            const target = e.currentTarget as HTMLElement;
            
            gsap.to(target, {
              rotateY: 0,
              rotateX: 0,
              scale: 1,
              boxShadow: "none",
              duration: 0.6,
              ease: "elastic.out(1, 0.4)",
            });

            const icon = target.querySelector("i");
            if (icon) {
              gsap.to(icon, {
                scale: 1,
                y: 0,
                duration: 0.6,
                ease: "elastic.out(1, 0.4)",
              });
            }
          };

          item.addEventListener("mouseenter", handleMouseEnter);
          item.addEventListener("mousemove", handleMouseMove);
          item.addEventListener("mouseleave", handleMouseLeave);

          cleanupFunctionsRef.current.push(() => {
            item.removeEventListener("mouseenter", handleMouseEnter);
            item.removeEventListener("mousemove", handleMouseMove);
            item.removeEventListener("mouseleave", handleMouseLeave);
          });
        });
      }
    }, sectionRef);

    return () => {
      cleanupFunctionsRef.current.forEach(cleanup => cleanup());
      cleanupFunctionsRef.current = [];
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-white rounded-[12px] shadow-card border border-dashboard-border p-6 relative overflow-hidden"
    >
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-dashboard-accent/5 to-transparent rounded-bl-full pointer-events-none"></div>

      <h3
        ref={titleRef}
        className="text-xs font-bold uppercase tracking-wider text-dashboard-muted mb-5 flex items-center gap-2"
      >
        <div className="w-1 h-4 bg-dashboard-accent rounded-full"></div>
        Technical Stack Inventory
      </h3>

      <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {techStack.map((tech) => (
          <div
            key={tech.name}
            className="tech-item flex flex-col items-center justify-center p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-dashboard-accent/20 hover:bg-white hover:shadow-lg transition-all duration-300 group cursor-pointer relative"
            style={{
              transformStyle: "preserve-3d",
              perspective: "500px",
            }}
          >
            {/* Shine effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

            <div
              className={`w-12 h-12 rounded-lg bg-white shadow-sm flex items-center justify-center mb-2 ${tech.hoverBg} transition-colors duration-300`}
            >
              <i
                className={`${tech.icon} text-2xl text-slate-400 ${tech.hoverColor} transition-colors duration-300`}
              ></i>
            </div>
            <span className="text-[10px] font-mono font-bold text-slate-600 group-hover:text-dashboard-dark transition-colors">
              {tech.name}
            </span>
            <span className="text-[8px] text-slate-400 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {tech.description}
            </span>

            {/* Progress bar animation on hover */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-dashboard-accent w-0 group-hover:w-full transition-all duration-500 ease-out"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
