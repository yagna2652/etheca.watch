"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  heading: string
  subheading?: string
  className?: string
  headingClassName?: string
  subheadingClassName?: string
  centered?: boolean
}

const SectionHeader = React.forwardRef<HTMLElement, SectionHeaderProps>(
  ({
    heading,
    subheading,
    className,
    headingClassName,
    subheadingClassName,
    centered = true,
    ...props
  }, ref) => {
    return (
      <header
        ref={ref}
        className={cn(
          "flex flex-col gap-4 xs:gap-5 sm:gap-6 md:gap-7 lg:gap-[21px]",
          "w-full",
          centered && "items-center text-center",
          className
        )}
        {...props}
      >
        <h2
          className={cn(
            // Same responsive typography scaling as hero section
            "text-3xl xs:text-4xl sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl",
            // Font and styling
            "font-serif text-black",
            // Same tracking progression as hero section
            "tracking-[-0.04em] xs:tracking-[-0.05em] sm:tracking-[-0.06em] md:tracking-[-0.07em] lg:tracking-[-0.08em] xl:tracking-tight",
            "leading-tight xs:leading-tight sm:leading-tight md:leading-tight lg:leading-tight xl:leading-tight",
            // Responsive max width
            "max-w-full xs:max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-[969px]",
            headingClassName
          )}
        >
          {heading}
        </h2>

        {subheading && (
          <p
            className={cn(
              // Same responsive typography scaling as hero section description
              "text-base xs:text-lg sm:text-xl md:text-lg lg:text-xl xl:text-[18px]",
              // Same font and styling as hero section description
              "font-sans font-medium text-gray-900",
              // Same tracking progression as hero section description
              "tracking-[-0.01em] xs:tracking-[-0.015em] sm:tracking-[-0.02em] md:tracking-[-0.025em] lg:tracking-[-0.03em] xl:tracking-[-0.72px]",
              "leading-relaxed xs:leading-relaxed sm:leading-relaxed md:leading-relaxed lg:leading-relaxed xl:leading-[24px]",
              // Responsive max width
              "max-w-full xs:max-w-md sm:max-w-lg md:max-w-full lg:max-w-lg xl:max-w-lg",
              subheadingClassName
            )}
          >
            {subheading}
          </p>
        )}
      </header>
    )
  }
)

SectionHeader.displayName = "SectionHeader"

export { SectionHeader }
export type { SectionHeaderProps }