"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface TransparencySectionProps {
  className?: string
}

const TransparencySection = React.forwardRef<HTMLElement, TransparencySectionProps>(
  ({ className, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          "relative w-full bg-white",
          "py-12 xs:py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32",
          className
        )}
        aria-labelledby="transparency-heading"
        {...props}
      >
      <div className="mx-auto max-w-7xl px-4 xs:px-6 sm:px-6 md:px-8 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xs:gap-10 sm:gap-12 md:gap-16 lg:gap-20 xl:gap-[234px] items-center min-h-[400px] xs:min-h-[450px] sm:min-h-[500px]">
          {/* Left Column - Text Content */}
          <div className="flex flex-col gap-8 xs:gap-10 sm:gap-12 md:gap-16 lg:gap-[60px] order-1 lg:order-1 text-left md:text-center">
            <h2
              id="transparency-heading"
              className="text-3xl xs:text-4xl sm:text-5xl md:text-4xl lg:text-5xl xl:text-5xl font-serif text-black tracking-[-0.04em] xs:tracking-[-0.05em] sm:tracking-[-0.06em] md:tracking-[-0.07em] lg:tracking-[-0.08em] xl:tracking-tight leading-tight xs:leading-tight sm:leading-tight md:leading-tight lg:leading-tight xl:leading-tight"
            >
              Complete Control, Total Transparency
            </h2>
            <p className="text-base xs:text-lg sm:text-xl md:text-lg lg:text-xl xl:text-[16px] font-sans font-medium text-gray-900 tracking-[-0.01em] xs:tracking-[-0.015em] sm:tracking-[-0.02em] md:tracking-[-0.025em] lg:tracking-[-0.03em] xl:tracking-[-0.72px] leading-relaxed xs:leading-relaxed sm:leading-relaxed md:leading-relaxed lg:leading-relaxed xl:leading-[22px]">
              Every automated update includes a clear audit trail, showing the AI's reasoning and the original source for your peace of mind.
            </p>
          </div>

          {/* Right Column - Visual Content Area */}
          <div className="order-2 lg:order-2 flex justify-center lg:justify-end">
            <div className="bg-[#848a9c] rounded-lg w-full h-[300px] xs:h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] xl:h-[450px] max-w-full xs:max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-[600px] flex items-center justify-center shadow-sm">
              <div className="text-white/60 text-center p-8">
                <p className="text-sm xl:text-base opacity-80">
                  Audit trail and transparency visualization
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>
    )
  }
)

TransparencySection.displayName = "TransparencySection"

export { TransparencySection }
export type { TransparencySectionProps }