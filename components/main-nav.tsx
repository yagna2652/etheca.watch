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
    <>
      {/* Logo - will be positioned on the left */}
      <Link href="/" className="flex items-center space-x-1">
        <Icons.logo className="h-10 w-10" />
        <span className="inline-block text-3xl -tracking-wider font-medium">{siteConfig.name}</span>
      </Link>
      
      {/* Navigation items and Contact Us - will be positioned on the right */}
      <div className="flex items-center gap-6">
        {/* Desktop Navigation */}
        {items?.length ? (
          <nav className="hidden gap-6 md:flex">
            {items?.map(
              (item, index) =>
                item.href && (
                  <Link
                    key={index}
                    href={item.href}
                    className={cn(
                      "flex items-center text-sm font-medium text-muted-foreground",
                      item.disabled && "cursor-not-allowed opacity-80",
                      pathname === item.href && "text-foreground"
                    )}
                  >
                    {item.title}
                  </Link>
                )
            )}
          </nav>
        ) : null}

        {/* Mobile Navigation */}
        {items?.length ? (
          <nav className="md:hidden">
            {items?.map(
              (item, index) =>
                item.href && (
                  <Link
                    key={index}
                    href={item.href}
                    className={cn(
                      "flex items-center text-sm font-medium text-muted-foreground mr-4",
                      item.disabled && "cursor-not-allowed opacity-80",
                      pathname === item.href && "text-foreground"
                    )}
                  >
                    {item.title}
                  </Link>
                )
            )}
          </nav>
        ) : null}

        <Button asChild variant="default" className="hidden sm:inline-flex">
          <Link href="mailto:hello@etheca.watch">
            Get a custom solution
          </Link>
        </Button>
        
        {/* Mobile Contact Button */}
        <Button asChild variant="default" size="sm" className="sm:hidden">
          <Link href="mailto:hello@etheca.watch">
            Contact
          </Link>
        </Button>
      </div>
    </>
  )
}