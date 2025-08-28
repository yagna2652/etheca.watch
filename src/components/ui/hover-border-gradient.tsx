"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = "div",
  duration = 4,
  clockwise = true,
  ...props
}: React.PropsWithChildren<
  {
    as?: React.ElementType;
    containerClassName?: string;
    className?: string;
    duration?: number;
    clockwise?: boolean;
  } & React.HTMLAttributes<HTMLElement>
>) {
  const [hovered, setHovered] = useState<boolean>(false);
  const [rotation, setRotation] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const getGradientFromRotation = (deg: number): string => {
    const normalizedDeg = ((deg % 360) + 360) % 360;
    const x = 50 + 50 * Math.cos((normalizedDeg - 90) * Math.PI / 180);
    const y = 50 + 50 * Math.sin((normalizedDeg - 90) * Math.PI / 180);
    return `radial-gradient(20% 40% at ${x}% ${y}%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)`;
  };

  const highlight =
    "radial-gradient(75% 181.15942028985506% at 50% 50%, #576c9d 0%, rgba(255, 255, 255, 0) 100%)";

  useEffect(() => {
    if (!hovered) {
      const startTime = Date.now();
      const startRotation = rotation;
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = (elapsed / (duration * 1000)) % 1;
        const newRotation = startRotation + (clockwise ? 360 : -360) * progress;
        setRotation(newRotation);
        
        intervalRef.current = setTimeout(animate, 16);
      };
      
      intervalRef.current = setTimeout(animate, 16);
      
      return () => {
        if (intervalRef.current) {
          clearTimeout(intervalRef.current);
          intervalRef.current = null;
        }
      };
    }
  }, [hovered, duration, clockwise]);

  return (
    <Tag
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex border content-center bg-black/20 hover:bg-black/10 transition duration-500 dark:bg-white/20 items-center flex-col flex-nowrap gap-10 h-min justify-center overflow-hidden p-px decoration-clone w-fit",
        containerClassName
      )}
      {...props}
    >
      <div
        className={cn("w-auto text-white z-10 bg-black px-4 py-2 rounded-[inherit]", className)}
      >
        {children}
      </div>
      <motion.div
        className={cn(
          "flex-none inset-0 overflow-hidden absolute z-0"
        )}
        style={{
          filter: "blur(2px)",
          position: "absolute",
          width: "100%",
          height: "100%",
          borderRadius: "inherit",
          overflow: "hidden",
          clipPath: "inherit",
        }}
        animate={{
          background: hovered
            ? highlight
            : getGradientFromRotation(rotation),
        }}
        transition={{ ease: "linear", duration: hovered ? 0.2 : 0 }}
      />
      <div className="bg-white absolute z-1 flex-none inset-[2px] rounded-[inherit]" />
    </Tag>
  );
}