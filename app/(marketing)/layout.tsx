import Link from "next/link"

import { marketingConfig } from "@/config/marketing"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="w-full z-40 bg-background border-b">
        <div className="flex h-20 items-center justify-between py-6 px-9">
          <MainNav items={marketingConfig.mainNav} />
        </div>
      </header>
      <main className="flex-1 relative">
        {children}
      </main>
      <SiteFooter />
    </div>
  )
}