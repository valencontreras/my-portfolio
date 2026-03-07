"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaLaptopCode } from "react-icons/fa";
import { MagicButton, MagicText } from "./MagicUI";
import { LuMousePointer2 } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { email, github, linkedin } from "@/const/information";

export const ProfileHeader = () => {
  const router = useRouter();
  return (
    <section className="w-full max-w-7xl mx-auto px-4 pt-40 pb-10 flex flex-col md:flex-row items-center justify-between gap-12">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1 space-y-8"
      >
        <div className="space-y-2">
          <h2 className="text-white text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none">
            HELLO 🌍
            <br />
            I AM <br />
            <MagicText className="mt-2">VALENTINA.</MagicText>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-xl font-light leading-relaxed">
            A passionate Front-End developer dedicated to building high-quality,
            accessible and user-friendly web applications.
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
            CONTACT ME
          </MagicButton>

          <div className="flex gap-4">
            <a
              href={linkedin}
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors text-white"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href={github}
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors text-white"
            >
              <FaGithub size={20} />
            </a>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative w-64 h-64 md:w-[400px] md:h-[400px]"
      >
        <div className="absolute inset-0 bg-purple-500/20 blur-[80px] rounded-full animate-pulse" />
        <div className="relative w-full h-full rounded-full border-4 border-white/10 overflow-hidden group">
          <Image
            src="/images/profile.png"
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
          <LuMousePointer2 className="text-purple-400 rotate-12" />
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
          <FaLaptopCode className="text-blue-600 font-bold text-2xl" />
        </motion.div>
      </motion.div>
    </section>
  );
};
