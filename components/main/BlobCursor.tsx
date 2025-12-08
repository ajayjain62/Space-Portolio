"use client";

import React, { useEffect, useRef, useState } from 'react';

interface BlobCursorProps {
  blobType?: 'circle' | 'square';
  fillColor?: string;
  trailCount?: number;
  sizes?: number[];
  innerSizes?: number[];
  innerColor?: string;
  opacities?: number[];
  shadowColor?: string;
  shadowBlur?: number;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  filterStdDeviation?: number;
  useFilter?: boolean;
  fastDuration?: number;
  slowDuration?: number;
  zIndex?: number;
}

const BlobCursor: React.FC<BlobCursorProps> = ({
  blobType = 'circle',
  fillColor = '#5227FF',
  trailCount = 3,
  sizes = [60, 125, 75],
  innerSizes = [20, 35, 25],
  innerColor = 'rgba(255,255,255,0.8)',
  opacities = [0.6, 0.6, 0.6],
  shadowColor = 'rgba(0,0,0,0.75)',
  shadowBlur = 5,
  shadowOffsetX = 10,
  shadowOffsetY = 10,
  filterStdDeviation = 30,
  useFilter = true,
  fastDuration = 0.1,
  slowDuration = 0.5,
  zIndex = 100,
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [blobPositions, setBlobPositions] = useState<Array<{ x: number; y: number }>>([]);
  const animationFrameRef = useRef<number>();
  const positionsRef = useRef<Array<{ x: number; y: number }>>([]);

  useEffect(() => {
    // Initialize blob positions
    const initialPositions = Array.from({ length: trailCount }, () => ({ x: 0, y: 0 }));
    positionsRef.current = initialPositions;
    setBlobPositions(initialPositions);
  }, [trailCount]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const animate = () => {
      if (isVisible && positionsRef.current.length > 0) {
        const newPositions = [...positionsRef.current];
        
        newPositions.forEach((pos, index) => {
          const target = index === 0 
            ? { x: mousePosition.x, y: mousePosition.y }
            : newPositions[index - 1];

          const duration = index === 0 ? fastDuration : slowDuration;
          const factor = 1 - Math.exp(-16 / (duration * 60));

          pos.x += (target.x - pos.x) * factor;
          pos.y += (target.y - pos.y) * factor;
        });

        positionsRef.current = newPositions;
        setBlobPositions(newPositions);
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mousePosition, isVisible, fastDuration, slowDuration]);

  const borderRadius = blobType === 'circle' ? '50%' : '0%';

  return (
    <>
      {useFilter && (
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <defs>
            <filter id="blob-filter">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation={filterStdDeviation}
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                result="goo"
              />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
          </defs>
        </svg>
      )}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        {blobPositions.map((pos, index) => (
            <div
              key={index}
              style={{
                position: 'absolute',
                width: `${sizes[index] || 60}px`,
                height: `${sizes[index] || 60}px`,
                borderRadius,
                backgroundColor: fillColor,
                opacity: opacities[index] || 0.6,
                filter: useFilter ? 'url(#blob-filter)' : `drop-shadow(${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px ${shadowColor})`,
                transform: 'translate(-50%, -50%)',
                left: `${pos.x}px`,
                top: `${pos.y}px`,
                willChange: 'transform',
              }}
            >
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: `${innerSizes[index] || 20}px`,
                height: `${innerSizes[index] || 20}px`,
                borderRadius,
                backgroundColor: innerColor,
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default BlobCursor;
