import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: ReactNode;
  /** `heading` = section subtitle, `caps` = small uppercase group label. */
  variant?: "heading" | "caps";
  /** Overrides the gradient rule rendered after the label. */
  lineClassName?: string;
  className?: string;
}

const VARIANTS = {
  heading: {
    label: "text-2xl md:text-3xl font-bold text-white shrink-0",
    line: "hidden sm:block flex-1 h-px bg-linear-to-r from-purple-500/40 to-transparent",
  },
  caps: {
    label:
      "text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 shrink-0",
    line: "flex-1 h-px bg-linear-to-r from-white/10 to-transparent",
  },
} as const;

/** Sub-heading followed by a hairline gradient rule. */
export const SectionLabel = ({
  children,
  variant = "heading",
  lineClassName,
  className,
}: SectionLabelProps) => {
  const styles = VARIANTS[variant];

  return (
    <div className={cn("flex items-center gap-4", className)}>
      <h3 className={styles.label}>{children}</h3>
      <span aria-hidden className={cn(styles.line, lineClassName)} />
    </div>
  );
};
