import Link from "next/link"
import { formatDate } from "@/lib/utils"

interface BlogEntryProps {
  id: string
  title: string
  date: string
  author: {
    name: string
    avatar?: string
  }
  description: string
  thumbnail?: string
}

export default function BlogEntry({
  id,
  title,
  date,
  author,
  description,
  thumbnail
}: BlogEntryProps) {
  return (
    <article className="border-b border-border pb-8 px-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">
            <Link
              href={`/blog/${id}`}
              className="hover:underline"
            >
              {title}
            </Link>
          </h2>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>{author.name}</span>
            <span>•</span>
            <time dateTime={date}>{formatDate(date)}</time>
          </div>
        </div>

        {description && (
          <p className="text-muted-foreground leading-relaxed">
            {description}
          </p>
        )}

        <div className="pt-2">
          <Link
            href={`/blog/${id}`}
            className="text-sm font-medium text-primary hover:underline"
          >
            Read more →
          </Link>
        </div>
      </div>
    </article>
  )
}