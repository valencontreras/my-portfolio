"use client";

import { type ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Accent palette shared by every glass surface, so the hover ring and the
 * diagonal glow layer always stay in sync.
 */
export type GlassAccent =
  | "purple"
  | "blue"
  | "green"
  | "yellow"
  | "pink"
  | "cyan";

/** Border colour revealed on hover (`group-hover:border-*`). */
const ACCENT_RING: Record<GlassAccent, string> = {
  purple: "group-hover:border-purple-500/30",
  blue: "group-hover:border-blue-500/30",
  green: "group-hover:border-green-500/30",
  yellow: "group-hover:border-yellow-500/30",
  pink: "group-hover:border-pink-500/30",
  cyan: "group-hover:border-cyan-500/30",
};

/** Gradient used by the diagonal glow layer. */
const ACCENT_GLOW: Record<GlassAccent, string> = {
  purple: "from-purple-500/10",
  blue: "from-blue-500/10",
  green: "from-green-500/10",
  yellow: "from-yellow-500/10",
  pink: "from-pink-500/10",
  cyan: "from-cyan-500/10",
};

type GlassCardProps = Omit<HTMLMotionProps<"div">, "children"> & {
  /** Card content — regular React nodes (no motion values). */
  children?: ReactNode;
  /** Accent used by the hover ring and the glow layer. */
  accent?: GlassAccent;
  /** Reveal an accent border on hover. */
  ring?: boolean;
  /** Reveal the diagonal accent glow on hover. */
  glow?: boolean;
};

/**
 * The "glass" surface used all over the portfolio: translucent background,
 * subtle border, accent hover ring and an optional diagonal glow.
 *
 * It declares its own stacking context (`isolate`) and paints the glow one
 * layer below the content (`-z-10`), so children never need `relative z-10`
 * to stay readable above the highlight.
 */
export const GlassCard = ({
  children,
  className,
  accent = "purple",
  ring = true,
  glow = true,
  ...motionProps
}: GlassCardProps) => {
  return (
    <motion.div
      className={cn(
        "group relative isolate overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition-colors",
        ring && ACCENT_RING[accent],
        className,
      )}
      {...motionProps}
    >
      {glow && (
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 -z-10 bg-linear-to-br to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100",
            ACCENT_GLOW[accent],
          )}
        />
      )}
      {children}
    </motion.div>
  );
};
