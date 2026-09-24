import { type CSSProperties } from "react";

/** Brand gradient reused by the avatar, the user bubble and the toggle button. */
export const BRAND_GRADIENT =
  "linear-gradient(135deg, #a855f7 0%, #6366f1 100%)";

/** Neutral translucent surface used by the assistant bubbles and typing dots. */
export const ASSISTANT_SURFACE: CSSProperties = {
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.08)",
};
