"use client";

import React from "react";
import { FaEnvelope, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { MagicButton, MagicText } from "./MagicUI";
import { useRouter } from "next/navigation";
import { email, github, linkedin } from "@/const/information";

export const Footer = () => {
  const router = useRouter();
  return (
    <footer
      id="contact"
      className="relative w-full pt-20 pb-10 max-w-7xl mx-auto px-4 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-[400px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="flex flex-col items-center text-center space-y-12 relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold text-white max-w-3xl leading-tight">
          Ready to take <MagicText className="rounded-lg">your</MagicText>{" "}
          digital presence to the next level?
        </h1>
        <p className="text-gray-400 text-lg max-w-xl">
          Reach out to me today and let's discuss how I can help you achieve
          your goals.
        </p>

        {/* Magic Button CTA */}
        <MagicButton
          icon={<FaEnvelope size={18} />}
          onClick={() =>
            router.push(
              `mailto:${email}?subject=Hello&body=I would like to collaborate with you`,
            )
          }
        >
          Let&apos;s get in touch
        </MagicButton>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mt-32 border-t border-white/10 pt-10 gap-8">
        <p className="text-sm font-light text-gray-400">
          Copyright &copy; 2026 Valentina Contreras ❤️
        </p>

        <div className="flex items-center gap-6">
          {[
            {
              id: 1,
              icon: <FaGithub size={20} />,
              link: github,
            },
            {
              id: 2,
              icon: <FaLinkedin size={20} />,
              link: linkedin,
            },
          ].map((profile) => (
            <a
              key={profile.id}
              href={profile.link}
              target="_blank"
              className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors text-white"
            >
              {profile.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
