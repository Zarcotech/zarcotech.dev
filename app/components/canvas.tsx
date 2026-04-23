"use client";

import { useEffect, useRef } from "react";

type IconSprite = {
    image: HTMLImageElement;
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    rotation: number;
    spin: number;
};

const ICON_SOURCES = [
    "/icons/c++.png",
    "/icons/css.png",
    "/icons/html.png",
    "/icons/js.png",
    "/icons/nextjs.png",
    "/icons/nodejs.png",
    "/icons/python.png",
    "/icons/react.png",
    "/icons/rust.png",
    "/icons/scratch.png",
    "/icons/tkinter.png",
];

function Canvas() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const spritesRef = useRef<IconSprite[]>([]);
    const dragIndexRef = useRef(-1);
    const pointerRef = useRef({ x: 0, y: 0, down: false, prevX: 0, prevY: 0 });
    const frameRef = useRef<number | null>(null);
    const sizeRef = useRef({ width: 0, height: 0, dpr: 1 });

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const loadImage = (src: string) =>
            new Promise<HTMLImageElement>((resolve, reject) => {
                const image = new Image();
                image.src = src;
                image.onload = () => resolve(image);
                image.onerror = () => reject(new Error(`Failed to load ${src}`));
            });

        const resizeCanvas = () => {
            const width = container.clientWidth;
            const height = container.clientHeight;
            const dpr = Math.max(1, window.devicePixelRatio || 1);
            sizeRef.current = { width, height, dpr };
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        const spawnSprites = (images: HTMLImageElement[]) => {
            const { width, height } = sizeRef.current;
            const count = Math.max(20, Math.min(80, Math.floor((width * height) / 30000)));
            spritesRef.current = Array.from({ length: count }, () => {
                const image = images[Math.floor(Math.random() * images.length)];
                const size = 28 + Math.random() * 30;
                return {
                    image,
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 1.2,
                    vy: (Math.random() - 0.5) * 1.2,
                    size,
                    rotation: Math.random() * Math.PI * 2,
                    spin: (Math.random() - 0.5) * 0.02,
                };
            });
        };

        const pickSprite = (x: number, y: number) => {
            const sprites = spritesRef.current;
            for (let i = sprites.length - 1; i >= 0; i -= 1) {
                const sprite = sprites[i];
                const dx = sprite.x - x;
                const dy = sprite.y - y;
                const radius = sprite.size * 0.45;
                if ((dx * dx) + (dy * dy) <= radius * radius) return i;
            }
            return -1;
        };

        const pushNearby = (x: number, y: number, dx: number, dy: number) => {
            const radius = 180;
            const radiusSq = radius * radius;
            const sprites = spritesRef.current;
            for (let i = 0; i < sprites.length; i += 1) {
                if (i === dragIndexRef.current) continue;
                const sprite = sprites[i];
                const ox = sprite.x - x;
                const oy = sprite.y - y;
                const distSq = (ox * ox) + (oy * oy);
                if (distSq > radiusSq) continue;
                const power = 1 - (distSq / radiusSq);
                sprite.vx += dx * 0.16 * power;
                sprite.vy += dy * 0.16 * power;
            }
        };

        const onPointerDown = (event: PointerEvent) => {
            pointerRef.current.down = true;
            pointerRef.current.x = event.clientX;
            pointerRef.current.y = event.clientY;
            pointerRef.current.prevX = event.clientX;
            pointerRef.current.prevY = event.clientY;
            dragIndexRef.current = pickSprite(event.clientX, event.clientY);
        };

        const onPointerMove = (event: PointerEvent) => {
            const pointer = pointerRef.current;
            const dx = event.clientX - pointer.prevX;
            const dy = event.clientY - pointer.prevY;
            pointer.x = event.clientX;
            pointer.y = event.clientY;
            pointer.prevX = event.clientX;
            pointer.prevY = event.clientY;
            if (!pointer.down) return;
            pushNearby(pointer.x, pointer.y, dx, dy);
        };

        const onPointerUp = () => {
            pointerRef.current.down = false;
            dragIndexRef.current = -1;
        };

        const tick = () => {
            const { width, height } = sizeRef.current;
            ctx.clearRect(0, 0, width, height);

            const pointer = pointerRef.current;
            const dragIndex = dragIndexRef.current;
            const sprites = spritesRef.current;

            for (let i = 0; i < sprites.length; i += 1) {
                const sprite = sprites[i];
                if (pointer.down && dragIndex === i) {
                    const dx = pointer.x - sprite.x;
                    const dy = pointer.y - sprite.y;
                    sprite.vx = dx * 0.35;
                    sprite.vy = dy * 0.35;
                }

                sprite.x += sprite.vx;
                sprite.y += sprite.vy;
                sprite.rotation += sprite.spin;
                sprite.vx *= 0.985;
                sprite.vy *= 0.985;

                if (sprite.x < sprite.size * 0.5) {
                    sprite.x = sprite.size * 0.5;
                    sprite.vx *= -0.85;
                }
                if (sprite.x > width - sprite.size * 0.5) {
                    sprite.x = width - sprite.size * 0.5;
                    sprite.vx *= -0.85;
                }
                if (sprite.y < sprite.size * 0.5) {
                    sprite.y = sprite.size * 0.5;
                    sprite.vy *= -0.85;
                }
                if (sprite.y > height - sprite.size * 0.5) {
                    sprite.y = height - sprite.size * 0.5;
                    sprite.vy *= -0.85;
                }

                const half = sprite.size * 0.5;
                ctx.save();
                ctx.globalAlpha = 0.9;
                ctx.translate(sprite.x, sprite.y);
                ctx.rotate(sprite.rotation);
                ctx.drawImage(sprite.image, -half, -half, sprite.size, sprite.size);
                ctx.restore();
            }

            frameRef.current = requestAnimationFrame(tick);
        };

        let isMounted = true;
        let resizeObserver: ResizeObserver | null = null;

        const start = async () => {
            let images: HTMLImageElement[] = [];
            try {
                images = await Promise.all(ICON_SOURCES.map(loadImage));
            } catch {
                images = [];
            }
            if (!isMounted || images.length === 0) return;
            resizeCanvas();
            spawnSprites(images);
            resizeObserver = new ResizeObserver(() => resizeCanvas());
            resizeObserver.observe(container);
            window.addEventListener("pointerdown", onPointerDown);
            window.addEventListener("pointermove", onPointerMove);
            window.addEventListener("pointerup", onPointerUp);
            window.addEventListener("pointercancel", onPointerUp);
            frameRef.current = requestAnimationFrame(tick);
        };

        start();

        return () => {
            isMounted = false;
            if (resizeObserver) resizeObserver.disconnect();
            window.removeEventListener("pointerdown", onPointerDown);
            window.removeEventListener("pointermove", onPointerMove);
            window.removeEventListener("pointerup", onPointerUp);
            window.removeEventListener("pointercancel", onPointerUp);
            if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
        };
    }, []);

    return (
        <div ref={containerRef} className="pointer-events-none fixed inset-0 z-30 h-full w-full overflow-hidden">
            <canvas ref={canvasRef} className="block h-full w-full" />
        </div>
    );
}

export default Canvas;
