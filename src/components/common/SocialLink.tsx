import { type ReactNode } from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { github, linkedin } from "@/const/information";

interface SocialLinkProps {
  href: string;
  /** Visible text and accessible name for the link. */
  label: string;
  icon: ReactNode;
  /** `icon` = round button, `pill` = rounded button with a visible label. */
  variant?: "icon" | "pill";
  className?: string;
}

export interface SocialEntry {
  id: number;
  label: string;
  href: string;
  icon: ReactNode;
}

/** Single source of truth for the social profiles shown across the UI. */
export const SOCIAL_LINKS: SocialEntry[] = [
  { id: 1, label: "Github", href: github, icon: <FaGithub size={20} /> },
  { id: 2, label: "Linkedin", href: linkedin, icon: <FaLinkedin size={20} /> },
];

const VARIANTS = {
  icon: "h-12 w-12 rounded-full border border-white/10 bg-white/5 hover:bg-white/10",
  pill: "h-12 gap-2 rounded-xl border border-white/10 bg-white/5 px-6 backdrop-blur-lg saturate-180 hover:bg-white/10 hover:border-purple-500/30",
} as const;

/** External link to a social profile. */
export const SocialLink = ({
  href,
  label,
  icon,
  variant = "icon",
  className,
}: SocialLinkProps) => {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={label}
      aria-label={label}
      className={cn(
        "group inline-flex items-center justify-center text-white transition-colors",
        VARIANTS[variant],
        className,
      )}
    >
      {icon}
      {variant === "pill" && (
        <span className="text-sm font-medium text-gray-300 transition-colors group-hover:text-white">
          {label}
        </span>
      )}
    </Link>
  );
};
