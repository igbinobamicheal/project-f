import React, { useEffect, useRef } from 'react';

export const ThoughtSculpture: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth * window.devicePixelRatio);
    let height = (canvas.height = canvas.offsetHeight * window.devicePixelRatio);

    let angleX = 0.2;
    let angleY = 0.3;
    let mouseX = 0;
    let mouseY = 0;
    let targetAngleX = 0.2;
    let targetAngleY = 0.3;

    // 3D Polyhedron vertices (Icosahedron / Complex Thought Matrix)
    const phi = (1 + Math.sqrt(5)) / 2;
    const rawNodes = [
      [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
      [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
      [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1],
      // Inner thought core
      [0, 0, 0], [0, 0.8, 0], [0, -0.8, 0], [0.8, 0, 0], [-0.8, 0, 0]
    ];

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) / rect.width - 0.5;
      mouseY = (e.clientY - rect.top) / rect.height - 0.5;
      targetAngleY = mouseX * 2;
      targetAngleX = -mouseY * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      width = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      height = canvas.height = canvas.offsetHeight * window.devicePixelRatio;

      ctx.clearRect(0, 0, width, height);

      // Smooth rotation dampening
      angleX += (targetAngleX - angleX) * 0.05 + 0.003;
      angleY += (targetAngleY - angleY) * 0.05 + 0.005;

      const scale = Math.min(width, height) * 0.26;
      const centerX = width / 2;
      const centerY = height / 2;

      // Project 3D nodes to 2D
      const projected = rawNodes.map(([x, y, z]) => {
        // Rotate around Y
        let x1 = x * Math.cos(angleY) + z * Math.sin(angleY);
        let z1 = -x * Math.sin(angleY) + z * Math.cos(angleY);

        // Rotate around X
        let y2 = y * Math.cos(angleX) - z1 * Math.sin(angleX);
        let z2 = y * Math.sin(angleX) + z1 * Math.cos(angleX);

        const fov = 400;
        const depth = fov / (fov + z2 * 45);

        return {
          x: centerX + x1 * scale * depth,
          y: centerY + y2 * scale * depth,
          z: z2,
          depth
        };
      });

      // Draw connective thought lines
      ctx.lineWidth = 1 * window.devicePixelRatio;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const dx = projected[i].x - projected[j].x;
          const dy = projected[i].y - projected[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < scale * 1.5) {
            const alpha = Math.max(0.05, 1 - dist / (scale * 1.5)) * 0.45;
            ctx.strokeStyle = `rgba(147, 197, 253, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(projected[i].x, projected[i].y);
            ctx.lineTo(projected[j].x, projected[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      projected.forEach((p, idx) => {
        const radius = (idx < 12 ? 3.5 : 2) * p.depth * window.devicePixelRatio;
        ctx.fillStyle = idx < 12 ? '#93c5fd' : '#c5a880';
        ctx.shadowColor = '#60a5fa';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(1, radius), 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-72 sm:h-96 rounded-3xl bg-zinc-950/70 border border-blue-400/20 overflow-hidden flex items-center justify-center">
      <div className="absolute top-4 left-4 font-mono-spec text-[10px] text-blue-300 tracking-widest uppercase">
        KINETIC SCULPTURE // 3D THOUGHT MATRIX
      </div>
      <div className="absolute bottom-4 right-4 font-mono-spec text-[9px] text-zinc-500 tracking-wider">
        RESPONSIVE PERSPECTIVE MATRIX
      </div>
      <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
    </div>
  );
};
