"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaLaptopCode } from "react-icons/fa";
import { MagicButton, MagicText } from "./MagicUI";
import { useRouter } from "next/navigation";
import { email, github, linkedin } from "@/const/information";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface Metric {
  id: number;
  value: string;
  label: string;
  accent: string;
  glow: string;
  ring: string;
  dot: string;
}

const metrics: Metric[] = [
  {
    id: 1,
    value: "4+",
    label: "Years Experience",
    accent: "from-purple-300 via-purple-500 to-purple-300",
    glow: "from-purple-500/10",
    ring: "group-hover:border-purple-500/30",
    dot: "bg-purple-400",
  },
  {
    id: 2,
    value: "11",
    label: "Projects Completed",
    accent: "from-blue-300 via-blue-500 to-blue-300",
    glow: "from-blue-500/10",
    ring: "group-hover:border-blue-500/30",
    dot: "bg-blue-400",
  },
  {
    id: 3,
    value: "3",
    label: "Team Lead",
    accent: "from-green-300 via-green-500 to-green-300",
    glow: "from-green-500/10",
    ring: "group-hover:border-green-500/30",
    dot: "bg-green-400",
  },
];

export const ProfileHeader = () => {
  const router = useRouter();
  return (
    <section className="w-full max-w-7xl mx-auto px-4 pt-40 pb-10 flex flex-col gap-16">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 space-y-8"
        >
          <div className="space-y-2">
            {/* Welcome pill */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 flex"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs md:text-sm font-medium text-purple-200">
                <Sparkles size={14} className="text-purple-300 shrink-0" />
                <span>Welcome to my portfolio</span>
              </span>
            </motion.div>

            <h2 className="text-white text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none flex flex-col">
              <span>HELLO 🌍</span>
              <span>I'M</span>
              <MagicText className="mt-2">VALENTINA.</MagicText>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-xl font-light leading-relaxed">
              <span>
                A passionate Front-End developer dedicated to building
                high-quality, accessible and user-friendly web applications.
              </span>
            </p>
          </div>

          <div className="flex items-center gap-6">
            <MagicButton
              onClick={() =>
                router.push(
                  `mailto:${email}?subject=Hello&body=I would like to collaborate with you`,
                )
              }
            >
              <span>CONTACT ME</span>
            </MagicButton>

            <div className="flex gap-4">
              <Link
                href={linkedin}
                title="Linkedin"
                target="_blank"
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors text-white"
              >
                <FaLinkedin size={20} />
              </Link>
              <Link
                href={github}
                title="Github"
                target="_blank"
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors text-white"
              >
                <FaGithub size={20} />
              </Link>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-64 h-64 md:w-100 md:h-100"
        >
          <div className="absolute inset-0 bg-purple-500/20 blur-[80px] rounded-full animate-pulse" />
          <div className="relative w-full h-full rounded-full border-4 border-white/10 overflow-hidden group">
            <Image
              src="/images/profile-2.png"
              alt="Valentina"
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            />
          </div>

          {/* Floating element decoration */}
          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -top-4 -right-4 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl shadow-2xl"
          >
            <span className="rotate-12">💻</span>
          </motion.div>

          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 2, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -bottom-4 -left-8 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl shadow-2xl"
          >
            🚀
          </motion.div>
        </motion.div>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-[60%]">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
            whileHover={{ y: -6 }}
            className={cn(
              "relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 text-center group transition-colors",
              metric.ring,
            )}
          >
            {/* Colored hover glow (same treatment as the Core Expertise cards) */}
            <div
              className={cn(
                "absolute inset-0 bg-linear-to-br to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                metric.glow,
              )}
            />

            <span
              className={cn(
                "relative z-10 block bg-linear-to-r bg-size-[200%_auto] animate-shimmer bg-clip-text text-4xl font-black text-transparent",
                metric.accent,
              )}
            >
              {metric.value}
            </span>
            <span className="relative z-10 mt-3 flex items-center justify-center gap-2 text-[10px] md:text-xs font-medium uppercase tracking-widest text-gray-400 transition-colors group-hover:text-gray-300">
              {metric.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
