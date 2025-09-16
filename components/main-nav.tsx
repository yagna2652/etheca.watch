"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { siteConfig } from "../config/site"
import { cn } from "../lib/utils"
import { Icons } from "./icons"
import { Button } from "./ui/button"
import { MainNavItem } from "../types"

interface MainNavProps {
  items?: MainNavItem[]
}

export function MainNav({ items }: MainNavProps) {
  const pathname = usePathname()

  return (
    <header className="w-full border-b border-[#eeeff2] bg-white sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 xs:px-6 sm:px-6 md:px-8 lg:px-8 xl:px-12">
        <div className="flex h-16 xs:h-18 sm:h-20 md:h-20 lg:h-20 xl:h-20 items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 xs:gap-1.5 sm:gap-1 md:gap-1 lg:gap-1 xl:gap-1 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 rounded-sm" aria-label="Etheca - Go to homepage">
            <div className="h-8 w-8 xs:h-9 xs:w-9 sm:h-10 sm:w-10 md:h-10 md:w-10 lg:h-10 lg:w-10 xl:h-10 xl:w-10 bg-center bg-cover bg-no-repeat">
              <Icons.logo className="h-8 w-8 xs:h-9 xs:w-9 sm:h-10 sm:w-10 md:h-10 md:w-10 lg:h-10 lg:w-10 xl:h-10 xl:w-10" />
            </div>
            <span className="font-serif text-2xl xs:text-3xl sm:text-[32px] md:text-[32px] lg:text-[32px] xl:text-[32px] leading-tight xs:leading-tight sm:leading-4 md:leading-4 lg:leading-4 xl:leading-4 tracking-[-1.2px] xs:tracking-[-1.4px] sm:tracking-[-1.6px] md:tracking-[-1.6px] lg:tracking-[-1.6px] xl:tracking-[-1.6px] text-[#27353b]">
              etheca
            </span>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-4 xs:gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-12">

            {/* Blog Link */}
            <Link
              href="/blog"
              className={cn(
                "font-medium text-sm xs:text-base sm:text-[16px] md:text-[16px] lg:text-[16px] xl:text-[16px] tracking-[-0.02px] xs:tracking-[-0.03px] sm:tracking-[-0.04px] md:tracking-[-0.04px] lg:tracking-[-0.04px] xl:tracking-[-0.04px] text-[#141413] leading-tight xs:leading-snug sm:leading-[22.4px] md:leading-[22.4px] lg:leading-[22.4px] xl:leading-[22.4px] hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 rounded-sm transition-opacity",
                pathname === "/blog" && "underline decoration-solid [text-underline-position:from-font]"
              )}
            >
              Blog
            </Link>

            {/* Get a custom solution Button */}
            <Button
              asChild
              className="h-10 xs:h-11 sm:h-12 md:h-12 lg:h-12 xl:h-12 rounded-[8px] xs:rounded-[10px] sm:rounded-[12px] md:rounded-[12px] lg:rounded-[12px] xl:rounded-[12px] bg-[#141413] px-3 xs:px-4 sm:px-6 md:px-7 lg:px-8 xl:px-8 py-2 xs:py-3 sm:py-4 md:py-4 lg:py-4 xl:py-4 text-xs xs:text-sm sm:text-[16px] md:text-[16px] lg:text-[16px] xl:text-[16px] font-medium leading-tight xs:leading-tight sm:leading-4 md:leading-4 lg:leading-4 xl:leading-4 tracking-[-0.04px] xs:tracking-[-0.06px] sm:tracking-[-0.08px] md:tracking-[-0.08px] lg:tracking-[-0.08px] xl:tracking-[-0.08px] text-[#faf9f5] hover:bg-[#2a2a2a] border-[#141413] whitespace-nowrap"
            >
              <Link href="mailto:hello@etheca.watch">
                <span className="hidden xs:inline sm:inline md:inline lg:inline xl:inline">Get a custom solution</span>
                <span className="xs:hidden sm:hidden md:hidden lg:hidden xl:hidden">Contact</span>
              </Link>
            </Button>

          </div>
        </div>
      </div>
    </header>
  )
}