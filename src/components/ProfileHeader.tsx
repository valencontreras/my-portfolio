"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import { MagicButton, MagicText } from "./MagicUI";
import { GlassCard, type GlassAccent } from "./common/GlassCard";
import { SOCIAL_LINKS, SocialLink } from "./common/SocialLink";
import { email } from "@/const/information";
import { cn } from "@/lib/utils";

interface Metric {
  id: number;
  value: string;
  label: string;
  accent: GlassAccent;
  /** Gradient used by the shimmering value text. */
  valueClassName: string;
}

const metrics: Metric[] = [
  {
    id: 1,
    value: "4+",
    label: "Years Experience",
    accent: "purple",
    valueClassName: "from-purple-300 via-purple-500 to-purple-300",
  },
  {
    id: 2,
    value: "11",
    label: "Projects Completed",
    accent: "blue",
    valueClassName: "from-blue-300 via-blue-500 to-blue-300",
  },
  {
    id: 3,
    value: "3",
    label: "Team Lead",
    accent: "green",
    valueClassName: "from-green-300 via-green-500 to-green-300",
  },
];

export const ProfileHeader = () => {
  const router = useRouter();
  return (
    <section className="w-full max-w-7xl mx-auto px-4 pt-32 lg:pt-40 pb-10 flex flex-col gap-16">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
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
              {SOCIAL_LINKS.map((profile) => (
                <SocialLink
                  key={profile.id}
                  href={profile.href}
                  label={profile.label}
                  icon={profile.icon}
                />
              ))}
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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 lg:max-w-[60%]">
        {metrics.map((metric, index) => (
          <GlassCard
            key={metric.id}
            accent={metric.accent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
            whileHover={{ y: -6 }}
            className="p-6 text-center"
          >
            <span
              className={cn(
                "block bg-linear-to-r bg-size-[200%_auto] animate-shimmer bg-clip-text text-4xl font-black text-transparent",
                metric.valueClassName,
              )}
            >
              {metric.value}
            </span>
            <span className="mt-3 flex items-center justify-center gap-2 text-[10px] md:text-xs font-medium uppercase tracking-widest text-gray-400 transition-colors group-hover:text-gray-300">
              {metric.label}
            </span>
          </GlassCard>
        ))}
      </div>
    </section>
  );
};
