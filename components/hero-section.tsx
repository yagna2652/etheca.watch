"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface HeroSectionProps {
  backgroundImageUrl?: string
  heroImageUrl?: string
  onEmailSubmit?: (email: string) => void
  className?: string
}

const HeroSection = React.forwardRef<HTMLDivElement, HeroSectionProps>(
  ({
    backgroundImageUrl,
    heroImageUrl,
    onEmailSubmit,
    className,
    ...props
  }, ref) => {
    const [email, setEmail] = React.useState("")

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      if (email && onEmailSubmit) {
        onEmailSubmit(email)
      }
    }

    return (
      <section
        ref={ref}
        className={cn(
          "relative w-full bg-white",
          className
        )}
        aria-labelledby="hero-heading"
        {...props}
      >
        {/* Background Image Container */}
        {backgroundImageUrl && (
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <img
              alt=""
              className="w-full h-full object-cover"
              src={backgroundImageUrl}
              loading="eager"
              decoding="async"
            />
          </div>
        )}

        {/* Main Container */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 xs:px-6 xs:py-10 sm:px-6 sm:py-12 md:px-8 md:py-14 lg:px-8 lg:py-16 xl:px-12 xl:py-20">
          <div className="grid grid-cols-1 gap-8 xs:gap-10 sm:gap-12 md:grid-cols-2 md:gap-14 lg:grid-cols-12 lg:gap-16 xl:gap-20 items-center">

            {/* Text Content Column */}
            <div className="md:col-span-1 lg:col-span-6 flex justify-center md:justify-start lg:justify-start">
              <div className="w-full max-w-sm xs:max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">

                {/* Main Heading */}
                <h1 id="hero-heading" className="text-3xl xs:text-4xl sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl font-serif text-gray-900 tracking-[-0.04em] xs:tracking-[-0.05em] sm:tracking-[-0.06em] md:tracking-[-0.07em] lg:tracking-[-0.08em] xl:tracking-tight leading-tight xs:leading-tight sm:leading-tight md:leading-tight lg:leading-tight xl:leading-tight">
                  The last time you will ever<br />update a CRM.
                </h1>

                {/* Description */}
                <p className="mt-6 xs:mt-7 sm:mt-8 md:mt-6 lg:mt-8 xl:mt-9 font-sans font-medium text-base xs:text-lg sm:text-xl md:text-lg lg:text-xl xl:text-[18px] text-gray-900 tracking-[-0.01em] xs:tracking-[-0.015em] sm:tracking-[-0.02em] md:tracking-[-0.025em] lg:tracking-[-0.03em] xl:tracking-[-0.72px] leading-relaxed xs:leading-relaxed sm:leading-relaxed md:leading-relaxed lg:leading-relaxed xl:leading-[24px] max-w-full xs:max-w-md sm:max-w-lg md:max-w-full lg:max-w-lg xl:max-w-lg">
                  Get a perfectly accurate, up-to-the-second source of truth without the busywork. Free your team to focus on customers, not data entry.
                </p>

                {/* Email Form */}
                <div className="mt-6 xs:mt-7 sm:mt-8 md:mt-6 lg:mt-7 xl:mt-8">
                  <form onSubmit={handleSubmit} className="flex flex-col xs:flex-row gap-3 xs:gap-2 sm:gap-3 md:gap-2 lg:gap-3 max-w-full xs:max-w-sm sm:max-w-md md:max-w-full lg:max-w-md">
                    <div className="flex-1 w-full">
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-10 xs:h-11 sm:h-12 md:h-10 lg:h-11 xl:h-10 px-3 xs:px-4 sm:px-4 md:px-3 lg:px-4 xl:px-3 text-sm xs:text-base sm:text-lg md:text-base lg:text-base xl:text-base bg-white border-gray-300 focus:border-gray-900 focus:ring-gray-900 focus:ring-2 focus:ring-offset-2 w-full transition-colors"
                        required
                        aria-label="Email address for waitlist signup"
                        autoComplete="email"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="bg-gray-900 text-white h-10 xs:h-11 sm:h-12 md:h-10 lg:h-11 xl:h-10 px-4 xs:px-5 sm:px-6 md:px-4 lg:px-5 xl:px-4 text-sm xs:text-base sm:text-lg md:text-base lg:text-base xl:text-base font-medium whitespace-nowrap hover:bg-gray-800 focus:bg-gray-800 focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={!email.trim()}
                      aria-label="Join the waitlist"
                    >
                      Join
                    </Button>
                  </form>
                  <p className="mt-2 text-sm text-gray-500">
                    Join the waitlist
                  </p>
                </div>
              </div>
            </div>

            {/* Hero Image Column */}
            {heroImageUrl && (
              <div className="md:col-span-1 lg:col-span-6 flex justify-center md:justify-end lg:justify-end">
                <div className="aspect-square w-full max-w-xs xs:max-w-sm sm:max-w-md md:max-w-sm lg:max-w-md xl:max-w-lg">
                  <img
                    src={heroImageUrl}
                    alt="Etheca automation platform interface showing data synchronization"
                    className="w-full h-full object-cover rounded-lg"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }
)

HeroSection.displayName = "HeroSection"

export { HeroSection }
export type { HeroSectionProps }