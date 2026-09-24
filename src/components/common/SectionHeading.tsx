import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type HeadingTag = "h1" | "h2" | "h3";

interface SectionHeadingProps {
  children: ReactNode;
  /** Muted supporting copy rendered under the title. */
  description?: string;
  /** Heading level — pick the one that keeps the document outline sane. */
  as?: HeadingTag;
  align?: "left" | "center";
  className?: string;
}

/**
 * Standard section title: bold white heading plus an optional muted
 * description. Gradient words are passed in as children via `<MagicText />`.
 */
export const SectionHeading = ({
  children,
  description,
  as: Heading = "h2",
  align = "left",
  className,
}: SectionHeadingProps) => {
  return (
    <div
      className={cn("space-y-4", align === "center" && "text-center", className)}
    >
      <Heading className="text-4xl md:text-5xl font-bold text-white">
        {children}
      </Heading>

      {description && (
        <p
          className={cn(
            "text-gray-400 text-lg",
            align === "center" && "max-w-2xl mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
};
