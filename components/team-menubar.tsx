"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar"

export type TeamType = 'operations' | 'sales' | 'finance' | 'marketing' | 'hr'

interface TeamMenubarProps {
  activeTeam: TeamType
  onTeamChange: (team: TeamType) => void
  className?: string
}

const teams: { key: TeamType; label: string }[] = [
  { key: 'operations', label: 'Operations' },
  { key: 'sales', label: 'Sales' },
  { key: 'finance', label: 'Finance' },
  { key: 'marketing', label: 'Marketing' },
  { key: 'hr', label: 'HR' },
]

const TeamMenubar = React.forwardRef<HTMLDivElement, TeamMenubarProps>(
  ({ activeTeam, onTeamChange, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex justify-center w-full", className)}
        {...props}
      >
        <Menubar className={cn(
          // Custom styling to match Figma design
          "bg-white border border-slate-300 rounded-[6px] p-1",
          "h-auto flex items-start justify-start gap-0",
          // Responsive sizing
          "w-auto xs:w-auto sm:w-auto md:w-auto lg:w-auto",
          "space-x-0" // Remove default spacing
        )}>
          {teams.map((team) => (
            <MenubarMenu key={team.key}>
              <MenubarTrigger
                className={cn(
                  // Base styles
                  "px-3 py-1.5 xs:px-4 xs:py-2 sm:px-3 sm:py-1.5 md:px-3 md:py-1.5 lg:px-3 lg:py-1.5",
                  "rounded-[4px] cursor-pointer transition-colors",
                  "border-0 outline-none",
                  // Typography - responsive scaling
                  "text-sm xs:text-base sm:text-lg md:text-xl lg:text-[24px]",
                  "font-normal tracking-[-0.01em] xs:tracking-[-0.015em] sm:tracking-[-0.02em] md:tracking-[-0.025em] lg:tracking-[-0.48px]",
                  "leading-tight xs:leading-snug sm:leading-normal md:leading-relaxed lg:leading-[36px]",
                  "whitespace-nowrap text-black",
                  // Active/inactive states
                  activeTeam === team.key
                    ? "bg-slate-100" // Active state - matches Figma slate/100
                    : "bg-white hover:bg-slate-50", // Inactive state with subtle hover
                  // Focus states
                  "focus:bg-slate-100 focus:outline-none",
                  "data-[state=open]:bg-slate-100"
                )}
                onClick={() => onTeamChange(team.key)}
                aria-label={`Select ${team.label} team`}
                role="button"
                tabIndex={0}
              >
                {team.label}
              </MenubarTrigger>
            </MenubarMenu>
          ))}
        </Menubar>
      </div>
    )
  }
)

TeamMenubar.displayName = "TeamMenubar"

export { TeamMenubar }
export type { TeamMenubarProps }