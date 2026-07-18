import { useRef, useEffect, useCallback } from 'react';
import './DotGrid.css';

const DotGrid = ({
  dotSize = 6,
  gap = 70,
  baseColor = '#444444',
  activeColor = '#aaaaaa',
  proximity = 120,
  speedTrigger = 150,
  shockRadius = 160,
  shockStrength = 3,
  maxSpeed = 3000,
  resistance = 500,
  returnDuration = 1.4,
}) => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, vx: 0, vy: 0, lastX: 0, lastY: 0, lastTime: 0 });
  const dotsRef = useRef([]);

  const initDots = useCallback((width, height) => {
    const dots = [];
    for (let x = gap / 2; x < width; x += gap) {
      for (let y = gap / 2; y < height; y += gap) {
        dots.push({
          baseX: x,
          baseY: y,
          x: x,
          y: y,
          vx: 0,
          vy: 0,
        });
      }
    }
    dotsRef.current = dots;
  }, [gap]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const handleResize = () => {
      const parent = canvas.parentElement;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      initDots(canvas.width, canvas.height);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    const render = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mouse = mouseRef.current;
      
      // Calculate mouse velocity
      const dt = (time - mouse.lastTime) / 1000;
      if (dt > 0) {
        mouse.vx = (mouse.x - mouse.lastX) / dt;
        mouse.vy = (mouse.y - mouse.lastY) / dt;
      }
      mouse.lastX = mouse.x;
      mouse.lastY = mouse.y;
      mouse.lastTime = time;

      const mouseSpeed = Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy);

      dotsRef.current.forEach(dot => {
        const dx = dot.x - mouse.x;
        const dy = dot.y - mouse.y;
        const distSq = dx * dx + dy * dy;
        const dist = Math.sqrt(distSq);

        // Physics
        if (dist < proximity) {
          const force = (proximity - dist) / proximity;
          if (mouseSpeed > speedTrigger) {
             const speedFactor = Math.min(mouseSpeed / maxSpeed, 1);
             const shock = force * shockStrength * speedFactor * 10;
             dot.vx += (dx / dist) * shock;
             dot.vy += (dy / dist) * shock;
          }
        }

        // Return to base position
        const ax = (dot.baseX - dot.x) * (1 / returnDuration);
        const ay = (dot.baseY - dot.y) * (1 / returnDuration);
        
        dot.vx += ax;
        dot.vy += ay;
        
        // Resistance
        dot.vx *= 0.9;
        dot.vy *= 0.9;

        dot.x += dot.vx;
        dot.y += dot.vy;

        // Draw
        const activeRatio = Math.max(0, 1 - dist / proximity);
        ctx.fillStyle = activeRatio > 0.1 ? activeColor : baseColor;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dotSize / 2, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [dotSize, gap, baseColor, activeColor, proximity, speedTrigger, shockRadius, shockStrength, maxSpeed, resistance, returnDuration, initDots]);

  return <canvas ref={canvasRef} className="dot-grid-canvas" />;
};

export default DotGrid;
