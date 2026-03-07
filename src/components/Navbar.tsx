"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const navItems = [
  { name: "About", link: "#about" },
  { name: "Projects", link: "#projects" },
  { name: "Experience", link: "#experience" },
  { name: "Contact", link: "#contact" },
];

export const Navbar = () => {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    // Handle initial hash on mount
    const handleHashChange = () => {
      setActiveSection(window.location.hash || "#about");
    };

    // Set initial state
    handleHashChange();

    // Listen for hash changes and popstate (back/forward)
    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("popstate", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("popstate", handleHashChange);
    };
  }, []);

  const handleLinkClick = (link: string) => {
    setActiveSection(link);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4">
      <nav className="flex w-full max-w-7xl items-center justify-between rounded-full border border-white/10 bg-black/50 px-6 py-3 backdrop-blur-md">
        {/* Left: Profile Information */}
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/20">
            <Image
              src="/images/profile.png"
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
              className={`text-sm font-medium transition-colors hover:text-white relative ${
                activeSection === item.link ? "text-white" : "text-gray-400"
              }`}
            >
              {activeSection === item.link && (
                <span className="size-1.5 bg-blue-500 rounded-full absolute top-0 -right-2 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
              )}
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Placeholder (Optional) */}
        <div className="md:hidden">
          <span className="text-white text-xs">Menu</span>
        </div>
      </nav>
    </header>
  );
};
