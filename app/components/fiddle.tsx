"use client";
import React, { useEffect, useRef } from 'react';

class ObjectImage {
  img: HTMLImageElement;
  x: number; y: number; w: number; h: number;
  vx: number; vy: number;
  isDragging: boolean;
  friction: number = 0.95; // Resistance to movement
  bounce: number = -0.6;   // Energy retained after bounce (negative for direction)

  constructor(src: string, x: number, y: number, w: number, h: number) {
    this.img = typeof window !== 'undefined' ? new Image() : (null as any);
    this.img.src = src;
    this.x = x; this.y = y; this.w = w; this.h = h;
    this.vx = (Math.random() - 0.5) * 10;
    this.vy = (Math.random() - 0.5) * 10;
    this.isDragging = false;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (this.img.complete && this.img.naturalWidth !== 0) {
      ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    } else {
      ctx.fillStyle = '#ccc';
      ctx.fillRect(this.x, this.y, this.w, this.h);
    }
  }

  update(width: number, height: number, obstacle: { x: number, y: number, w: number, h: number }): void {
    if (this.isDragging) return;
    
    // Apply velocity
    this.vx *= this.friction;
    this.vy *= this.friction;
    
    // Apply movement
    this.x += this.vx;
    this.y += this.vy;
    
    // Border Collision
    if (this.x < 0) { this.x = 0; this.vx *= this.bounce; }
    else if (this.x + this.w > width) { this.x = width - this.w; this.vx *= this.bounce; }
    
    if (this.y < 0) { this.y = 0; this.vy *= this.bounce; }
    else if (this.y + this.h > height) { this.y = height - this.h; this.vy *= this.bounce; }

    // Obstacle Collision (Basic AABB)
    if (this.x < obstacle.x + obstacle.w && this.x + this.w > obstacle.x && 
        this.y < obstacle.y + obstacle.h && this.y + this.h > obstacle.y) {
      const overlapX = Math.min(this.x + this.w - obstacle.x, obstacle.x + obstacle.w - this.x);
      const overlapY = Math.min(this.y + this.h - obstacle.y, obstacle.y + obstacle.h - this.y);
      
      if (overlapX < overlapY) {
        this.x = (this.x + this.w / 2 < obstacle.x + obstacle.w / 2) ? obstacle.x - this.w : obstacle.x + obstacle.w;
        this.vx *= this.bounce;
      } else {
        this.y = (this.y + this.h / 2 < obstacle.y + obstacle.h / 2) ? obstacle.y - this.h : obstacle.y + obstacle.h;
        this.vy *= this.bounce;
      }
    }
  }

  resolveCollision(other: ObjectImage): void {
    if (this.isDragging || other.isDragging) return;
    const dx = (this.x + this.w / 2) - (other.x + other.w / 2);
    const dy = (this.y + this.h / 2) - (other.y + other.h / 2);
    const minX = (this.w + other.w) / 2;
    const minY = (this.h + other.h) / 2;
    const overlapX = minX - Math.abs(dx);
    const overlapY = minY - Math.abs(dy);

    if (overlapX > 0 && overlapY > 0) {
      // Resolve position
      if (overlapX < overlapY) {
        const move = (dx > 0) ? overlapX / 2 : -overlapX / 2;
        this.x += move; other.x -= move;
      } else {
        const move = (dy > 0) ? overlapY / 2 : -overlapY / 2;
        this.y += move; other.y -= move;
      }
      // Simple momentum transfer
      const tx = this.vx; const ty = this.vy;
      this.vx = other.vx * 0.8; this.vy = other.vy * 0.8;
      other.vx = tx * 0.8; other.vy = ty * 0.8;
    }
  }
}

const Fiddle: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<ObjectImage[]>([]);
  const activeObj = useRef<ObjectImage | null>(null);
  const offset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resize = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };
    
    window.addEventListener('resize', resize);
    resize();

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const sources = ['/icons/html.png', '/icons/css.png', '/icons/js.png', '/icons/c++.png', '/icons/nextjs.png', '/icons/nodejs.png', '/icons/python.png', '/icons/react.png', '/icons/rust.png', '/icons/tkinter.png', '/icons/java.png'];
    imagesRef.current = sources.map(src => new ObjectImage(src, Math.random() * (canvas.width - 100), Math.random() * (canvas.height - 100), 80, 80));

    let raf: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const obstacle = { x: 10, y: canvas.height - 150, w: 200, h: 100 };
      
      // Collision checks
      for (let i = 0; i < imagesRef.current.length; i++) {
        for (let j = i + 1; j < imagesRef.current.length; j++) {
          imagesRef.current[i].resolveCollision(imagesRef.current[j]);
        }
      }
      
      imagesRef.current.forEach(img => {
        img.update(canvas.width, canvas.height, obstacle);
        img.draw(ctx);
      });
      raf = requestAnimationFrame(render);
    };
    render();

    const getPos = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const handleDown = (e: PointerEvent) => {
      const pos = getPos(e);
      for (let i = imagesRef.current.length - 1; i >= 0; i--) {
        const img = imagesRef.current[i];
        if (pos.x >= img.x && pos.x <= img.x + img.w && pos.y >= img.y && pos.y <= img.y + img.h) {
          activeObj.current = img;
          img.isDragging = true;
          offset.current = { x: pos.x - img.x, y: pos.y - img.y };
          // Move to end of array to draw on top
          imagesRef.current.splice(i, 1);
          imagesRef.current.push(img);
          return;
        }
      }
    };

    const handleMove = (e: PointerEvent) => {
      if (!activeObj.current) return;
      const pos = getPos(e);
      const newX = pos.x - offset.current.x;
      const newY = pos.y - offset.current.y;

      // Calculate velocity for the "fling" effect
      // By checking the difference between current frame and previous frame
      activeObj.current.vx = (newX - activeObj.current.x) * 0.5;
      activeObj.current.vy = (newY - activeObj.current.y) * 0.5;

      activeObj.current.x = newX;
      activeObj.current.y = newY;
    };

    const handleUp = () => {
      if (activeObj.current) activeObj.current.isDragging = false;
      activeObj.current = null;
    };

    canvas.addEventListener('pointerdown', handleDown);
    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', handleUp);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('pointerdown', handleDown);
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-y-0 left-0 w-1/5 h-screen z-[9999] border-r border-blue-500 bg-blue-500/10 pointer-events-none">
      <canvas ref={canvasRef} className="block w-full h-full pointer-events-auto" />
    </div>
  );
};

export default Fiddle;