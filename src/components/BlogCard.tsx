import React from 'react';
import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  description: string;
  image?: string;
  date: string;
  category: string;
}

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  // Format date nicely
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Link href={`/blog/${post.id}`} className="block">
      <article 
        className="absolute border border-gray-200 transition-all duration-[0.4s] ease-[ease] bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg cursor-pointer"
        style={{ 
          width: '350px',
          height: 'auto',
          fontSize: '16px',
          zoom: '1',
          zIndex: 10,
          top: '0px', // Default position
          left: '0px' // Default position
        }}
      >
      {post.image && (
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div 
        className="p-6"
        style={{ 
          fontSize: '16px'
        }}
      >
        <p 
          className="text-gray-600 text-sm mb-3"
          style={{ 
            fontSize: '14px'
          }}
        >
          {formatDate(post.date)}
        </p>
        <h2 
          className="text-xl font-semibold mb-3 text-gray-900"
          style={{ 
            fontSize: '1.5rem',
            lineHeight: '1.3'
          }}
        >
          {post.title}
        </h2>
        <p 
          className="text-gray-800 leading-relaxed"
          style={{ 
            fontSize: '1rem',
            lineHeight: '1.5'
          }}
        >
          {post.description}
        </p>
      </div>
      </article>
    </Link>
  );
};

export default BlogCard;