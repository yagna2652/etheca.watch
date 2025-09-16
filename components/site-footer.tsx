"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SiteFooter() {
  const [email, setEmail] = React.useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      // Handle email submission
      console.log('Footer email submitted:', email)
    }
  }

  return (
    <footer className="bg-[#2c2c2c] text-white">
      <div className="mx-auto max-w-7xl px-4 xs:px-6 sm:px-6 md:px-8 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-20 items-center py-16 xs:py-20 sm:py-24 md:py-28 lg:py-32 xl:py-40">

          {/* Left Column - Heading */}
          <div className="order-1 lg:order-1 text-left md:text-center">
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-4xl lg:text-5xl xl:text-5xl font-serif text-white leading-tight xs:leading-tight sm:leading-tight md:leading-tight lg:leading-tight xl:leading-tight tracking-[-0.04em] xs:tracking-[-0.05em] sm:tracking-[-0.06em] md:tracking-[-0.07em] lg:tracking-[-0.08em] xl:tracking-tight">
              Breakthroughs are born from the freedom to explore, not from busywork.
            </h2>
          </div>

          {/* Right Column - Description and Email Form */}
          <div className="order-2 lg:order-2 flex flex-col gap-6 xs:gap-7 sm:gap-8 md:gap-6 lg:gap-7 xl:gap-8 text-left md:text-center">

            {/* Description */}
            <p className="text-base xs:text-lg sm:text-xl md:text-lg lg:text-xl xl:text-[16px] font-sans font-medium text-white/90 leading-relaxed xs:leading-relaxed sm:leading-relaxed md:leading-relaxed lg:leading-relaxed xl:leading-[22px] tracking-[-0.01em] xs:tracking-[-0.015em] sm:tracking-[-0.02em] md:tracking-[-0.025em] lg:tracking-[-0.03em] xl:tracking-[-0.72px]">
              Etheca ends manual updates across your work tools, ensuring your entire system of records is always in sync.
            </p>

            {/* Email Form */}
            <div className="flex flex-col gap-3">
              <form onSubmit={handleSubmit} className="flex flex-col xs:flex-row gap-3 xs:gap-2 sm:gap-3">
                <div className="flex-1">
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 xs:h-12 sm:h-12 md:h-11 lg:h-12 xl:h-12 px-4 text-base bg-white border-0 focus:ring-2 focus:ring-white/20 text-gray-900 placeholder:text-gray-500"
                    required
                    aria-label="Email address for waitlist signup"
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-[#4f46e5] hover:bg-[#4338ca] text-white h-11 xs:h-12 sm:h-12 md:h-11 lg:h-12 xl:h-12 px-6 text-base font-medium whitespace-nowrap border-0 focus:ring-2 focus:ring-white/20"
                  disabled={!email.trim()}
                >
                  Join
                </Button>
              </form>

              {/* "Join the waitlist" text */}
              <p className="text-sm text-white/70">
                Join the waitlist
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}