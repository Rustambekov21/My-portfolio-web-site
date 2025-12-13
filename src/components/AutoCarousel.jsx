import React, { useEffect, useMemo, useRef, useState } from "react";

export default function AutoCarousel({
  children,
  interval = 2500,
  className = "",
  ariaLabel = "carousel",
}) {
  const items = useMemo(() => React.Children.toArray(children), [children]);
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const startX = useRef(0);
  const deltaX = useRef(0);
  const dragging = useRef(false);
  const timer = useRef(null);

  /* mobile aniqlash */
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    const onChange = (e) => setIsMobile(e.matches);

    setIsMobile(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  /* auto slide */
  useEffect(() => {
    if (!isMobile || items.length <= 1) return;

    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, interval);

    return () => clearInterval(timer.current);
  }, [isMobile, items.length, interval]);

  const stopAuto = () => {
    if (timer.current) clearInterval(timer.current);
  };

  const onStart = (x) => {
    stopAuto();
    dragging.current = true;
    startX.current = x;
  };

  const onMove = (x) => {
    if (!dragging.current) return;
    deltaX.current = x - startX.current;
  };

  const onEnd = () => {
    if (!dragging.current) return;

    if (deltaX.current > 60) {
      setIndex((i) => (i - 1 + items.length) % items.length);
    } else if (deltaX.current < -60) {
      setIndex((i) => (i + 1) % items.length);
    }

    deltaX.current = 0;
    dragging.current = false;
  };

  return (
    <div
      className={`${className} carousel`}
      aria-label={ariaLabel}
      onMouseDown={(e) => onStart(e.clientX)}
      onMouseMove={(e) => onMove(e.clientX)}
      onMouseUp={onEnd}
      onMouseLeave={onEnd}
      onTouchStart={(e) => onStart(e.touches[0].clientX)}
      onTouchMove={(e) => onMove(e.touches[0].clientX)}
      onTouchEnd={onEnd}
    >
      <div
        className="carousel-track"
        style={
          isMobile
            ? { transform: `translateX(-${index * 100}%)` }
            : undefined
        }
      >
        {items.map((child, i) => (
          <div className="carousel-slide" key={i}>
            {child}
          </div>
        ))}
      </div>

      {/* dots */}
      <div className="carousel-dots">
        {items.map((_, i) => (
          <span
            key={i}
            className={`carousel-dot ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
