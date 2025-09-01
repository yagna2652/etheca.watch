import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";

interface BlogEntryProps {
  id: string;
  title: string;
  date: string;
  author: string;
  description: string;
  thumbnail: string;
}

export default function BlogEntry({
  id,
  title,
  date,
  author,
  description,
  thumbnail,
}: BlogEntryProps) {
  return (
    <article className="border-b border-border pb-8 mb-8">
      <div className="px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Thumbnail Image */}
        <div className="md:col-span-1">
          <Link href={`/blog/${id}`}>
            <div className="relative aspect-video overflow-hidden rounded-lg hover:opacity-80 transition-opacity">
              <Image
                src={thumbnail}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </Link>
        </div>

        {/* Content */}
        <div className="md:col-span-2 space-y-4">
          <Link href={`/blog/${id}`}>
            <h2 className="text-2xl font-bold hover:text-muted-foreground transition-colors">
              {title}
            </h2>
          </Link>
          
          <div className="text-sm text-muted-foreground">
            {format(new Date(date), "PPP")} • {author}
          </div>
          
          <p className="text-muted-foreground leading-relaxed">
            {description}
          </p>
          
          <Link 
            href={`/blog/${id}`}
            className="inline-flex items-center text-sm font-medium hover:underline"
          >
            Read more →
          </Link>
        </div>
        </div>
      </div>
    </article>
  );
}