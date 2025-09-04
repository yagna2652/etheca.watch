"use client"

import Link from "next/link"

import { HoverBorderGradient } from "./ui/hover-border-gradient"

export function SiteFooter() {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto border-l border-r border-background/20 py-16 px-6">
          <div className="flex flex-col items-center justify-center space-y-8 text-center">
            <h2 className="font-heading text-2xl md:text-3xl font-medium tracking-tighter leading-tight max-w-4xl">
              Breakthroughs are born from the freedom to explore, not from busywork.
            </h2>
            
            <HoverBorderGradient
              as="button"
              onClick={() => window.open('mailto:hello@etheca.watch', '_blank')}
              className="bg-background text-foreground flex items-center justify-center"
              containerClassName="rounded-lg"
              style={{
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: '500',
              }}
            >
              Enter the Waitlist
            </HoverBorderGradient>
            
            <div className="flex flex-col items-center space-y-2 text-sm text-background/80">
              <p>© 2025 Etheca</p>
              <p>
                Art by{" "}
                <Link 
                  href="https://danallison.info/drawings/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="underline hover:text-background transition-colors"
                >
                  Dan Allison
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}