"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface IntegrationsVisualProps {
  className?: string
}

const IntegrationsVisual = React.forwardRef<HTMLDivElement, IntegrationsVisualProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full flex items-center justify-center",
          // Responsive sizing for the container
          "h-[280px] xs:h-[320px] sm:h-[380px] md:h-[450px] lg:h-[520px] xl:h-[571px]",
          // Max width to prevent image from becoming too large
          "max-w-full",
          className
        )}
        {...props}
      >
        {/* Simple SVG illustration */}
        <img
          src="/assets/illustrations/Integrates with your tools illustration.svg"
          alt="Integrates with your tools - Illustration showing various business tools and platforms connected in a workflow"
          className={cn(
            "w-full h-full object-contain",
            // Responsive max width
            "max-w-[280px] xs:max-w-[320px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] xl:max-w-[600px]",
            // Smooth loading
            "transition-opacity duration-300"
          )}
          loading="lazy"
          decoding="async"
        />
      </div>
    )
  }
)

IntegrationsVisual.displayName = "IntegrationsVisual"

export { IntegrationsVisual }
export type { IntegrationsVisualProps }