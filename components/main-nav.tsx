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
    <header className="w-full border-b border-[#eeeff2] bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-1">
            <div className="h-10 w-10 bg-center bg-cover bg-no-repeat">
              <Icons.logo className="h-10 w-10" />
            </div>
            <span className="font-serif text-[32px] leading-4 tracking-[-1.6px] text-[#27353b]">
              etheca
            </span>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-12">

            {/* Blog Link */}
            <Link
              href="/blog"
              className={cn(
                "font-medium text-[16px] tracking-[-0.04px] text-[#141413] leading-[22.4px]",
                pathname === "/blog" && "underline decoration-solid [text-underline-position:from-font]"
              )}
            >
              Blog
            </Link>

            {/* Get a custom solution Button */}
            <Button
              asChild
              className="h-12 rounded-[12px] bg-[#141413] px-8 py-4 text-[16px] font-medium leading-4 tracking-[-0.08px] text-[#faf9f5] hover:bg-[#2a2a2a] border-[#141413]"
            >
              <Link href="mailto:hello@etheca.watch">
                Get a custom solution
              </Link>
            </Button>

          </div>
        </div>
      </div>
    </header>
  )
}