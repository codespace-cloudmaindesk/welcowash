"use client";

import { useEffect, useState, useRef } from 'react';

interface AnimatedCounterProps {
  targetValue: number;
  duration?: number;
  precision?: number;
}

export function AnimatedCounter({ targetValue, duration = 2000, precision = 0 }: AnimatedCounterProps) {
  const [currentValue, setCurrentValue] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let startTimestamp: number | null = null;
          const step = (timestamp: number) => {
            if (!startTimestamp) {
              startTimestamp = timestamp;
            }
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const nextValue = progress * targetValue;
            setCurrentValue(nextValue);

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCurrentValue(targetValue); 
            }
          };
          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [targetValue, duration]);

  return <span ref={elementRef}>{currentValue.toFixed(precision)}</span>;
}
