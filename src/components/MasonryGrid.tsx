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

  // Extract unique categories from posts, with fallback categories
  const extractedCategories = Array.from(new Set(posts.map(post => post.category))).filter(Boolean);
  const categories = extractedCategories.length > 1 
    ? ['all', ...extractedCategories]
    : ['all', 'general'];
  const cardWidth = 350;
  const gap = 20;
  const staticColumnCount = 3; // Fixed column count
  const fixedGridWidth = staticColumnCount * cardWidth + (staticColumnCount - 1) * gap; // 1090px

  // Call layout hook with static column count
  useMasonryLayout(gridRef, filteredPosts, cardWidth, gap, staticColumnCount);

  return (
    <div 
      style={{ 
        width: `${fixedGridWidth}px`,
        margin: '0 auto',
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
        {/* Render the vertical lines FIRST */}
        {Array.from({ length: staticColumnCount - 1 }).map((_, index) => (
          <div
            key={`line-${index}`}
            className="vertical-grid-line"
            style={{
              position: 'absolute',
              left: `${(index + 1) * (cardWidth + gap) - gap / 2}px`,
              top: 0,
              width: '1px',
              height: '100%',
              backgroundColor: '#e5e7eb', // gray-200
              zIndex: 1
            }}
          />
        ))}

        {/* Then render the posts */}
        {filteredPosts.map(post => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default MasonryGrid;