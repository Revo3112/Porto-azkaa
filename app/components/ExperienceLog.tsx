"use client";

import { useEffect, useRef, useCallback } from "react";
import { Table2, Download, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const experiences = [
  {
    period: "Aug 2025 - Oct 2025",
    role: "Data Analyst Intern - Procurement & Asset Management",
    company: "PT Pertamina Retail",
    description: "Analyzed sales trends and implemented automated reporting dashboards.",
    skills: ["SQL", "PowerBI"],
    impacts: [
      { text: "30% Reduced Errors", type: "teal", icon: "trending-down" },
      { text: "40% Dashboard Adoption", type: "blue", icon: "chart-line" },
    ],
  },
  {
    period: "Jul 2025",
    role: "System Analyst Intern",
    company: "Insan Permata Hospital",
    description: "Optimized patient data entry and analyzed wait times.",
    skills: ["Excel", "Analytics"],
    impacts: [
      { text: "12% Cycle Time Cut", type: "teal", icon: "timer" },
      { text: "17% Wait Time Decrease", type: "teal", icon: "hourglass" },
    ],
  },
  {
    period: "May 2024 - Jan 2025",
    role: "Social Media Specialist - Intern (TLC)",
    company: "Universitas Pembangunan Jaya",
    description: "Managed academic social media and analyzed engagement metrics.",
    skills: ["Social Data", "Growth"],
    impacts: [{ text: "35% Site Traffic Increase", type: "blue", icon: "trending-up" }],
  },
];

export default function ExperienceLog() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLTableSectionElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const cleanupFunctionsRef = useRef<Array<() => void>>([]);

  const handleImpactHover = useCallback((e: React.MouseEvent) => {
    gsap.to(e.currentTarget, {
      scale: 1.05,
      duration: 0.2,
      ease: "power2.out"
    });
  }, []);

  const handleImpactLeave = useCallback((e: React.MouseEvent) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      duration: 0.25,
      ease: "power2.out"
    });
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(headerRef.current, { opacity: 0, y: -15 });
      if (rowsRef.current) {
        const rows = rowsRef.current.querySelectorAll("tr");
        gsap.set(rows, { opacity: 0, x: -30 });
      }
      gsap.set(footerRef.current, { opacity: 0, y: 15 });

      gsap.to(headerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

      if (rowsRef.current) {
        const rows = rowsRef.current.querySelectorAll("tr");
        gsap.to(rows, {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none"
          }
        });

        rows.forEach((row) => {
          const handleMouseEnter = () => {
            gsap.to(row, {
              backgroundColor: "rgba(241, 245, 249, 1)",
              duration: 0.25
            });
          };

          const handleMouseLeave = () => {
            gsap.to(row, {
              backgroundColor: "transparent",
              duration: 0.25
            });
          };

          row.addEventListener("mouseenter", handleMouseEnter);
          row.addEventListener("mouseleave", handleMouseLeave);

          cleanupFunctionsRef.current.push(() => {
            row.removeEventListener("mouseenter", handleMouseEnter);
            row.removeEventListener("mouseleave", handleMouseLeave);
          });
        });
      }

      gsap.to(footerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          toggleActions: "play none none none"
        }
      });
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
      id="experience"
      className="xl:col-span-2 bg-white rounded-bento border border-dashboard-border flex flex-col"
    >
      <div
        ref={headerRef}
        className="p-5 border-b border-dashboard-border flex justify-between items-center bg-gradient-to-r from-slate-50 to-white rounded-t-bento shrink-0"
      >
        <h2 className="font-bold text-dashboard-text flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-dashboard-accent/10 flex items-center justify-center">
            <Table2 className="w-4 h-4 text-dashboard-accent" />
          </div>
          Experience Log
        </h2>
        <div className="flex gap-2">
          <span className="px-2 py-1 text-[10px] font-mono bg-white border border-slate-200 rounded text-slate-500 hover:border-dashboard-accent/30 transition-colors cursor-pointer">
            Filter: All
          </span>
          <span className="px-2 py-1 text-[10px] font-mono bg-white border border-slate-200 rounded text-slate-500 hover:border-dashboard-accent/30 transition-colors cursor-pointer">
            Sort: Date Desc
          </span>
        </div>
      </div>
      <div className="overflow-x-auto grow-0">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-xs font-semibold text-slate-500 bg-slate-50 border-b border-dashboard-border">
              <th className="p-4 w-32">Period</th>
              <th className="p-4">Role &amp; Company</th>
              <th className="p-4 w-40 text-right">Impact</th>
            </tr>
          </thead>
          <tbody ref={rowsRef} className="text-sm divide-y divide-slate-100">
            {experiences.map((exp, index) => (
              <tr
                key={index}
                className="group transition-colors cursor-pointer"
              >
                <td className="p-4 font-mono text-xs text-slate-500 align-top pt-5">
                  <div className="flex items-center gap-2">
                    <ChevronRight className="w-3 h-3 text-dashboard-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                    {exp.period}
                  </div>
                </td>
                <td className="p-4 align-top">
                  <div className="font-bold text-dashboard-text group-hover:text-dashboard-accent transition-colors">
                    {exp.role}
                  </div>
                  <div className="text-xs text-slate-500 mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-dashboard-accent/50"></span>
                    {exp.company}
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed max-w-md">
                    {exp.description}
                  </p>
                  <div className="mt-3 flex gap-2">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded border border-blue-100 text-[10px] font-mono hover:bg-blue-100 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-4 text-right align-top pt-5 space-y-2">
                  {exp.impacts.map((impact, i) => (
                    <span
                      key={i}
                      onMouseEnter={handleImpactHover}
                      onMouseLeave={handleImpactLeave}
                      className={`inline-block px-3 py-1.5 rounded-full text-[10px] font-bold font-mono cursor-pointer ${
                        impact.type === "teal"
                          ? "bg-teal-50 text-teal-700 border border-teal-100"
                          : "bg-blue-50 text-blue-700 border border-blue-100"
                      }`}
                    >
                      {impact.text}
                    </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-auto border-t border-dashboard-border shrink-0">
        <div
          ref={footerRef}
          className="p-4 text-center"
        >
          <button className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-600 hover:text-dashboard-accent border border-slate-200 rounded-lg hover:border-dashboard-accent/30 transition-all duration-200 group">
            <Download className="w-3.5 h-3.5 group-hover:animate-bounce" />
            Download Full History CSV
          </button>
        </div>
      </div>
    </section>
  );
}
