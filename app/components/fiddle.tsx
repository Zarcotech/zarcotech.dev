"use client";
import React, { useEffect, useRef } from 'react';

class ObjectImage {
  img: HTMLImageElement;
  x: number;
  y: number;
  w: number;
  h: number;
  vx: number;
  vy: number;
  isDragging: boolean;
  friction: number;
  bounce: number;

  constructor(src: string, x: number, y: number, w: number, h: number) {
    this.img = (typeof window !== 'undefined') ? new Image() : (null as any);
    this.img.src = src;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.vx = 0;
    this.vy = 0;
    this.isDragging = false;
    this.friction = 0.98;
    this.bounce = -0.7;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  }

  update(canvasWidth: number, canvasHeight: number): void {
    if (this.isDragging) return;

    this.vx *= this.friction;
    this.vy *= this.friction;

    this.x += this.vx;
    this.y += this.vy;

    if (this.x <= 0) { this.x = 0; this.vx *= this.bounce; }
    else if (this.x + this.w >= canvasWidth) { this.x = canvasWidth - this.w; this.vx *= this.bounce; }

    if (this.y <= 0) { this.y = 0; this.vy *= this.bounce; }
    else if (this.y + this.h >= canvasHeight) { this.y = canvasHeight - this.h; this.vy *= this.bounce; }
  }

  checkCollision(other: ObjectImage): void {
    if (this.x < other.x + other.w &&
        this.x + this.w > other.x &&
        this.y < other.y + other.h &&
        this.y + this.h > other.y) {

      let tempVx = this.vx;
      let tempVy = this.vy;
      this.vx = other.vx * 0.8;
      this.vy = other.vy * 0.8;
      other.vx = tempVx * 0.8;
      other.vy = tempVy * 0.8;

      let overlapX = (this.w + other.w) / 2 - Math.abs((this.x + this.w / 2) - (other.x + other.w / 2));
      let overlapY = (this.h + other.h) / 2 - Math.abs((this.y + this.h / 2) - (other.y + other.h / 2));

      if (overlapX < overlapY) {
        this.x += (this.x < other.x) ? -overlapX / 2 : overlapX / 2;
        other.x += (this.x < other.x) ? overlapX / 2 : -overlapX / 2;
      } else {
        this.y += (this.y < other.y) ? -overlapY / 2 : overlapY / 2;
        other.y += (this.y < other.y) ? overlapY / 2 : -overlapY / 2;
      }
    }
  }

  isClicked(mx: number, my: number): boolean {
    return mx >= this.x && mx <= this.x + this.w &&
           my >= this.y && my <= this.y + this.h;
  }
}

const Fiddle: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<ObjectImage[]>([]);

  useEffect(() => {
    if (imagesRef.current.length === 0) {
      imagesRef.current = [
        new ObjectImage('/icons/pfp.png', 50, 50, 40, 40),
        new ObjectImage('/icons/pfp.png', 200, 50, 40, 40),
        new ObjectImage('/icons/pfp.png', 350, 50, 40, 40),
      ];
    }
  }, []);
  const activeObjectRef = useRef<ObjectImage | null>(null);
  const lastMouseRef = useRef<{ x: number, y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animationFrameId: number;

    const animate = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < imagesRef.current.length; i++) {
        for (let j = i + 1; j < imagesRef.current.length; j++) {
          imagesRef.current[i].checkCollision(imagesRef.current[j]);
        }
      }

      imagesRef.current.forEach(img => {
        img.update(canvas.width, canvas.height);
        img.draw(ctx);
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleMouseDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      for (let i = imagesRef.current.length - 1; i >= 0; i--) {
        if (imagesRef.current[i].isClicked(mx, my)) {
          activeObjectRef.current = imagesRef.current[i];
          activeObjectRef.current.isDragging = true;
          activeObjectRef.current.vx = 0;
          activeObjectRef.current.vy = 0;
          lastMouseRef.current = { x: mx, y: my };

          imagesRef.current.splice(i, 1);
          imagesRef.current.push(activeObjectRef.current);
          break;
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!activeObjectRef.current) return;
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      activeObjectRef.current.vx = (mx - lastMouseRef.current.x) * 0.5;
      activeObjectRef.current.vy = (my - lastMouseRef.current.y) * 0.5;
      lastMouseRef.current = { x: mx, y: my };

      activeObjectRef.current.x = mx - activeObjectRef.current.w / 2;
      activeObjectRef.current.y = my - activeObjectRef.current.h / 2;

      activeObjectRef.current.x = Math.max(0, Math.min(activeObjectRef.current.x, canvas.width - activeObjectRef.current.w));
      activeObjectRef.current.y = Math.max(0, Math.min(activeObjectRef.current.y, canvas.height - activeObjectRef.current.h));
    };

    const handleMouseUp = () => {
      if (activeObjectRef.current) {
        activeObjectRef.current.isDragging = false;
        activeObjectRef.current = null;
      }
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div className="fixed inset-y-0 left-0 w-1/5 z-0 bg-gray-100 dark:bg-gray-800" style={{pointerEvents: 'auto'}}>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="block w-full h-full rounded-2xl border border-gray-300/70 bg-white/70 text-gray-900 shadow-xl backdrop-blur-sm dark:border-white/30 dark:bg-black/35 dark:text-white"
        style={{ position: 'relative', zIndex: 10 }}
      />
    </div>
  );
};

export default Fiddle;
