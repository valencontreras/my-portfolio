"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagicButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

export const MagicButton = ({
  children,
  className,
  onClick,
  icon,
}: MagicButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "relative inline-flex h-12 overflow-hidden rounded-xl p-[1px] focus:outline-none",
        className,
      )}
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-xl bg-slate-950 px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2 transition-colors group">
        {children}
        {icon}
      </span>
    </motion.button>
  );
};

export const MagicText = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "inline-block bg-[linear-gradient(90deg,#E2CBFF,#a855f7,#E2CBFF)] bg-size-[200%_auto] animate-shimmer bg-clip-text text-transparent",
        className,
      )}
    >
      {children}
    </span>
  );
};
