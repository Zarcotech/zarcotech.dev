"use client";

import { useEffect, useRef } from "react";

function Canvas() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const isDarkRef = useRef(true);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const updateTheme = () => {
            const root = document.documentElement;
            const body = document.body;
            const hasDarkClass = root.classList.contains("dark") || body.classList.contains("dark");
            const hasDarkData = root.getAttribute("data-theme") === "dark" || body.getAttribute("data-theme") === "dark";
            isDarkRef.current = hasDarkClass || hasDarkData;
        };

        updateTheme();

        const observer = new MutationObserver(updateTheme);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class", "data-theme"],
        });

        let width = 0;
        let height = 0;
        let frame = 0;

        const stars: any[] = [];
        const comets: any[] = [];
        const particles: any[] = [];

        function init() {
            if (!canvas || !container) return;
            width = canvas.width = container.clientWidth;
            height = canvas.height = container.clientHeight;

            stars.length = 0;
            particles.length = 0;

            for (let i = 0; i < 200; i++) {
                stars.push({
                    x: Math.random() * width,
                    y: Math.random() * height * 0.8,
                    size: Math.random() * 2,
                    seed: Math.random() * 1000,
                    speed: 0.02 + Math.random() * 0.05,
                });
            }

            for (let i = 0; i < 80; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.3,
                    vy: (Math.random() - 0.5) * 0.3,
                    size: 1 + Math.random() * 2,
                    phase: Math.random() * 1000,
                });
            }
        }

        function drawNight() {
            const sky = ctx!.createLinearGradient(0, 0, 0, height);
            sky.addColorStop(0, "#04030a");
            sky.addColorStop(0.6, "#0b0720");
            sky.addColorStop(1, "#1a0b2e");
            ctx!.fillStyle = sky;
            ctx!.fillRect(0, 0, width, height);

            const horizon = ctx!.createLinearGradient(0, height * 0.6, 0, height);
            horizon.addColorStop(0, "rgba(168,85,247,0)");
            horizon.addColorStop(0.5, "rgba(168,85,247,0.15)");
            horizon.addColorStop(1, "rgba(168,85,247,0.35)");
            ctx!.fillStyle = horizon;
            ctx!.fillRect(0, height * 0.6, width, height);

            stars.forEach((s) => {
                const alpha = 0.3 + Math.sin(frame * s.speed + s.seed) * 0.7;
                ctx!.shadowBlur = s.size > 1.2 ? 8 : 0;
                ctx!.shadowColor = "white";
                ctx!.fillStyle = `rgba(255,255,255,${alpha})`;
                ctx!.beginPath();
                ctx!.arc(s.x, s.y, s.size, 0, Math.PI * 2);
                ctx!.fill();
            });

            ctx!.shadowBlur = 0;

            if (Math.random() > 0.99) {
                comets.push({
                    x: Math.random() * width,
                    y: -50,
                    vx: 3 + Math.random() * 4,
                    vy: 3 + Math.random() * 4,
                    life: 1,
                });
            }

            comets.forEach((c, i) => {
                c.x += c.vx;
                c.y += c.vy;
                c.life -= 0.01;

                ctx!.shadowBlur = 10;
                ctx!.shadowColor = "rgba(180,220,255,0.8)";
                ctx!.strokeStyle = `rgba(200,230,255,${c.life})`;
                ctx!.lineWidth = 2;
                ctx!.beginPath();
                ctx!.moveTo(c.x, c.y);
                ctx!.lineTo(c.x - c.vx * 3, c.y - c.vy * 3);
                ctx!.stroke();

                if (c.life <= 0) comets.splice(i, 1);
            });

            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;

                const twinkle = 0.3 + Math.sin(frame * 0.02 + p.phase) * 0.5;

                ctx!.shadowBlur = 6;
                ctx!.shadowColor = "rgba(255,255,255,0.6)";
                ctx!.fillStyle = `rgba(200,220,255,${twinkle})`;
                ctx!.beginPath();
                ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx!.fill();

                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;
            });

            ctx!.shadowBlur = 0;

            const offset1 = Math.sin(frame * 0.002) * 10;
            const offset2 = Math.sin(frame * 0.002 + 1) * 20;

            ctx!.fillStyle = "#07080f";
            ctx!.beginPath();
            ctx!.moveTo(0, height);
            ctx!.lineTo(0, height * 0.85);
            ctx!.quadraticCurveTo(width * 0.3, height * 0.75 + offset1, width * 0.6, height * 0.85);
            ctx!.quadraticCurveTo(width, height * 0.75 + offset1, width, height * 0.85);
            ctx!.lineTo(width, height);
            ctx!.fill();

            ctx!.fillStyle = "#0c0d12";
            ctx!.beginPath();
            ctx!.moveTo(0, height);
            ctx!.lineTo(0, height * 0.8);
            ctx!.quadraticCurveTo(width * 0.3, height * 0.7 + offset2, width * 0.6, height * 0.8);
            ctx!.quadraticCurveTo(width, height * 0.7 + offset2, width, height * 0.8);
            ctx!.lineTo(width, height);
            ctx!.fill();
        }

        function drawDay() {
            const sky = ctx!.createLinearGradient(0, 0, 0, height);
            sky.addColorStop(0, "#87ceeb");
            sky.addColorStop(1, "#e0f7ff");
            ctx!.fillStyle = sky;
            ctx!.fillRect(0, 0, width, height);

            particles.forEach((p) => {
                p.x += p.vx * 0.5;
                p.y += p.vy * 0.5;

                const glow = 0.2 + Math.sin(frame * 0.02 + p.phase) * 0.3;

                ctx!.fillStyle = `rgba(255,255,255,${glow})`;
                ctx!.beginPath();
                ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx!.fill();

                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;
            });

            const offset1 = Math.sin(frame * 0.002) * 10;
            const offset2 = Math.sin(frame * 0.002 + 1) * 20;

            ctx!.fillStyle = "#14532d";
            ctx!.beginPath();
            ctx!.moveTo(0, height);
            ctx!.lineTo(0, height * 0.85);
            ctx!.quadraticCurveTo(width * 0.3, height * 0.75 + offset1, width * 0.6, height * 0.85);
            ctx!.quadraticCurveTo(width, height * 0.75 + offset1, width, height * 0.85);
            ctx!.lineTo(width, height);
            ctx!.fill();

            ctx!.fillStyle = "#22c55e";
            ctx!.beginPath();
            ctx!.moveTo(0, height);
            ctx!.lineTo(0, height * 0.8);
            ctx!.quadraticCurveTo(width * 0.3, height * 0.7 + offset2, width * 0.6, height * 0.8);
            ctx!.quadraticCurveTo(width, height * 0.7 + offset2, width, height * 0.8);
            ctx!.lineTo(width, height);
            ctx!.fill();
        }

        function draw() {
            if (isDarkRef.current) drawNight();
            else drawDay();
            frame++;
            requestAnimationFrame(draw);
        }

        const resizeObserver = new ResizeObserver(() => init());
        resizeObserver.observe(container);

        init();
        const animationId = requestAnimationFrame(draw);

        return () => {
            resizeObserver.disconnect();
            cancelAnimationFrame(animationId);
            observer.disconnect();
        };
    }, []);

    return (
        <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden z-0">
            <canvas ref={canvasRef} className="block w-full h-full" />
        </div>
    );
}

export default Canvas;  