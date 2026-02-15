"use client";

import { useEffect, useRef } from "react";
import { GraduationCap, Award, TrendingUp } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const softSkills = [
  "Analytical Thinking",
  "Project Management",
  "Problem Solving",
  "Leadership",
  "Integrity",
];

const certifications = [
  {
    icon: "fa-certificate",
    iconBg: "bg-gradient-to-br from-red-50 to-red-100",
    iconColor: "text-red-600",
    borderColor: "hover:border-red-300",
    title: "BNSP Certified",
    subtitle: "Associate Data Analyst",
    year: "2025",
    badge: "Certified",
  },
  {
    icon: "fa-graduation-cap",
    iconBg: "bg-gradient-to-br from-indigo-50 to-indigo-100",
    iconColor: "text-indigo-600",
    borderColor: "hover:border-indigo-300",
    title: "Data Analyst Academy",
    subtitle: "Professional Certificate",
    year: "2024",
    badge: "Professional",
  },
  {
    icon: "fa-google",
    iconBg: "bg-gradient-to-br from-blue-50 to-blue-100",
    iconColor: "text-blue-600",
    borderColor: "hover:border-blue-300",
    title: "Google Data Analytics",
    subtitle: "Professional Certificate",
    year: "2026",
    badge: "Expert",
  },
];

