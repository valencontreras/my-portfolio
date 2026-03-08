"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaGithub, FaReact } from "react-icons/fa";
import { MagicText } from "./MagicUI";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
} from "react-icons/si";
import Link from "next/link";

const projects = [
  {
    id: 1,
    title: "Frontend Template for Projects",
    des: "A responsive and modern frontend template for projects, built with React and Tailwind CSS.",
    img: "/images/projects/frontend-template.png",
    iconLists: [
      { icon: <SiReact />, label: "React JS" },
      { icon: <SiNextdotjs />, label: "Next JS" },
      { icon: <SiTypescript />, label: "TypeScript" },
      { icon: <SiTailwindcss />, label: "Tailwind" },
    ],
    link: "https://frontend-exo-template.vercel.app/",
    github: "https://github.com/Cszart/frontend-EXO-template/tree/main",
  },
];

export const Projects = () => {
  return (
    <div id="projects" className="py-20 w-full max-w-7xl mx-auto px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-20">
        A small selection of{" "}
        <MagicText className="rounded-lg">recent projects</MagicText>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
        {projects.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ y: -10 }}
            className="flex flex-col items-center justify-center p-4 rounded-3xl border border-white/10 bg-[#000319] group relative overflow-hidden"
          >
            <div className="relative w-full h-[250px] md:h-[300px] overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
              <Image
                src={item.img}
                alt={item.title}
                fill
                className="object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            <div className="w-full mt-6 space-y-3">
              <h1 className="font-bold text-xl md:text-2xl text-white line-clamp-1">
                <span>{item.title}</span>
              </h1>
              <p className="text-sm md:text-md text-gray-400 font-light line-clamp-2">
                <span>{item.des}</span>
              </p>

              <div className="flex flex-col md:flex-row md:items-center justify-between mt-7 mb-3">
                <div className="flex items-center">
                  {item.iconLists.map((icon, index) => (
                    <div
                      key={index}
                      title={icon.label}
                      className="border border-white/20 rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                      style={{
                        transform: `translateX(-${5 * index + 2}px)`,
                      }}
                    >
                      <div className="p-1 uppercase text-md text-gray-400">
                        {icon.icon}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-x-2">
                  <Link
                    href={item.link}
                    target="_blank"
                    className="flex justify-center items-center gap-2"
                  >
                    <p className="flex text-md text-purple-400 font-semibold group-hover:text-white transition-colors">
                      <span>Check Live Site</span>
                    </p>
                    <FaExternalLinkAlt color="#CBACF9" />
                  </Link>

                  <Link
                    href={item.github}
                    target="_blank"
                    title="Link to Github"
                    className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors text-white"
                  >
                    <FaGithub size={20} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Border Beam Effect placeholder */}
            <div className="absolute inset-0 border border-white/5 group-hover:border-purple-500/50 transition-colors pointer-events-none rounded-3xl" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
