import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '../../lib/utils';
import { CustomSeparator } from '@/components/ui/custom-separator';

interface BlogPost {
  id: string;
  title: string;
  description: string;
  image?: string;
  date: string;
  category: string;
  author?: string;
}

interface FeaturedPostProps {
  post?: BlogPost;
}

const FeaturedPost: React.FC<FeaturedPostProps> = ({ post }) => {
  // Default fallback content if no post provided
  if (!post) {
    return (
      <article className="w-full flex flex-col items-center justify-center p-8 sm:p-12 rounded-lg border mb-12" style={{ backgroundColor: '#ffffff', borderColor: 'rgba(130, 130, 148, 0.3)' }}>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-6">
          Welcome to Our Blog
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 text-center max-w-3xl">
          Discover insights, tutorials, and updates from our team.
        </p>
      </article>
    );
  }

  return (
    <Link href={`/blog/${post.id}`} className="block mb-12">
      <article className="w-full cursor-pointer overflow-hidden flex flex-col lg:flex-row items-center gap-6 sm:gap-8 p-6 sm:p-8 rounded-lg border transition-colors duration-200" style={{ backgroundColor: '#ffffff', borderColor: 'rgba(130, 130, 148, 0.3)' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(244, 244, 246, 0.5)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}>
        {/* Image Section */}
        {post.image && (
          <div className="w-full lg:w-1/2">
            <div className="aspect-video">
              <Image
                src={post.image}
                alt={post.title}
                width={600}
                height={338}
                className="w-full h-full object-cover rounded-lg"
                priority
              />
            </div>
          </div>
        )}
        
        {/* Vertical Separator - Hidden on mobile */}
        <div className="hidden lg:block">
          <CustomSeparator orientation="vertical" />
        </div>
        
        {/* Content Section */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-3 sm:space-y-4">
          <p className="text-sm text-gray-500 uppercase tracking-wider font-medium">
            {formatDate(post.date)}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            {post.title}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            {post.description}
          </p>
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center space-x-4">
              {post.author && (
                <p className="text-sm text-gray-500">
                  by <span className="font-medium">{post.author}</span>
                </p>
              )}
              <span className="text-xs px-3 py-1 bg-blue-50 text-blue-600 rounded-full uppercase tracking-wider font-medium">
                {post.category}
              </span>
            </div>
            <div className="flex items-center text-blue-600 font-medium">
              Read more →
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default FeaturedPost;