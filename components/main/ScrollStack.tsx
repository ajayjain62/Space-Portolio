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
  // Calculate progress range for this item
  const startProgress = index / itemCount;
  const endProgress = (index + 1) / itemCount;
  const centerProgress = (startProgress + endProgress) / 2;
  
  const itemProgress = useTransform(
    progress,
    [startProgress, centerProgress, endProgress],
    [0, 1, 0]
  );

  const scale = useTransform(itemProgress, [0, 0.5, 1], [0.7, 1, 0.7]);
  const opacity = useTransform(itemProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(itemProgress, [0, 0.5, 1], [150, 0, -150]);
  const rotateX = useTransform(itemProgress, [0, 0.5, 1], [20, 0, -20]);
  const zIndex = useTransform(itemProgress, [0, 0.5, 1], [itemCount - index, itemCount, itemCount - index]);
  
  const boxShadow = useTransform(
    itemProgress,
    [0, 0.5, 1],
    [
      '0 0 20px rgba(168,85,247,0.1)',
      '0 0 60px rgba(168,85,247,0.4)',
      '0 0 20px rgba(168,85,247,0.1)',
    ]
  );

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      style={{
        scale,
        opacity,
        y,
        rotateX,
        zIndex,
      }}
    >
      <motion.div
        className="w-full max-w-2xl mx-auto bg-gray-900/40 backdrop-blur-xl rounded-3xl p-8 shadow-[0_0_50px_rgba(192,219,255,0.15)] border border-gray-700 pointer-events-auto"
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
  const spacerRef = useRef<HTMLDivElement>(null);
  const childrenArray = React.Children.toArray(children);
  const itemCount = childrenArray.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const springConfig = { stiffness: 50, damping: 25, restDelta: 0.001 };
  const smoothProgress = useSpring(scrollYProgress, springConfig);

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      id="projects"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden py-20">
        <div className="relative w-full max-w-4xl mx-auto px-4">
          <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 text-center mb-20">
            My Projects
          </h1>
          
          <div className="relative h-[600px] flex items-center justify-center">
            {childrenArray.map((child, index) => (
              <StackItem
                key={index}
                index={index}
                itemCount={itemCount}
                progress={smoothProgress}
              >
                {child}
              </StackItem>
            ))}
          </div>
        </div>
      </div>
      
      {/* Spacer to enable scrolling */}
      <div 
        ref={spacerRef}
        style={{ height: `${itemCount * 100}vh` }} 
      />
    </div>
  );
};

export default ScrollStack;

