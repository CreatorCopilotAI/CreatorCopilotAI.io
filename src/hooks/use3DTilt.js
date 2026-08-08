import { useRef, useCallback } from 'react';

/**
 * Returns ref + handler props that apply a live CSS 3D tilt on mouse move.
 * Usage: <div ref={ref} {...handlers} style={style}>
 */
export function use3DTilt({ max = 15, scale = 1.03, perspective = 1000 } = {}) {
  const ref = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -max;
    const rotateY = ((x - cx) / cx) * max;
    el.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
    el.style.transition = 'transform 0.1s ease';
  }, [max, scale, perspective]);

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale(1)`;
    ref.current.style.transition = 'transform 0.5s ease';
  }, [perspective]);

  return { ref, onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave };
}
