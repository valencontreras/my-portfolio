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
          <span>Ready to take</span>{" "}
          <MagicText className="rounded-lg">your</MagicText>{" "}
          <span>digital presence to the next level?</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-xl">
          <span>
            Reach out to me today and let&apos;s discuss how I can help you
            achieve your goals.
          </span>
        </p>

        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Magic Button CTA */}
          <MagicButton
            icon={<FaEnvelope size={18} />}
            onClick={() =>
              router.push(
                `mailto:${email}?subject=Hello&body=I would like to collaborate with you`,
              )
            }
          >
            <span>Let&apos;s get in touch</span>
          </MagicButton>

          <div className="flex items-center gap-4">
            {[
              {
                id: 1,
                icon: <FaGithub size={20} />,
                label: "Github",
                link: github,
              },
              {
                id: 2,
                icon: <FaLinkedin size={20} />,
                label: "Linkedin",
                link: linkedin,
              },
            ].map((profile) => (
              <a
                key={profile.id}
                href={profile.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={profile.label}
                className="group h-12 cursor-pointer inline-flex items-center justify-center gap-2 backdrop-filter backdrop-blur-lg saturate-180 bg-white/5 border border-white/10 rounded-xl px-6 hover:bg-white/10 hover:border-purple-500/30 transition-colors text-white"
              >
                {profile.icon}
                <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                  {profile.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mt-32 border-t border-white/10 pt-10 gap-8">
        <p className="text-sm font-light text-gray-400">
          <span>Made with ❤️ and 🤖 by Valentina Contreras</span>
          <br />
          <span>Copyright &copy; 2026</span>
        </p>
      </div>
    </footer>
  );
};
