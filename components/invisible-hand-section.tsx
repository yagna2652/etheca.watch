"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { SectionHeader } from "./section-header"
import { ProcessCard } from "./process-card"

interface InvisibleHandSectionProps {
  className?: string
}

const InvisibleHandSection = React.forwardRef<HTMLElement, InvisibleHandSectionProps>(
  ({ className, ...props }, ref) => {
    const processSteps = [
      {
        step: 1,
        content: "Etheca connects to your tools—like Slack, email, and project boards—to understand how your team communicates and works naturally."
      },
      {
        step: 2,
        content: "It recognizes key business events within your conversations, such as a new contact being introduced, a deal stage changing, or a budget getting approved."
      },
      {
        step: 3,
        content: "The identified update is instantly and accurately recorded in your CRM, creating a perfect source of truth with zero manual data entry required from your team."
      }
    ]

    return (
      <section
        ref={ref}
        className={cn(
          "relative w-full bg-white",
          // Responsive section padding
          "py-12 xs:py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32",
          className
        )}
        aria-labelledby="invisible-hand-heading"
        {...props}
      >
        {/* Main Container */}
        <div className="relative mx-auto max-w-7xl px-4 xs:px-6 sm:px-6 md:px-8 lg:px-8 xl:px-12">
          <div className="flex flex-col items-center gap-12 xs:gap-16 sm:gap-20 md:gap-24 lg:gap-28 xl:gap-[76px]">

            {/* Section Header */}
            <SectionHeader
              heading="Your CRM updated by an Invisible Hand"
              subheading="Our AI works continuously in the background to keep your source of truth perfectly accurate. It follows a simple, powerful process:"
              className="max-w-full xs:max-w-2xl sm:max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-[1045px]"
            />

            {/* Process Cards Grid */}
            <div
              className={cn(
                "grid w-full gap-4 xs:gap-5 sm:gap-6 md:gap-7 lg:gap-8 xl:gap-[18px]",
                // Responsive grid layout
                "grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
                // Ensure equal height cards
                "auto-rows-fr",
                // Max width for the grid
                "max-w-full xs:max-w-2xl sm:max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-[1508px]"
              )}
              role="list"
              aria-label="Three-step automation process"
            >
              {processSteps.map((step) => (
                <ProcessCard
                  key={step.step}
                  step={step.step}
                  className="w-full"
                >
                  {step.content}
                </ProcessCard>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }
)

InvisibleHandSection.displayName = "InvisibleHandSection"

export { InvisibleHandSection }
export type { InvisibleHandSectionProps }