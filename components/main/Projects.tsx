import React from "react";
import ProjectCard from "../sub/ProjectCard";

const Projects = () => {
  return (
    <div
      className="flex flex-col items-center justify-center py-20"
      id="projects"
    >
      <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20">
        My Projects
      </h1>
      <div className="h-full w-full flex flex-col md:flex-row gap-10 px-10">
        <ProjectCard
          src="/NextWebsite.png"
          title="T3Stocks Project"
          description="T3Stocks is a project focused on stock market analysis, providing real-time insights, portfolio tracking, and AI-driven predictions for informed trading decisions."
        />
        <ProjectCard
          src="/CardImage.png"
          title="Gulabi Decor "
          description="Gulabi Decor is a React-based project focused on elegant and vibrant home decor, featuring curated designs, sustainable materials, and seamless user experience."
        />
        <ProjectCard
          src="/SpaceWebsite.png"
          title="Immune Science"
          description="Podo Learn is a Learning Management System (LMS) designed to facilitate online education, offering courses, progress tracking, and interactive learning experiences. Let me know if you need any specific details or features for it!"
        />
      </div>
    </div>
  );
};

export default Projects;
