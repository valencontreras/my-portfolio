"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavItem {
  name: string;
  link: string;
}

// Keep in the same order as the sections on the page,
// so the scroll-spy highlights the right item.
const navItems: NavItem[] = [
  { name: "About", link: "#about" },
  { name: "Stack", link: "#stack" },
  { name: "Projects", link: "#projects" },
  { name: "Experience", link: "#experience" },
  { name: "Contact", link: "#contact" },
];

// Distance from the top of the viewport where a section counts as active.
// Slightly below the fixed navbar (~80px tall) so headings are not covered.
const NAV_OFFSET = 120;

export const Navbar = () => {
  const [activeSection, setActiveSection] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // While a nav link animates a smooth scroll, the spy would highlight every
  // section it passes through. Mute it until the scrolling settles.
  const isSmoothScrolling = useRef(false);
  const muteTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let frame = 0;
    let settleTimeout: ReturnType<typeof setTimeout> | null = null;

    const updateActiveSection = () => {
      // The active section is the last one whose top already passed the
      // offset, so the dot stays lit while scrolling through the section.
      let current = "";

      navItems.forEach((item) => {
        const element = document.getElementById(item.link.slice(1));

        if (element && element.getBoundingClientRect().top <= NAV_OFFSET) {
          current = item.link;
        }
      });

      // The last section is often too short to ever reach the offset (its top
      // stays below it at the bottom of the page), so force it there.
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;

      if (isAtBottom) {
        current = navItems[navItems.length - 1].link;
      }

      setActiveSection(current);
    };

    const handleScroll = () => {
      if (isSmoothScrolling.current) {
        // Unmute and resync once scrolling stops.
        if (settleTimeout) clearTimeout(settleTimeout);
        settleTimeout = setTimeout(() => {
          isSmoothScrolling.current = false;
          updateActiveSection();
        }, 150);
        return;
      }

      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateActiveSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll(); // Initial check

    return () => {
      cancelAnimationFrame(frame);
      if (settleTimeout) clearTimeout(settleTimeout);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const handleLinkClick = (link: string) => {
    // Highlight the clicked link immediately instead of waiting for the scroll.
    setActiveSection(link);
    setIsMenuOpen(false);
    isSmoothScrolling.current = true;

    // Safety net in case no scroll event fires (e.g. clicking the active item).
    if (muteTimeout.current) clearTimeout(muteTimeout.current);
    muteTimeout.current = setTimeout(() => {
      isSmoothScrolling.current = false;
    }, 1200);
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
          <span className="text-sm font-bold text-white">
            Valentina Contreras
          </span>
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
