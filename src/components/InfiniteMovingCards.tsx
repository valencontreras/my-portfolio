"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState, useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
  wrap,
} from "framer-motion";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    name: string;
    icon?: React.ReactNode;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);

  const [scrollerWidth, setScrollerWidth] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Motion values for scroll
  const baseX = useMotionValue(0);

  // Speed mapping
  const getSpeedValue = () => {
    switch (speed) {
      case "fast":
        return 2;
      case "normal":
        return 1;
      case "slow":
        return 0.5;
      default:
        return 1;
    }
  };

  useEffect(() => {
    if (scrollerRef.current) {
      // Duplicate items for seamless scroll
      const scrollerContent = Array.from(scrollerRef.current.children);
      if (
        scrollerContent.length > 0 &&
        scrollerRef.current.children.length === items.length
      ) {
        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true);
          scrollerRef.current?.appendChild(duplicatedItem);
        });
      }
      setScrollerWidth(scrollerRef.current.scrollWidth / 2);
    }
  }, [items]);

  useAnimationFrame((t, delta) => {
    if (!scrollerWidth || isDragging) return;
    if (pauseOnHover && isHovered) return;

    let moveBy = getSpeedValue() * (delta / 16); // Normalize by 60fps
    if (direction === "left") {
      baseX.set(baseX.get() - moveBy);
    } else {
      baseX.set(baseX.get() + moveBy);
    }
  });

  // Infinite wrap logic
  const x = useTransform(baseX, (v) => `${wrap(-scrollerWidth, 0, v)}px`);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className,
      )}
    >
      <motion.ul
        ref={scrollerRef}
        style={{ x }}
        onPanStart={() => setIsDragging(true)}
        onPan={(_, info) => {
          baseX.set(baseX.get() + info.delta.x);
        }}
        onPanEnd={() => setIsDragging(false)}
        className={cn(
          "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap cursor-grab active:cursor-grabbing",
        )}
      >
        {items.map((item, idx) => (
          <li
            className="w-[180px] max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 border-white/10 px-6 py-5 md:w-[220px] bg-white/5 select-none"
            key={`${item.name}-${idx}`}
          >
            <div className="relative z-20 flex flex-row items-center justify-center gap-4">
              {item.icon && (
                <div className="text-3xl md:text-4xl opacity-80 group-hover:opacity-100 transition-opacity">
                  {item.icon}
                </div>
              )}
              <span className="text-sm md:text-base leading-[1.6] text-gray-300 font-bold uppercase tracking-wider">
                {item.name}
              </span>
            </div>
          </li>
        ))}
      </motion.ul>
    </div>
  );
};
