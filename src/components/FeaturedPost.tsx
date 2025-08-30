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

interface FeaturedPostProps {
  post?: BlogPost;
}

const FeaturedPost: React.FC<FeaturedPostProps> = ({ post }) => {
  // Default fallback content if no post provided
  if (!post) {
    return (
      <article 
        style={{ 
          width: '100%',
          marginBottom: '48px',
          padding: '24px',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          fontSize: '16px',
          transform: 'scale(1)',
          zoom: '1',
          border: '1px solid #e5e7eb'
        }}
      >
        <h1 
          style={{ 
            fontSize: '48px',
            fontWeight: 'bold',
            marginBottom: '24px',
            color: '#111827',
            lineHeight: '1.2',
            fontFamily: 'inherit'
          }}
        >
          Welcome to Our Blog
        </h1>
        <p 
          style={{ 
            fontSize: '20px',
            color: '#374151',
            lineHeight: '1.6',
            fontFamily: 'inherit'
          }}
        >
          Discover insights, tutorials, and updates from our team.
        </p>
      </article>
    );
  }

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
        className="hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
        style={{ 
          width: '1090px',
          margin: '0 auto 64px auto',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          fontSize: '16px',
          border: '1px solid #e2e8f0',
          display: 'flex',
          minHeight: '320px'
        }}
      >
        {/* Left side - Image */}
        {post.image && (
          <div style={{ 
            width: '25%', 
            minHeight: '320px', 
            overflow: 'hidden',
            borderTopLeftRadius: '12px',
            borderBottomLeftRadius: '12px'
          }}>
            <img 
              src={post.image} 
              alt={post.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>
        )}
        
        {/* Right side - Content */}
        <div style={{ 
          width: post.image ? '75%' : '100%',
          padding: '48px 40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <p 
            style={{ 
              fontSize: '13px',
              color: '#64748b',
              marginBottom: '16px',
              fontFamily: 'inherit',
              fontWeight: '500',
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}
          >
            {formatDate(post.date)}
          </p>
          <h1 
            style={{ 
              fontSize: '32px',
              fontWeight: '700',
              marginBottom: '20px',
              color: '#0f172a',
              lineHeight: '1.2',
              fontFamily: 'inherit'
            }}
          >
            {post.title}
          </h1>
          <p 
            style={{ 
              fontSize: '16px',
              color: '#475569',
              lineHeight: '1.6',
              fontFamily: 'inherit',
              margin: '0 0 24px 0'
            }}
          >
            {post.description}
          </p>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            fontSize: '14px',
            color: '#64748b',
            fontWeight: '500'
          }}>
            Read more →
          </div>
        </div>
      </article>
    </Link>
  );
};

export default FeaturedPost;