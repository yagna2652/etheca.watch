import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ContentSummary } from '../../lib/contentService';

interface BlogEntryProps extends ContentSummary {
  className?: string;
}

const BlogEntry: React.FC<BlogEntryProps> = ({ 
  id, 
  title, 
  date, 
  author, 
  description, 
  thumbnail,
  className = "" 
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Link href={`/blog/${id}`} className="block">
      <Card className={`blog-entry-card no-shadow ${className}`}>
        {/* Left Section - Image */}
        <div className="blog-entry-image-section">
          {thumbnail && (
            <div className="blog-entry-image">
              <img 
                src={thumbnail} 
                alt={title}
                className="blog-entry-img"
              />
            </div>
          )}
        </div>

        {/* Right Section - Content */}
        <motion.div 
          className="blog-entry-content-section"
          initial={{ backgroundColor: 'transparent' }}
          whileHover={{ 
            backgroundColor: '#1a1a22',
            transition: { duration: 0.3, ease: 'easeInOut' }
          }}
        >
          <CardHeader className="blog-entry-header">
            <div className="blog-entry-meta">
              {date && (
                <time className="blog-entry-date">
                  {formatDate(date)}
                </time>
              )}
              {author && (
                <span className="blog-entry-author">by {author}</span>
              )}
            </div>
            <h2 className="blog-entry-title">{title}</h2>
          </CardHeader>
          
          <CardContent className="blog-entry-content">
            {description && (
              <p className="blog-entry-excerpt">{description}</p>
            )}
          </CardContent>
        </motion.div>
      </Card>
    </Link>
  );
};

export default BlogEntry;