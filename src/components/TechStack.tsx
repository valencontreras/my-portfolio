import React from "react";
import { InfiniteMovingCards } from "./InfiniteMovingCards";

import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiBootstrap,
  SiHtml5,
  SiCss,
  SiGit,
  SiGithub,
  SiGitlab,
  SiJira,
  SiFigma,
} from "react-icons/si";
import { DiVisualstudio } from "react-icons/di";

const technologies = [
  { name: "ReactJS", icon: <SiReact className="text-[#61DAFB]" /> },
  { name: "NextJS", icon: <SiNextdotjs className="text-white" /> },
  { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" /> },
  { name: "JavaScript", icon: <SiJavascript className="text-[#F7DF1E]" /> },
  { name: "Tailwind", icon: <SiTailwindcss className="text-[#06B6D4]" /> },
  { name: "Bootstrap", icon: <SiBootstrap className="text-[#7952B3]" /> },
  { name: "HTML", icon: <SiHtml5 className="text-[#E34F26]" /> },
  { name: "CSS", icon: <SiCss className="text-[#1572B6]" /> },
  { name: "Git", icon: <SiGit className="text-[#F05032]" /> },
  { name: "GitHub", icon: <SiGithub className="text-white" /> },
  { name: "GitLab", icon: <SiGitlab className="text-[#FC6D26]" /> },
  { name: "Jira", icon: <SiJira className="text-[#0052CC]" /> },
  { name: "Figma", icon: <SiFigma className="text-[#F24E1E]" /> },
  { name: "VS Code", icon: <DiVisualstudio className="text-[#007ACC]" /> },
];

export const TechStack = () => {
  return (
    <div className="py-20 flex flex-col items-center justify-center relative overflow-hidden">
      <h2 className="text-2xl font-bold text-white mb-10 text-center uppercase tracking-widest opacity-50">
        My Tech Stack
      </h2>
      <InfiniteMovingCards
        items={technologies}
        direction="right"
        speed="slow"
      />
    </div>
  );
};
