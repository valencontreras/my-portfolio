import React from "react";
import { MagicText } from "./MagicUI";

import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiBootstrap,
  SiHtml5,
  SiCss,
  SiFramer,
  SiGit,
  SiGithub,
  SiGitlab,
  SiJira,
  SiFigma,
} from "react-icons/si";
import { DiVisualstudio } from "react-icons/di";

interface Technology {
  name: string;
  icon: React.ReactNode;
}

interface TechGroup {
  id: number;
  label: string;
  items: Technology[];
}

const techGroups: TechGroup[] = [
  {
    id: 1,
    label: "Languages",
    items: [
      { name: "JavaScript", icon: <SiJavascript className="text-[#F7DF1E]" /> },
      { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" /> },
      { name: "HTML5", icon: <SiHtml5 className="text-[#E34F26]" /> },
      { name: "CSS3", icon: <SiCss className="text-[#1572B6]" /> },
    ],
  },
  {
    id: 2,
    label: "Frameworks & Libraries",
    items: [
      { name: "React", icon: <SiReact className="text-[#61DAFB]" /> },
      { name: "Next.js", icon: <SiNextdotjs className="text-white" /> },
      { name: "Framer Motion", icon: <SiFramer className="text-[#0055FF]" /> },
    ],
  },
  {
    id: 3,
    label: "Styling",
    items: [
      {
        name: "Tailwind CSS",
        icon: <SiTailwindcss className="text-[#06B6D4]" />,
      },
      { name: "Bootstrap", icon: <SiBootstrap className="text-[#7952B3]" /> },
      { name: "Vanilla CSS", icon: <SiCss className="text-[#1572B6]" /> },
    ],
  },
  {
    id: 4,
    label: "Tools & Platforms",
    items: [
      { name: "Git", icon: <SiGit className="text-[#F05032]" /> },
      { name: "GitHub", icon: <SiGithub className="text-white" /> },
      { name: "GitLab", icon: <SiGitlab className="text-[#FC6D26]" /> },
      { name: "Jira", icon: <SiJira className="text-[#0052CC]" /> },
      { name: "Figma", icon: <SiFigma className="text-[#F24E1E]" /> },
      { name: "VS Code", icon: <DiVisualstudio className="text-[#007ACC]" /> },
    ],
  },
];

export const TechStack = () => {
  return (
    <section
      id="stack"
      className="relative w-full max-w-7xl mx-auto px-4 py-20 overflow-hidden"
    >
      <div className="text-center space-y-4 mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white">
          <span>My </span>
          <MagicText className="rounded-lg">tech stack</MagicText>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          <span>
            The languages, frameworks and tools I use to design, build and ship
            modern web applications.
          </span>
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {techGroups.map((group) => (
          <div key={group.id}>
            <div className="flex items-center gap-4 mb-6">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 shrink-0">
                {group.label}
              </h3>
              <span className="flex-1 h-px bg-linear-to-r from-white/10 to-transparent" />
            </div>

            <ul className="flex flex-wrap gap-4">
              {group.items.map((tech) => (
                <li
                  key={tech.name}
                  className="group w-36 flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/30 hover:bg-white/10"
                >
                  <span className="text-3xl md:text-4xl transition-transform duration-300 group-hover:scale-110">
                    {tech.icon}
                  </span>
                  <span className="text-center text-xs md:text-sm font-medium text-gray-300 transition-colors group-hover:text-white">
                    {tech.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};
