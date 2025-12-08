"use client";

import React, { ReactNode, useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ScrollStackProps {
  children: ReactNode;
}

interface ScrollStackItemProps {
  children: ReactNode;
}

interface StackItemProps {
  children: ReactNode;
  index: number;
  itemCount: number;
  progress: any;
}

const StackItem: React.FC<StackItemProps> = ({ children, index, itemCount, progress }) => {
  const itemProgress = useTransform(
    progress,
    [index / itemCount, (index + 1) / itemCount],
    [0, 1]
  );

  const scale = useTransform(itemProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(itemProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(itemProgress, [0, 0.5, 1], [100, 0, -100]);
  const rotateX = useTransform(itemProgress, [0, 0.5, 1], [15, 0, -15]);
  const boxShadow = useTransform(
    itemProgress,
    [0, 0.5, 1],
    [
      '0 0 20px rgba(168,85,247,0.1)',
      '0 0 50px rgba(168,85,247,0.3)',
      '0 0 20px rgba(168,85,247,0.1)',
    ]
  );

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        scale,
        opacity,
        y,
        rotateX,
        zIndex: itemCount - index,
      }}
    >
      <motion.div
        className="w-full max-w-2xl mx-auto bg-gray-900/40 backdrop-blur-xl rounded-3xl p-8 shadow-[0_0_50px_rgba(192,219,255,0.15)] border border-gray-700"
        style={{ boxShadow }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({ children }) => {
  return <div className="scroll-stack-item">{children}</div>;
};

const ScrollStack: React.FC<ScrollStackProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      const items = containerRef.current.querySelectorAll('.scroll-stack-item');
      setItemCount(items.length);
    }
  }, [children]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const smoothProgress = useSpring(scrollYProgress, springConfig);

  const childrenArray = React.Children.toArray(children);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen py-20"
      id="projects"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="relative w-full max-w-4xl mx-auto px-4">
          <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 text-center mb-20">
            My Projects
          </h1>
          
          <div className="relative h-[500px]">
            {childrenArray.map((child, index) => (
              <StackItem
                key={index}
                index={index}
                itemCount={itemCount || childrenArray.length}
                progress={smoothProgress}
              >
                {child}
              </StackItem>
            ))}
          </div>
        </div>
      </div>
      
      {/* Spacer to enable scrolling */}
      <div style={{ height: `${(itemCount || childrenArray.length) * 100}vh` }} />
    </div>
  );
};

export default ScrollStack;
