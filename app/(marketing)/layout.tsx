import { marketingConfig } from "../../config/marketing"
import { MainNav } from "../../components/main-nav"
import { SiteFooter } from "../../components/site-footer"

interface MarketingLayoutProps {
  children: React.ReactNode
}

export const metadata = {
  title: "Etheca - The End of Manual Data Entry",
  description: "We just observe how you work and then update your system of records accordingly. Focus on your work, not data entry.",
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="sticky top-0 w-full z-40">
        <MainNav items={marketingConfig.mainNav} />
      </div>
      <main className="flex-1 relative">
        <div className="w-full">
          {children}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}