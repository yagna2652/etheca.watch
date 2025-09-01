import React, { useState, useMemo } from 'react';
import FeaturedPost from '../components/FeaturedPost';
import BlogGrid from '../components/BlogGrid';
import CategoryFilter from '../components/CategoryFilter';
import { ContentSummary, getAllCategories } from '../../lib/contentService';
import { formatDate } from '../../lib/utils';

interface BlogPost {
  id: string;
  title: string;
  description: string;
  image?: string;
  date: string;
  category: string;
  author?: string;
  tags?: string[];
}

interface BlogPageProps {
  posts: ContentSummary[];
}

const BlogPage: React.FC<BlogPageProps> = ({ posts }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  // Convert ContentSummary to BlogPost format
  const blogPosts: BlogPost[] = posts.map(post => ({
    id: post.id,
    title: post.title,
    description: post.description || '',
    image: post.thumbnail,
    date: post.date,
    category: post.category || 'general',
    author: post.author,
    tags: post.tags || []
  }));

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(blogPosts.map(post => post.category)));
    return uniqueCategories.sort();
  }, [blogPosts]);

  // Filter posts by category
  const filteredPosts = useMemo(() => {
    if (activeCategory === 'all') return blogPosts;
    return blogPosts.filter(post => post.category === activeCategory);
  }, [blogPosts, activeCategory]);

  // Get featured post (most recent from filtered posts)
  const featuredPost = filteredPosts[0];
  const gridPosts = filteredPosts.length > 1 ? filteredPosts.slice(1) : [];

  return (
    <div className="w-full min-h-screen" style={{ background: 'var(--color-surface-gray)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Blog Header Section */}
        <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8 mb-8">
          <div className="flex-1 space-y-4">
            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl text-gray-900">
              Blog
            </h1>
            <p className="text-xl text-gray-600">
              Discover insights, tutorials, and updates from our team.
            </p>
          </div>
        </div>
      
        <hr className="my-8 border-gray-200" />
        
        {/* Category Filter */}
        <CategoryFilter 
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        
        {/* Featured Post */}
        {featuredPost && <FeaturedPost post={featuredPost} />}
        
        {/* Blog Grid */}
        <BlogGrid posts={gridPosts} />
      </div>
    </div>
  );
};

export default BlogPage;