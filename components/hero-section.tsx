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
        {...props}
      >
        {/* Background Image Container */}
        {backgroundImageUrl && (
          <div className="absolute inset-0 overflow-hidden">
            <img
              alt=""
              className="w-full h-full object-cover"
              src={backgroundImageUrl}
            />
          </div>
        )}

        {/* Main Container */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-center">

            {/* Text Content Column */}
            <div className="lg:col-span-6">
              <div className="max-w-2xl">

                {/* Main Heading */}
                <h1 className="text-4xl font-serif text-gray-900 tracking-tight lg:text-6xl lg:leading-tight">
                  The last time you will ever<br />update a CRM.
                </h1>

                {/* Description */}
                <p className="mt-9 font-sans font-normal text-[18px] text-[#bcb9b9] tracking-[-0.72px] leading-[24
                px] max-w-lg">
                  Get a perfectly accurate, up-to-the-second source of truth without the busywork. Free your team to focus on customers, not data entry.
                </p>

                {/* Email Form */}
                <div className="mt-8">
                  <form onSubmit={handleSubmit} className="flex gap-2 max-w-md">
                    <div className="flex-1">
                      <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-10 px-3 text-base bg-white border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="h-10 px-4 bg-gray-900 text-white hover:bg-gray-800 transition-colors"
                      disabled={!email.trim()}
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
              <div className="lg:col-span-6">
                <div className="aspect-square w-full max-w-lg mx-auto lg:max-w-none">
                  <div
                    className="w-full h-full bg-center bg-cover bg-no-repeat rounded-lg"
                    style={{ backgroundImage: `url('${heroImageUrl}')` }}
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