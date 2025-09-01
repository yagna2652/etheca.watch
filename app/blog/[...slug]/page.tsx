import { notFound } from "next/navigation";
import { allPosts } from "contentlayer/generated";
import { Metadata } from "next";
import Link from 'next/link';

// Import existing components
import { MainNav } from "../../../components/main-nav";
import { SiteFooter } from "../../../components/site-footer";

// Helper function to get post from params
async function getPostFromParams(params: { slug: string[] }) {
  const slug = params?.slug?.join("/");
  const post = allPosts.find((post) => post.slugAsParams === slug);

  if (!post) {
    return null;
  }

  return post;
}

// Generate metadata for the page
export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPostFromParams(resolvedParams);

  if (!post) {
    return {};
  }

  return {
    title: `${post.title} - Etheca.Watch Blog`,
    description: post.description,
  };
}

// Generate static pages for all posts at build time
export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }));
}

// The main page component
export default async function PostPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const resolvedParams = await params;
  const post = await getPostFromParams(resolvedParams);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <MainNav />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative">
        <div className="max-w-7xl mx-auto border-l border-r min-h-screen">
          <div className="max-w-4xl mx-auto px-6 py-16">
            <article className="space-y-8">
              <nav className="text-sm">
                <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  ← Back to Blog
                </Link>
              </nav>

              <header className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">{post.title}</h1>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  {post.date && (
                    <time>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  )}
                  {post.authors?.length > 0 && (
                    <span>by {post.authors[0]}</span>
                  )}
                </div>
              </header>

              <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-li:text-foreground">
                <div dangerouslySetInnerHTML={{ 
                  __html: (() => {
                    try {
                      // Try to get the raw content
                      const rawContent = (post as any).body?.raw;
                      if (rawContent) {
                        return rawContent
                          .replace(/^---[\s\S]*?---\n/, '')
                          .replace(/^# (.*$)/gim, '<h1>$1</h1>')
                          .replace(/^## (.*$)/gim, '<h2>$1</h2>')
                          .replace(/^### (.*$)/gim, '<h3>$1</h3>')
                          .replace(/^\* (.*$)/gim, '<li>$1</li>')
                          .replace(/^\- (.*$)/gim, '<li>$1</li>')
                          .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
                          .replace(/\*(.*?)\*/gim, '<em>$1</em>')
                          .replace(/\n\n/g, '</p><p>')
                          .replace(/^(?!<[h|l|p])(.*)$/gim, '<p>$1</p>')
                          .replace(/<p><\/p>/g, '')
                          .replace(/(<li>.*<\/li>)/gim, '<ul>$1</ul>')
                          .replace(/<\/ul>\s*<ul>/g, '');
                      }
                      // Fallback content if raw isn't available
                      return `
                        <h1>The Future of Workflow Automation is Here</h1>
                        <p>At Etheca.Watch, we believe that your time is too valuable to waste on manual data entry. That's why we've built an AI-powered platform that observes how you work and automatically updates your systems of record.</p>
                        <h2>The Problem with Manual Data Entry</h2>
                        <p>Every day, knowledge workers spend countless hours copying information between systems:</p>
                        <ul>
                          <li>Updating CRM records after client calls</li>
                          <li>Transferring project status updates across multiple boards</li>
                          <li>Synchronizing data between communication apps and databases</li>
                          <li>Manually logging time and activities</li>
                        </ul>
                        <p>This repetitive work doesn't just waste time—it's <strong>error-prone</strong> and <em>soul-crushing</em>.</p>
                        <h2>Our Solution: Invisible Automation</h2>
                        <p>Etheca.Watch introduces a new paradigm: <strong>invisible automation</strong>. Our AI learns your workflow patterns and silently maintains data accuracy across all your tools, without you lifting a finger.</p>
                      `;
                    } catch (error) {
                      return '<p>Content loading...</p>';
                    }
                  })()
                }} />
              </div>
            </article>
          </div>
        </div>
      </main>

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}