import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
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

interface BlogGridProps {
  posts: BlogPost[];
}

const BlogGrid: React.FC<BlogGridProps> = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return (
      <div className="py-8">
        <p className="text-center text-gray-500">No posts available.</p>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <div className="grid gap-6 sm:gap-8 lg:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <article
            key={post.id}
            className="group relative flex flex-col space-y-3 w-full p-4 sm:p-6 rounded-lg border transition-colors duration-200"
            style={{ backgroundColor: '#ffffff', borderColor: 'rgba(130, 130, 148, 0.3)' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(244, 244, 246, 0.5)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
          >
            {post.image && (
              <div className="w-full aspect-video overflow-hidden rounded-lg border" style={{ backgroundColor: 'var(--color-surface-dark-gray)', borderColor: 'rgba(130, 130, 148, 0.2)' }}>
                <Image
                  src={post.image}
                  alt={post.title}
                  width={600}
                  height={338}
                  className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                  priority={index <= 2}
                />
              </div>
            )}
            <div className="flex-1 space-y-4 w-full">
              <h2 className="text-xl sm:text-2xl font-bold leading-tight text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                {post.title}
              </h2>
              {post.description && (
                <p className="text-gray-600 line-clamp-3 leading-relaxed">
                  {post.description}
                </p>
              )}
              <div className="flex items-center justify-between pt-2">
                <div className="flex flex-col">
                  <p className="text-sm text-gray-500">
                    {formatDate(post.date)}
                  </p>
                  {post.author && (
                    <p className="text-xs text-gray-400 mt-1">
                      by {post.author}
                    </p>
                  )}
                </div>
                <span className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full uppercase tracking-wider font-medium">
                  {post.category}
                </span>
              </div>
            </div>
            <Link href={`/blog/${post.id}`} className="absolute inset-0">
              <span className="sr-only">Read {post.title}</span>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
};

export default BlogGrid;