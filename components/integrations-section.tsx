"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { SectionHeader } from "./section-header"
import { IntegrationsVisual } from "./integrations-visual"

interface IntegrationsSectionProps {
  className?: string
}

const IntegrationsSection = React.forwardRef<HTMLElement, IntegrationsSectionProps>(
  ({ className, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          "relative w-full bg-white",
          // Responsive section padding
          "py-12 xs:py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32",
          className
        )}
        aria-labelledby="integrations-heading"
        {...props}
      >
        {/* Main Container */}
        <div className="relative mx-auto max-w-7xl px-4 xs:px-6 sm:px-6 md:px-8 lg:px-8 xl:px-12">
          <div className="flex flex-col items-center gap-12 xs:gap-16 sm:gap-20 md:gap-24 lg:gap-28 xl:gap-16">

            {/* Section Header */}
            <SectionHeader
              heading="Integrates with the tools you trust"
              subheading="Keep your current workflow. We integrate with your communication and project management platforms to capture updates automatically in the background."
              className="max-w-full xs:max-w-2xl sm:max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-[797px]"
              headingClassName="text-center max-w-full xs:max-w-lg sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-[743px] mx-auto"
              subheadingClassName="text-center max-w-full xs:max-w-md sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-[735px] mx-auto"
            />

            {/* Integrations Visual */}
            <div className="w-full flex justify-center">
              <IntegrationsVisual
                className="max-w-full xs:max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-[690px]"
              />
            </div>

          </div>
        </div>
      </section>
    )
  }
)

IntegrationsSection.displayName = "IntegrationsSection"

export { IntegrationsSection }
export type { IntegrationsSectionProps }