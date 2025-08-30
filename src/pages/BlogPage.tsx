import React from 'react';
import FeaturedPost from '../components/FeaturedPost';
import MasonryGrid from '../components/MasonryGrid';
import { ContentSummary } from '../../lib/contentService';

interface BlogPost {
  id: string;
  title: string;
  description: string;
  image?: string;
  date: string;
  category: string;
}

interface BlogPageProps {
  posts: ContentSummary[];
}

const BlogPage: React.FC<BlogPageProps> = ({ posts }) => {
  // Convert ContentSummary to BlogPost format
  const blogPosts: BlogPost[] = posts.map(post => ({
    id: post.id,
    title: post.title,
    description: post.description || '',
    image: post.thumbnail,
    date: post.date,
    category: 'general' // Default category, can be enhanced later
  }));

  // Get featured post (most recent one)
  const featuredPost = blogPosts[0];
  const gridPosts = blogPosts.length > 1 ? blogPosts.slice(1) : [];

  return (
    <div 
      className="blog-page-container"
      style={{
        minHeight: '100vh',
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '32px 0',
        fontSize: '16px',
        lineHeight: '1.5',
        transform: 'scale(1)',
        zoom: '1',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        // Removed background: 'white' to inherit parent background
      }}
    >
      <FeaturedPost post={featuredPost} />
      <MasonryGrid posts={gridPosts} />
    </div>
  );
};

export default BlogPage;