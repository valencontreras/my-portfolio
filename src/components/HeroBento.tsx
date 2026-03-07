"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { FaCheck, FaRegCopy } from "react-icons/fa";
import { MagicText } from "./MagicUI";
import { email } from "@/const/information";

export const HeroBento = () => {
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
      className="relative w-full max-w-7xl px-4 pt-32 pb-20 mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 h-full md:h-[600px]">
        {/* Large Main Card (Profile) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8 md:p-12"
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

          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="space-y-6 max-w-2xl">
              <MagicText className="text-xs font-semibold uppercase tracking-[0.2em] mb-2 rounded-lg">
                Crafting Excellence
              </MagicText>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
                Transforming Concepts into Seamless User Experiences
              </h1>
              <p className="text-lg text-gray-400 max-w-lg">
                I'm a Front-End Developer specializing in modern web
                technologies, building high-performance applications with
                beautiful interfaces.
              </p>
            </div>

            <div className="mt-12 flex flex-wrap gap-4">
              <button
                onClick={handleCopy}
                className="relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-xl border border-white/10 bg-white/5 px-6 font-medium text-white transition-all hover:bg-white/10 active:scale-95 group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
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

        {/* Small Card 1 (Stack Preview) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl border border-white/10 bg-white/5 p-8 flex flex-col justify-center gap-4 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <span className="text-3xl">🚀</span>
          <h3 className="text-xl font-bold text-white">Always Learning</h3>
          <p className="text-sm text-gray-400">
            Constantly exploring new libraries and frameworks to build better
            apps.
          </p>
        </motion.div>

        {/* Small Card 2 (Location/Global) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-3xl border border-white/10 bg-[#1a002b] p-8 flex flex-col justify-between overflow-hidden relative group"
        >
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
          <div className="relative z-10 flex flex-col gap-2">
            <h3 className="text-xl font-bold text-white">
              Full-Stack Capability
            </h3>
            <p className="text-sm text-gray-400 line-clamp-2">
              From frontend pixels to backend databases.
            </p>
          </div>

          <div className="mt-4 relative h-20 w-full overflow-hidden flex items-center justify-center grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all">
            <div className="flex gap-2">
              {["JS", "TS", "RT", "NX"].map((t) => (
                <div
                  key={t}
                  className="h-10 w-10 flex items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[10px] font-bold"
                >
                  {t}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
