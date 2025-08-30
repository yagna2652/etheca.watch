import React from 'react';
import FeaturedPost from '../components/FeaturedPost';
import MasonryGrid from '../components/MasonryGrid';

interface BlogPost {
  id: string;
  title: string;
  description: string;
  image?: string;
  date: string;
  category: string;
}

const BlogPage: React.FC = () => {
  const dummyPosts: BlogPost[] = [
    {
      id: '1',
      title: 'The Future of AI in Web Development',
      description: 'Artificial intelligence is transforming how we build web applications. From automated code generation to intelligent testing, AI tools are becoming essential for modern developers.',
      image: 'https://via.placeholder.com/350x200/4F46E5/FFFFFF?text=AI+Web+Dev',
      date: 'March 15, 2024',
      category: 'ai'
    },
    {
      id: '2',
      title: 'Mastering React Hooks',
      description: 'A comprehensive guide to React Hooks and how they can simplify your component logic.',
      image: 'https://via.placeholder.com/350x200/EF4444/FFFFFF?text=React+Hooks',
      date: 'March 12, 2024',
      category: 'dev'
    },
    {
      id: '3',
      title: 'Design Systems That Scale',
      description: 'Building design systems that can grow with your organization requires careful planning, consistent documentation, and a deep understanding of your users\' needs. This article explores the key principles and best practices for creating scalable design systems that stand the test of time.',
      image: 'https://via.placeholder.com/350x200/10B981/FFFFFF?text=Design+Systems',
      date: 'March 10, 2024',
      category: 'design'
    },
    {
      id: '4',
      title: 'Machine Learning for Beginners',
      description: 'Start your journey into machine learning with practical examples and real-world applications. We\'ll cover the fundamentals and show you how to build your first ML model.',
      image: 'https://via.placeholder.com/350x200/F59E0B/FFFFFF?text=ML+Basics',
      date: 'March 8, 2024',
      category: 'ai'
    },
    {
      id: '5',
      title: 'TypeScript Best Practices',
      description: 'Learn advanced TypeScript patterns and techniques.',
      image: 'https://via.placeholder.com/350x200/8B5CF6/FFFFFF?text=TypeScript',
      date: 'March 5, 2024',
      category: 'dev'
    },
    {
      id: '6',
      title: 'Color Theory in Digital Design',
      description: 'Understanding color psychology, accessibility considerations, and how to create harmonious color palettes that enhance user experience. This deep dive into color theory will help you make better design decisions and create more engaging interfaces.',
      image: 'https://via.placeholder.com/350x200/EC4899/FFFFFF?text=Color+Theory',
      date: 'March 3, 2024',
      category: 'design'
    },
    {
      id: '7',
      title: 'Building Scalable APIs',
      description: 'Design patterns and architectural decisions for APIs that can handle millions of requests.',
      image: 'https://via.placeholder.com/350x200/06B6D4/FFFFFF?text=Scalable+APIs',
      date: 'March 1, 2024',
      category: 'dev'
    },
    {
      id: '8',
      title: 'Ethics in AI Development',
      description: 'As AI becomes more prevalent in our daily lives, it\'s crucial to consider the ethical implications of the systems we build. This article examines bias, fairness, and responsible AI development practices.',
      image: 'https://via.placeholder.com/350x200/DC2626/FFFFFF?text=AI+Ethics',
      date: 'February 28, 2024',
      category: 'ai'
    }
  ];

  return (
    <div 
      className="blog-page-container"
      style={{
        minHeight: '100vh',
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '32px 24px',
        fontSize: '16px',
        lineHeight: '1.5',
        transform: 'scale(1)',
        zoom: '1',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        background: 'white'
      }}
    >
      <FeaturedPost />
      <MasonryGrid posts={dummyPosts} />
    </div>
  );
};

export default BlogPage;