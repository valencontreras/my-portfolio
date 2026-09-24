import { cn } from "@/lib/utils";
import { BRAND_GRADIENT } from "./chatStyles";

interface ChatAvatarProps {
  size?: "sm" | "md";
  /** Adds the purple glow used by the avatar inside the chat header. */
  glow?: boolean;
  className?: string;
}

const SIZE = {
  sm: "h-6 w-6 text-[9px]",
  md: "h-10 w-10 text-sm",
} as const;

/** Assistant avatar — the only place the "VC" badge markup lives. */
export const ChatAvatar = ({
  size = "sm",
  glow = false,
  className,
}: ChatAvatarProps) => {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full font-bold text-white",
        SIZE[size],
        className,
      )}
      style={{
        background: BRAND_GRADIENT,
        boxShadow: glow ? "0 0 16px rgba(168,85,247,0.4)" : undefined,
      }}
    >
      VC
    </div>
  );
};
