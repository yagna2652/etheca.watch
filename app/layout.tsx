import { Inter } from "next/font/google"
import localFont from "next/font/local"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Analytics } from "@/components/analytics"
import { ThemeProvider } from "@/components/theme-provider"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { Toaster } from "@/components/ui/toaster"

import "@/src/index.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const covikSans = localFont({
  src: [
    {
      path: "../public/assets/fonnts.com-Covik_Sans.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/assets/fonnts.com-Covik_Sans_Italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/assets/fonnts.com-Covik_Sans_Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/assets/fonnts.com-Covik_Sans_Semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/assets/fonnts.com-Covik_Sans_Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/assets/fonnts.com-Covik_Sans_Black.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-covik-sans",
})

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            covikSans.variable,
            inter.variable
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            <div className="relative flex min-h-screen flex-col">
              <div className="flex-1">{children}</div>
            </div>
            <TailwindIndicator />
            <Analytics />
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: siteConfig.author,
      url: siteConfig.url.author,
    },
  ],
  creator: siteConfig.author,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url.base,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@etheca",
  },
  icons: {
    icon: "/favicon/favicon.ico",
    shortcut: "/favicon/favicon-16x16.png",
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: "/favicon/site.webmanifest",
}