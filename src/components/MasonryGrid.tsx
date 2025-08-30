import React, { useState, useRef } from 'react';
import BlogCard from './BlogCard';
import useMasonryLayout from '../hooks/useMasonryLayout';

interface BlogPost {
  id: string;
  title: string;
  description: string;
  image?: string;
  date: string;
  category: string;
}

interface MasonryGridProps {
  posts: BlogPost[];
}

const MasonryGrid: React.FC<MasonryGridProps> = ({ posts }) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredPosts = posts.filter(post => 
    activeFilter === 'all' || post.category === activeFilter
  );

  const columnCount = useMasonryLayout(gridRef, filteredPosts, 350, 20);

  const categories = ['all', 'ai', 'dev', 'design'];

  return (
    <div 
      className="w-full"
      style={{ 
        fontSize: '16px',
        transform: 'scale(1)',
        zoom: '1'
      }}
    >
      <div className="mb-8">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveFilter(category)}
            className={`mr-4 px-6 py-3 rounded-lg font-medium transition-colors ${
              activeFilter === category
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            style={{ 
              fontSize: '1rem',
              minHeight: '44px'
            }}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
      
      <div
        ref={gridRef}
        className="relative w-full"
        style={{ minHeight: '400px' }}
      >
        {filteredPosts.map(post => (
          <BlogCard key={post.id} post={post} />
        ))}
        
        {Array.from({ length: Math.max(0, columnCount - 1) }).map((_, index) => (
          <div
            key={`vertical-line-${index}`}
            className="absolute top-0 w-px bg-gray-200 h-full"
            style={{
              left: `${(350 + 20) * (index + 1) - (20 / 2)}px`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default MasonryGrid;