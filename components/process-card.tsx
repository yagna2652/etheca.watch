"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ProcessCardProps {
  children: React.ReactNode
  className?: string
  step?: number
}

const ProcessCard = React.forwardRef<HTMLDivElement, ProcessCardProps>(
  ({ children, className, step, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base styles
          "relative flex items-start justify-center",
          "border border-[#848a9c] border-solid",
          "h-auto min-h-[300px] xs:min-h-[350px] sm:min-h-[400px] md:min-h-[420px] lg:min-h-[458px]",
          // Responsive padding
          "px-4 py-8 xs:px-6 xs:py-10 sm:px-8 sm:py-12 md:px-10 md:py-14 lg:px-[53px] lg:py-[121px]",
          // Background and interaction states
          "bg-white",
          "transition-colors duration-200",
          "hover:bg-gray-50",
          className
        )}
        role="article"
        aria-labelledby={step ? `process-step-${step}` : undefined}
        {...props}
      >
        <div className="flex flex-col w-full max-w-sm xs:max-w-md sm:max-w-lg md:max-w-xl lg:max-w-[383px]">
          {step && (
            <div
              className="text-xs xs:text-sm font-medium text-gray-500 mb-4 xs:mb-5 sm:mb-6 h-4 xs:h-5 sm:h-6 flex items-start"
              id={`process-step-${step}`}
              aria-label={`Step ${step}`}
            >
              Step {step}
            </div>
          )}
          <div className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl font-normal text-[#181d1f] leading-relaxed xs:leading-relaxed sm:leading-relaxed md:leading-relaxed lg:leading-[36px] tracking-[-0.01em] xs:tracking-[-0.015em] sm:tracking-[-0.02em] md:tracking-[-0.025em] lg:tracking-[-0.48px]">
            {children}
          </div>
        </div>
      </div>
    )
  }
)

ProcessCard.displayName = "ProcessCard"

export { ProcessCard }
export type { ProcessCardProps }