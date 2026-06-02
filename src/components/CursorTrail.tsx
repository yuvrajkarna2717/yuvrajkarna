import { useEffect, useRef } from "react";
import { useTheme } from "../context/useTheme";

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dots: { x: number; y: number; alpha: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      dots.push({ x: e.clientX, y: e.clientY, alpha: 1 });
      if (dots.length > 60) dots.shift();
    };
    window.addEventListener("mousemove", onMouseMove);

    const isDark = theme === "dark";
    let raf: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < dots.length; i++) {
        dots[i].alpha = Math.max(0, dots[i].alpha - 0.03);
        const size = (i / dots.length) * 6 + 1;
        ctx.beginPath();
        ctx.arc(dots[i].x, dots[i].y, size, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `rgba(255,255,255,${dots[i].alpha * 0.35})`
          : `rgba(0,0,0,${dots[i].alpha * 0.2})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", resize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 pointer-events-none z-[9996]"
    />
  );
}
