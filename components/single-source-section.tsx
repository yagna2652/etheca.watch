"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { SectionHeader } from "./section-header"
import { TeamMenubar, TeamType } from "./team-menubar"
import { TabContent } from "./tab-content"

interface SingleSourceSectionProps {
  className?: string
}

const SingleSourceSection = React.forwardRef<HTMLElement, SingleSourceSectionProps>(
  ({ className, ...props }, ref) => {
    const [activeTeam, setActiveTeam] = React.useState<TeamType>('operations')

    const handleTeamChange = (team: TeamType) => {
      setActiveTeam(team)
    }

    return (
      <section
        ref={ref}
        className={cn(
          "relative w-full bg-white",
          // Responsive section padding
          "py-12 xs:py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32",
          className
        )}
        aria-labelledby="single-source-heading"
        {...props}
      >
        {/* Main Container */}
        <div className="relative mx-auto max-w-7xl px-4 xs:px-6 sm:px-6 md:px-8 lg:px-8 xl:px-12">
          <div className="flex flex-col items-center gap-12 xs:gap-16 sm:gap-20 md:gap-24 lg:gap-28 xl:gap-[72px]">

            {/* Header and Menubar Section */}
            <div className="flex flex-col items-center gap-8 xs:gap-10 sm:gap-12 md:gap-16 lg:gap-20 xl:gap-[67px] w-full max-w-full xs:max-w-2xl sm:max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-[797px]">

              {/* Section Header */}
              <div className="flex flex-col items-center gap-4 xs:gap-5 sm:gap-6 md:gap-7 lg:gap-8 xl:gap-[36px]">
                <SectionHeader
                  heading="A Single Source of Truth for Your Most Critical Teams."
                  className="text-center"
                  headingClassName="max-w-full xs:max-w-lg sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-[743px]"
                />
              </div>

              {/* Team Menubar */}
              <div className="w-full flex justify-center">
                <TeamMenubar
                  activeTeam={activeTeam}
                  onTeamChange={handleTeamChange}
                  className="w-auto"
                />
              </div>
            </div>

            {/* Tab Content Section */}
            <div className="w-full max-w-full xs:max-w-2xl sm:max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-[1267px]">
              <TabContent
                activeTeam={activeTeam}
                className="w-full"
              />
            </div>

          </div>
        </div>
      </section>
    )
  }
)

SingleSourceSection.displayName = "SingleSourceSection"

export { SingleSourceSection }
export type { SingleSourceSectionProps }