export default function Qualifications() {
  const sectionRef = useRef<HTMLElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const certsRef = useRef<HTMLDivElement>(null);
  const cleanupFunctionsRef = useRef<Array<() => void>>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Education card animation with 3D effect
      if (educationRef.current) {
        ScrollTrigger.create({
          trigger: educationRef.current,
          start: "top 85%",
          onEnter: () => {
            gsap.to(educationRef.current, {
              opacity: 1,
              y: 0,
              rotateX: 0,
              scale: 1,
              duration: 0.8,
              ease: "power3.out",
            });
          },
          once: true,
        });

        // Initial state
        gsap.set(educationRef.current, { opacity: 0, y: 50, rotateX: -10, scale: 0.95 });

        // GPA counter animation
        const gpaElement = educationRef.current.querySelector(".gpa-value") as HTMLElement | null;
        if (gpaElement) {
          ScrollTrigger.create({
            trigger: educationRef.current,
            start: "top 80%",
            onEnter: () => {
              const obj = { value: 0 };
              gsap.to(obj, {
                value: 3.63,
                duration: 2,
                ease: "power2.out",
                onUpdate: function () {
                  gpaElement.textContent = obj.value.toFixed(2);
                },
              });
            },
            once: true,
          });
        }

        // Floating animation for education glow
        const glowElement = educationRef.current.querySelector(".edu-glow");
        if (glowElement) {
          gsap.to(glowElement, {
            scale: 1.2,
            opacity: 0.4,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
          });
        }
      }

      // Skills staggered animation
      if (skillsRef.current) {
        ScrollTrigger.create({
          trigger: skillsRef.current,
          start: "top 85%",
          onEnter: () => {
            gsap.to(skillsRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              onComplete: () => {
                // Animate skill badges with stagger
                const badges = skillsRef.current?.querySelectorAll("span");
                if (badges) {
                  gsap.fromTo(
                    badges,
                    { opacity: 0, scale: 0.8, y: 10 },
                    {
                      opacity: 1,
                      scale: 1,
                      y: 0,
                      stagger: 0.1,
                      duration: 0.4,
                      ease: "back.out(1.7)",
                    }
                  );
                }
              },
            });
          },
          once: true,
        });

        gsap.set(skillsRef.current, { opacity: 0, y: 30 });
      }

      // Certifications staggered animation with 3D cards
      const certCards = certsRef.current?.querySelectorAll(".cert-card");
      if (certCards && certsRef.current) {
        ScrollTrigger.create({
          trigger: certsRef.current,
          start: "top 80%",
          onEnter: () => {
            gsap.to(certCards, {
              opacity: 1,
              y: 0,
              rotateY: 0,
              scale: 1,
              duration: 0.7,
              stagger: 0.15,
              ease: "power3.out",
            });
          },
          once: true,
        });

        gsap.set(certCards, { opacity: 0, y: 40, rotateY: -15, scale: 0.9 });

        // 3D tilt effect on hover - with proper cleanup
        certCards.forEach((card) => {
          const handleMouseEnter = (e: Event) => {
            const mouseEvent = e as MouseEvent;
            const target = mouseEvent.currentTarget as HTMLElement;
            const rect = target.getBoundingClientRect();
            const x = (mouseEvent.clientX - rect.left) / rect.width - 0.5;
            const y = (mouseEvent.clientY - rect.top) / rect.height - 0.5;

            gsap.to(target, {
              rotateY: x * 10,
              rotateX: -y * 10,
              scale: 1.02,
              boxShadow: "0 15px 30px rgba(37, 99, 235, 0.15)",
              duration: 0.3,
              ease: "power2.out",
            });
          };

          const handleMouseLeave = (e: Event) => {
            gsap.to(e.currentTarget as HTMLElement, {
              rotateY: 0,
              rotateX: 0,
              scale: 1,
              boxShadow: "none",
              duration: 0.5,
              ease: "elastic.out(1, 0.5)",
            });
          };

          card.addEventListener("mouseenter", handleMouseEnter);
          card.addEventListener("mouseleave", handleMouseLeave);

          cleanupFunctionsRef.current.push(() => {
            card.removeEventListener("mouseenter", handleMouseEnter);
            card.removeEventListener("mouseleave", handleMouseLeave);
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
    <section ref={sectionRef} id="qualifications" className="xl:col-span-1 space-y-6">
      {/* Education Card */}
      <div
        ref={educationRef}
        className="bg-gradient-to-br from-dashboard-dark via-slate-800 to-slate-900 text-white p-6 rounded-[8px] shadow-card relative overflow-hidden group cursor-pointer"
        style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
      >
        {/* Animated glow */}
        <div className="edu-glow absolute right-[-20px] top-[-20px] w-32 h-32 bg-dashboard-accent/30 rounded-full blur-3xl pointer-events-none"></div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dashboard-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="flex items-center gap-2 mb-4 text-slate-300 text-xs uppercase tracking-wider font-bold">
          <div className="w-6 h-6 rounded bg-dashboard-accent/20 flex items-center justify-center">
            <GraduationCap className="w-3.5 h-3.5 text-dashboard-accent" />
          </div>
          Education
        </div>
        
        <h3 className="font-bold text-lg leading-tight mb-1 group-hover:text-dashboard-accent transition-colors">
          Pembangunan Jaya University
        </h3>
        <p className="text-slate-400 text-xs mb-4">Bachelor of Informatics</p>
        
        <div className="flex justify-between items-end border-t border-slate-700 pt-4">
          <div className="text-xs text-slate-400">
            Aug 2022 - Feb 2026
            <br />
            <span className="text-[10px] mt-1 text-slate-500 block flex items-center gap-1">
              <Award className="w-3 h-3 text-yellow-500" />
              FORKAFEST • Cyber Security Basics
            </span>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-slate-500 uppercase font-mono flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-green-400" />
              GPA
            </div>
            <div className="text-3xl font-mono font-bold text-white group-hover:text-dashboard-accent transition-colors">
              <span className="gpa-value">3.63</span>
              <span className="text-sm text-slate-500 font-normal">/4.00</span>
            </div>
          </div>
        </div>
      </div>

      {/* Soft Skills */}
      <div
        ref={skillsRef}
        className="bg-white p-4 rounded-[8px] border border-dashboard-border shadow-sm hover:shadow-md transition-shadow"
      >
        <h4 className="font-bold text-xs text-dashboard-text mb-3 uppercase tracking-wider flex items-center gap-2">
          <div className="w-1 h-4 bg-dashboard-accent rounded-full"></div>
          Soft Skills
        </h4>
        <div className="flex flex-wrap gap-2">
          {softSkills.map((skill, index) => (
            <span
              key={skill}
              className="px-3 py-1.5 bg-slate-50 text-slate-600 border border-slate-100 rounded-lg text-[10px] font-mono hover:bg-dashboard-accent/10 hover:border-dashboard-accent/30 hover:text-dashboard-accent transition-all cursor-default"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div ref={certsRef} className="grid grid-cols-1 gap-3">
        {certifications.map((cert, index) => (
          <div
            key={index}
            className={`cert-card bg-white p-4 rounded-[8px] border border-dashboard-border shadow-sm flex items-center gap-4 ${cert.borderColor} transition-all cursor-pointer`}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              className={`w-10 h-10 rounded-lg ${cert.iconBg} flex items-center justify-center ${cert.iconColor} shrink-0 shadow-sm`}
            >
              <i className={`fas ${cert.icon}`}></i>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-xs text-dashboard-text truncate">
                  {cert.title}
                </h4>
                <span className="px-1.5 py-0.5 bg-dashboard-accent/10 text-dashboard-accent text-[8px] font-bold rounded">
                  {cert.badge}
                </span>
              </div>
              <p className="text-[10px] text-slate-500 truncate">{cert.subtitle}</p>
              <p className="text-[10px] font-mono text-slate-400 mt-0.5">
                {cert.year}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
