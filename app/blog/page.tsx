import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import { Metadata } from "next";

// Import existing components to maintain the design system
import { MainNav } from "../../components/main-nav";
import { SiteFooter } from "../../components/site-footer";
import BlogEntry from "../../src/components/BlogEntry";

export const metadata: Metadata = {
  title: "Blog - Etheca.Watch",
  description: "Latest insights and updates from Etheca.Watch on AI automation and workflow optimization."
};


export default function BlogPage() {
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <MainNav />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative">
        <div className="max-w-7xl mx-auto min-h-screen">
          <div className="max-w-4xl mx-auto border-l border-r py-16">
            <div className="space-y-12">
              <div className="space-y-4 px-6">
                <h1 className="text-4xl font-bold tracking-tight">Blog</h1>
                <p className="text-lg text-muted-foreground">
                  Latest insights and updates from Etheca.Watch on AI automation and workflow optimization.
                </p>
              </div>
              
              <div className="space-y-12">
                {posts.map((post) => (
                  <BlogEntry 
                    key={post._id}
                    id={post.slugAsParams}
                    title={post.title}
                    date={post.date}
                    author={post.authors[0]}
                    description={post.description || ""}
                    thumbnail={post.image}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}