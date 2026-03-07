"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";
import { MagicText } from "./MagicUI";

const projects = [
  {
    id: 1,
    title: "AI Canvas Platform",
    des: "A revolutionary AI painting tool that generates art from text prompts using stable diffusion.",
    img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1932&auto=format&fit=crop",
    iconLists: ["/re.svg", "/tail.svg", "/ts.svg", "/three.svg", "/fm.svg"],
    link: "https://example.com",
  },
  {
    id: 2,
    title: "Modern SaaS Dashboard",
    des: "An enterprise-ready dashboard with real-time analytics, user management, and dark mode.",
    img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1932&auto=format&fit=crop",
    iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/stream.svg", "/c.svg"],
    link: "https://example.com",
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
                {item.title}
              </h1>
              <p className="text-sm md:text-md text-gray-400 font-light line-clamp-2">
                {item.des}
              </p>

              <div className="flex items-center justify-between mt-7 mb-3">
                <div className="flex items-center">
                  {item.iconLists.map((icon, index) => (
                    <div
                      key={index}
                      className="border border-white/20 rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                      style={{
                        transform: `translateX(-${5 * index + 2}px)`,
                      }}
                    >
                      <div className="p-1 uppercase text-[8px] font-bold text-gray-400">
                        {icon.split(".")[0].replace("/", "")}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center items-center gap-2">
                  <p className="flex lg:text-xl md:text-xs text-sm text-purple-400 font-semibold group-hover:text-white transition-colors">
                    Check Live Site
                  </p>
                  <FaExternalLinkAlt className="ms-3" color="#CBACF9" />
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
