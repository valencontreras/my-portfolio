import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface IconBadgeProps {
  children: ReactNode;
  size?: "md" | "lg";
  className?: string;
}

const SIZE = {
  md: "p-3",
  lg: "p-4",
} as const;

/**
 * Square tile that frames an icon inside a `GlassCard`.
 * The hover border reacts to the `group` class declared by the card.
 */
export const IconBadge = ({
  children,
  size = "md",
  className,
}: IconBadgeProps) => {
  return (
    <div
      className={cn(
        "w-fit rounded-2xl border border-white/10 bg-black/50 transition-colors group-hover:border-purple-500/30",
        SIZE[size],
        className,
      )}
    >
      {children}
    </div>
  );
};
