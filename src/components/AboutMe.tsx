"use client";

import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaBolt,
  FaBookOpen,
  FaCode,
  FaLightbulb,
  FaShieldAlt,
  FaUsers,
  FaCheck,
  FaRegCopy,
} from "react-icons/fa";
import { MagicText } from "./MagicUI";
import confetti from "canvas-confetti";
import { email } from "@/const/information";

interface Highlight {
  id: number;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

const highlights: Highlight[] = [
  {
    id: 1,
    title: "Design to Code",
    desc: "Turning Figma files into pixel-accurate, production-ready React components — spacing, motion and responsive behaviour included.",
    icon: <FaCode className="text-purple-400" size={28} />,
  },
  {
    id: 2,
    title: "Team Leadership",
    desc: "Guiding frontend work with clear communication: pairing, code reviews and keeping designers, developers and stakeholders aligned on one goal.",
    icon: <FaUsers className="text-blue-400" size={28} />,
  },
  {
    id: 3,
    title: "Accessibility First",
    desc: "Semantic HTML, keyboard navigation and visible focus states from the start, so what I build is usable by everyone — not just the average user.",
    icon: <FaShieldAlt className="text-green-400" size={28} />,
  },
  {
    id: 4,
    title: "Performance",
    desc: "Speed treated as a feature: lean bundles, optimized rendering and Core Web Vitals as part of the definition of done.",
    icon: <FaBolt className="text-yellow-400" size={28} />,
  },
  {
    id: 5,
    title: "Creative Problem Solving",
    desc: "Breaking ambiguous requirements into simple, reusable components — pragmatic solutions that ship on time without cutting quality.",
    icon: <FaLightbulb className="text-pink-400" size={28} />,
  },
  {
    id: 6,
    title: "Continuous Learning",
    desc: "Always exploring new libraries, frameworks and design trends to bring modern, well-supported tooling into every project.",
    icon: <FaBookOpen className="text-cyan-400" size={28} />,
  },
];

export const AboutMe = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ffffff", "#a855f7", "#6b21a8"],
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="about"
      className="relative w-full max-w-7xl px-4 pb-20 mx-auto overflow-hidden"
    >
      {/* Large Main Card (Profile) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-white/5 to-transparent p-8 md:p-12"
      >
        {/* Spotlight Effect (CSS-based) */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(circle_at_var(--x)_var(--y),rgba(255,255,255,0.06),transparent_40%)]"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            e.currentTarget.style.setProperty("--x", `${x}px`);
            e.currentTarget.style.setProperty("--y", `${y}px`);
          }}
        />

        <div className="relative z-10 flex flex-col min-h-125 h-full justify-between">
          <div className="space-y-6 max-w-4xl">
            <MagicText className="text-xs font-semibold uppercase tracking-[0.2em] mb-2 rounded-lg">
              Get to know me
            </MagicText>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              <span>About </span>
              <MagicText className="rounded-lg">me</MagicText>
            </h2>
            <div className="space-y-5 text-white font-light leading-relaxed max-w-2xl">
              <p>
                <span>
                  I&apos;m Valentina Contreras, a Front-End Developer and
                  Software Engineer focused on crafting modern, high-performance
                  web applications. My main stack is React and Next.js (App
                  Router) with TypeScript and Tailwind CSS, and I build with
                  performance, accessibility and clean code as non-negotiables.
                </span>
              </p>
              <p>
                <span>
                  I&apos;ve shipped interfaces end to end on scalable
                  architectures, and as a freelance developer I&apos;ve helped
                  small businesses and startups build their digital presence. I
                  also work AI-assisted, using cutting-edge AI tools to boost
                  productivity and deliver intelligent web solutions.
                </span>
              </p>
              <MagicText className="rounded-lg font-medium text-base">
                My goal is simple: turning concepts into seamless user
                experiences.
              </MagicText>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <button
              onClick={handleCopy}
              className="relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-xl border border-white/10 bg-white/5 px-6 font-medium text-white transition-all hover:bg-white/10 active:scale-95 group"
            >
              <div className="absolute inset-0 bg-linear-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              {copied ? (
                <FaCheck size={18} className="text-green-400" />
              ) : (
                <FaRegCopy size={18} />
              )}
              <span>{copied ? "Email Copied!" : "Copy my email"}</span>
            </button>
          </div>
        </div>

        {/* Background Decorative Image/Element */}
        <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-20 md:opacity-40 pointer-events-none overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop"
            alt="Feature"
            fill
            className="object-cover object-left transform scale-110 grayscale"
          />
        </div>
      </motion.div>
      <div className="relative z-10 mt-20">
        {/* Core expertise */}
        <div className="mb-10 flex items-center gap-4">
          <h3 className="text-2xl md:text-3xl font-bold text-white shrink-0">
            <span>Core </span>
            <MagicText className="rounded-lg">expertise</MagicText>
          </h3>
          <span className="hidden sm:block flex-1 h-px bg-linear-to-r from-purple-500/40 to-transparent" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 flex flex-col gap-4 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-linear-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 p-3 w-fit rounded-2xl bg-black/50 border border-white/10 group-hover:border-purple-500/30 transition-colors">
                {item.icon}
              </div>
              <h3 className="relative z-10 text-lg font-bold text-white">
                <span>{item.title}</span>
              </h3>
              <p className="relative z-10 text-sm text-gray-400 font-light">
                <span>{item.desc}</span>
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
