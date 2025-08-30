import React from 'react';

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
  return (
    <article 
      className="absolute w-[350px] h-auto border-b border-gray-200 transition-all duration-[0.4s] ease-[ease] bg-white shadow-sm rounded-lg overflow-hidden"
      style={{ 
        fontSize: '16px',
        transform: 'scale(1)',
        zoom: '1'
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
          {post.date}
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
  );
};

export default BlogCard;