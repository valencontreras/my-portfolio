"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaBriefcase, FaCode, FaGraduationCap, FaRobot } from "react-icons/fa";
import { MagicText } from "./MagicUI";

const workExperience = [
  {
    id: 1,
    title: "Frontend Developer",
    desc: "Developed modern web applications using React and Next.js, focusing on performance and UX.",
    className: "md:col-span-1",
    icon: <FaCode className="text-purple-400" size={32} />,
  },
  {
    id: 2,
    title: "AI-Assisted Developer",
    desc: "Leveraging cutting-edge AI tools to enhance development productivity and build intelligent web solutions.",
    className: "md:col-span-1",
    icon: <FaRobot className="text-blue-400" size={32} />,
  },
  {
    id: 3,
    title: "Software Engineer",
    desc: "Development with a focus on scalable architecture and clean code.",
    className: "md:col-span-1",
    icon: <FaBriefcase className="text-green-400" size={32} />,
  },
  {
    id: 4,
    title: "Freelance Developer",
    desc: "Helped small businesses and startups build their digital presence.",
    className: "md:col-span-1",
    icon: <FaGraduationCap className="text-yellow-400" size={32} />,
  },
];

export const Experience = () => {
  return (
    <div id="experience" className="py-20 w-full max-w-7xl mx-auto px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-20">
        My <MagicText className="rounded-lg">work experience</MagicText>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {workExperience.map((card) => (
          <motion.div
            key={card.id}
            whileHover={{ scale: 1.02 }}
            className="flex-1 text-white border border-white/10 p-8 rounded-3xl bg-white/5 relative group overflow-hidden"
          >
            {/* Animated Glow Border Beam Placeholder */}
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="p-4 w-fit rounded-2xl bg-black/50 border border-white/10 group-hover:border-purple-500/30 transition-colors">
                {card.icon}
              </div>
              <div className="space-y-2">
                <h2 className="text-xl md:text-2xl font-bold">
                  <span>{card.title}</span>
                </h2>
                <p className="text-gray-400 font-light text-sm md:text-base">
                  <span>{card.desc}</span>
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
