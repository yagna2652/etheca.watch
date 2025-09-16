"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { TeamType } from "./team-menubar"

interface TabContentProps {
  activeTeam: TeamType
  className?: string
}

// Content configuration for each team
const teamContent: Record<TeamType, {
  description: string
  placeholder?: string
}> = {
  operations: {
    description: "Sync Project Updates from Chat to Board.",
    placeholder: "Operations workflow visualization and project management integrations."
  },
  sales: {
    description: "Track Deals and Pipeline Updates in Real-time.",
    placeholder: "Sales pipeline visualization and CRM integrations."
  },
  finance: {
    description: "Automate Budget Approvals and Financial Reporting.",
    placeholder: "Financial dashboards and automated reporting systems."
  },
  marketing: {
    description: "Sync Campaign Performance and Lead Attribution.",
    placeholder: "Marketing campaign analytics and lead tracking systems."
  },
  hr: {
    description: "Streamline Hiring Process and Employee Onboarding.",
    placeholder: "HR workflow automation and employee management systems."
  }
}

const TabContent = React.forwardRef<HTMLDivElement, TabContentProps>(
  ({ activeTeam, className, ...props }, ref) => {
    const content = teamContent[activeTeam]

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-start w-full",
          // Responsive spacing
          "gap-4 xs:gap-5 sm:gap-6 md:gap-7 lg:gap-[24px]",
          className
        )}
        {...props}
      >
        {/* Description Text */}
        <div
          className={cn(
            // Responsive typography
            "text-lg xs:text-xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-[24px]",
            "font-normal text-black",
            // Responsive tracking and leading
            "tracking-[-0.01em] xs:tracking-[-0.015em] sm:tracking-[-0.02em] md:tracking-[-0.025em] lg:tracking-[-0.48px]",
            "leading-relaxed xs:leading-relaxed sm:leading-relaxed md:leading-relaxed lg:leading-[36px]",
            "text-center whitespace-nowrap",
            // Max width for better readability
            "max-w-full xs:max-w-lg sm:max-w-2xl md:max-w-3xl lg:max-w-4xl"
          )}
        >
          {content.description}
        </div>

        {/* Content Block - Placeholder for now */}
        <div
          className={cn(
            "w-full bg-[#848a9c]",
            // Responsive height
            "h-[400px] xs:h-[450px] sm:h-[500px] md:h-[600px] lg:h-[735px]",
            // Responsive max width
            "max-w-full xs:max-w-2xl sm:max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-[1267px]",
            "mx-auto",
            // Future: could add rounded corners or other styling
            "rounded-lg shadow-sm",
            // Flex for potential content centering
            "flex items-center justify-center",
            "transition-opacity duration-300 ease-in-out"
          )}
          role="img"
          aria-label={`${activeTeam} team content visualization`}
        >
          {/* Placeholder text - could be replaced with actual content/images */}
          <div className="text-white/60 text-center p-8">
            <p className="text-sm xs:text-base sm:text-lg opacity-80">
              {content.placeholder}
            </p>
          </div>
        </div>
      </div>
    )
  }
)

TabContent.displayName = "TabContent"

export { TabContent }
export type { TabContentProps }