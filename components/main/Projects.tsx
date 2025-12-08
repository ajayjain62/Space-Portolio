"use client";

import React from "react";
import ScrollStack, { ScrollStackItem } from "./ScrollStack";
import Image from "next/image";

const Projects = () => {
  return (
    <ScrollStack>
      <ScrollStackItem>
        <div className="flex flex-col items-center">
          <Image
            src="/NextWebsite.png"
            alt="T3Stocks Project"
            width={800}
            height={400}
            className="w-full h-auto rounded-lg mb-6 object-contain"
          />
          <h2 className="text-3xl font-bold text-white mb-4">T3Stocks Project</h2>
          <p className="text-gray-300 text-center">
            T3Stocks is a project focused on stock market analysis, providing real-time insights, portfolio tracking, and AI-driven predictions for informed trading decisions.
          </p>
        </div>
      </ScrollStackItem>

      <ScrollStackItem>
        <div className="flex flex-col items-center">
          <Image
            src="/CardImage.png"
            alt="Gulabi Decor"
            width={800}
            height={400}
            className="w-full h-auto rounded-lg mb-6 object-contain"
          />
          <h2 className="text-3xl font-bold text-white mb-4">Gulabi Decor</h2>
          <p className="text-gray-300 text-center">
            Gulabi Decor is a React-based project focused on elegant and vibrant home decor, featuring curated designs, sustainable materials, and seamless user experience.
          </p>
        </div>
      </ScrollStackItem>

      <ScrollStackItem>
        <div className="flex flex-col items-center">
          <Image
            src="/SpaceWebsite.png"
            alt="Immune Science"
            width={800}
            height={400}
            className="w-full h-auto rounded-lg mb-6 object-contain"
          />
          <h2 className="text-3xl font-bold text-white mb-4">Immune Science</h2>
          <p className="text-gray-300 text-center">
            Podo Learn is a Learning Management System (LMS) designed to facilitate online education, offering courses, progress tracking, and interactive learning experiences.
          </p>
        </div>
      </ScrollStackItem>
    </ScrollStack>
  );
};

export default Projects;
