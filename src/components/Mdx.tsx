import { allPosts } from "contentlayer/generated";

interface MdxProps {
  code: string
}

export function Mdx({ code }: MdxProps) {
  if (!code) {
    return <div>No content available</div>
  }
  
  // For now, let's just display the raw markdown content from the file
  // This is a temporary solution until we can properly fix the MDX rendering
  
  // Extract the content from the current post by finding it in allPosts
  // This is a workaround to get the raw content
  const currentPost = allPosts.find(post => post.body.code === code);
  
  if (currentPost && currentPost.body.raw) {
    // Remove the frontmatter and display the markdown content
    const content = currentPost.body.raw.replace(/^---[\s\S]*?---\n/, '');
    
    // Convert basic markdown to HTML for display
    const htmlContent = content
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
    
    return (
      <div className="mdx" dangerouslySetInnerHTML={{ __html: htmlContent }} />
    );
  }
  
  return (
    <div className="mdx">
      <div className="prose prose-lg max-w-none">
        <p>Content is being processed...</p>
      </div>
    </div>
  )
}