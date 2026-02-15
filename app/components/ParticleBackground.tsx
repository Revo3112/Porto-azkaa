"use client";

import { useEffect, useRef } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const gridRef = useRef<{ offsetX: number; offsetY: number }>({ offsetX: 0, offsetY: 0 });
  const glowOrbsRef = useRef<Array<{ x: number; y: number; size: number; speed: number; opacity: number }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    for (let i = 0; i < 5; i++) {
      glowOrbsRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 200 + 100,
        speed: Math.random() * 0.3 + 0.1,
        opacity: Math.random() * 0.15 + 0.05,
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      gridRef.current.offsetX = (e.clientX / window.innerWidth - 0.5) * 20;
      gridRef.current.offsetY = (e.clientY / window.innerHeight - 0.5) * 20;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const gridSize = 60;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01;

      glowOrbsRef.current.forEach((orb) => {
        orb.x += Math.sin(time + orb.speed * 10) * 0.5;
        orb.y += Math.cos(time + orb.speed * 10) * 0.3;

        if (orb.x < -orb.size) orb.x = canvas.width + orb.size;
        if (orb.x > canvas.width + orb.size) orb.x = -orb.size;
        if (orb.y < -orb.size) orb.y = canvas.height + orb.size;
        if (orb.y > canvas.height + orb.size) orb.y = -orb.size;

        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.size);
        gradient.addColorStop(0, `rgba(37, 99, 235, ${orb.opacity})`);
        gradient.addColorStop(0.5, `rgba(37, 99, 235, ${orb.opacity * 0.3})`);
        gradient.addColorStop(1, "rgba(37, 99, 235, 0)");

        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      ctx.strokeStyle = "rgba(148, 163, 184, 0.08)";
      ctx.lineWidth = 1;

      const offsetX = gridRef.current.offsetX;
      const offsetY = gridRef.current.offsetY;

      for (let x = 0; x <= canvas.width + gridSize; x += gridSize) {
        const wave = Math.sin(time * 0.5 + x * 0.01) * 2;
        ctx.beginPath();
        ctx.moveTo(x + offsetX, 0);
        ctx.lineTo(x + offsetX + wave, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y <= canvas.height + gridSize; y += gridSize) {
        const wave = Math.cos(time * 0.5 + y * 0.01) * 2;
        ctx.beginPath();
        ctx.moveTo(0, y + offsetY);
        ctx.lineTo(canvas.width, y + offsetY + wave);
        ctx.stroke();
      }

      ctx.fillStyle = "rgba(148, 163, 184, 0.12)";
      for (let x = 0; x <= canvas.width + gridSize; x += gridSize) {
        for (let y = 0; y <= canvas.height + gridSize; y += gridSize) {
          const dotX = x + offsetX + Math.sin(time + x * 0.01) * 1;
          const dotY = y + offsetY + Math.cos(time + y * 0.01) * 1;
          
          ctx.beginPath();
          ctx.arc(dotX, dotY, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <>
      <div className="fixed inset-0 z-0 grid-background" />
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ background: "transparent" }}
      />
    </>
  );
}
