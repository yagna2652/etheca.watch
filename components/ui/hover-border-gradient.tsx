"use client"

import React, { useState, useRef } from "react"
import { cn } from "@/lib/utils"

export interface HoverBorderGradientProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  containerClassName?: string
  className?: string
  as?: React.ElementType
  duration?: number
}

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = "button",
  duration = 1,
  ...props
}: HoverBorderGradientProps) {
  const [hovered, setHovered] = useState<boolean>(false)
  const ref = useRef<HTMLElement>(null)

  return (
    <Tag
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative inline-flex h-12 overflow-hidden rounded-full bg-[#f6f6f6] p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50",
        containerClassName
      )}
      {...props}
    >
      <span
        className={cn(
          "absolute inset-0 overflow-hidden rounded-full",
          hovered ? "opacity-100" : "opacity-0"
        )}
        style={{
          transition: `opacity ${duration}s ease-in-out`,
        }}
      >
        <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </span>
      <span
        className={cn(
          "inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl",
          className
        )}
      >
        {children}
      </span>
    </Tag>
  )
}