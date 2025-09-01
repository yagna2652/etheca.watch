export type SiteConfig = {
  name: string
  author: string
  description: string
  keywords: Array<string>
  url: {
    base: string
    author: string
  }
  links: {
    github: string
  }
  ogImage: string
}

export const siteConfig: SiteConfig = {
  name: "Etheca",
  author: "Etheca",
  description: "The End of Manual Data Entry. We observe how you work and update your system of records accordingly. Focus on your work, not data entry.",
  keywords: [
    "automation", 
    "data entry", 
    "AI", 
    "workflow automation", 
    "productivity",
    "business automation",
    "intelligent automation"
  ],
  url: {
    base: "https://etheca.watch",
    author: "https://etheca.watch",
  },
  links: {
    github: "https://github.com/etheca",
  },
  ogImage: "/og.jpg",
}