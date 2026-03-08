"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "About", link: "#about" },
  { name: "Projects", link: "#projects" },
  { name: "Experience", link: "#experience" },
  { name: "Contact", link: "#contact" },
];

export const Navbar = () => {
  const [activeSection, setActiveSection] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => {
        const element = document.querySelector(item.link);
        if (element) {
          const rect = element.getBoundingClientRect();
          return {
            link: item.link,
            top: rect.top,
            bottom: rect.bottom,
          };
        }
        return null;
      });

      const currentSection = sections.find((section) => {
        if (section) {
          // Check if section is in viewport (with some offset)
          return section.top <= 100 && section.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setTimeout(() => {
          setActiveSection(currentSection.link);
        }, 800);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (link: string) => {
    setTimeout(() => {
      setActiveSection(link);
    }, 800);
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4">
      <nav className="flex w-full max-w-7xl items-center justify-between rounded-full border border-white/10 bg-black/50 px-6 py-3 backdrop-blur-md">
        {/* Left: Profile Information */}
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/20">
            <Image
              src="/logo.png"
              alt="Profile"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white">
              Valentina Contreras
            </span>
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
              </span>
              <span className="text-[10px] font-medium text-green-400 uppercase tracking-wider">
                Available for work
              </span>
            </div>
          </div>
        </div>

        {/* Right: Navigation Links */}
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.link}
              onClick={() => handleLinkClick(item.link)}
              className={`text-sm font-medium transition-colors hover:text-white relative flex items-center gap-1 ${
                activeSection === item.link ? "text-white" : "text-gray-400"
              }`}
            >
              <span>{item.name}</span>
              {activeSection === item.link && (
                <span className="size-1.5 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)] shrink-0" />
              )}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="text-white md:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute left-0 right-0 top-full mt-4 flex flex-col gap-4 rounded-3xl border border-white/10 bg-black/90 p-6 backdrop-blur-xl md:hidden"
            >
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.link}
                  onClick={() => handleLinkClick(item.link)}
                  className={`text-lg font-medium transition-colors flex items-center justify-between ${
                    activeSection === item.link ? "text-white" : "text-gray-400"
                  }`}
                >
                  <span>{item.name}</span>
                  {activeSection === item.link && (
                    <span className="size-1.5 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                  )}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};
