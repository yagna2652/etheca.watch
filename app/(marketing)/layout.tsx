// Marketing layout - no header/footer for clean landing pages

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
  // Simple passthrough - just render children without header/footer
  return <>{children}</>
}