import React from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import Header from '../../src/components/Header';
import Footer from '../../src/components/Footer';
import ScrollProgress from '../../src/components/ScrollProgress';
import { getSortedContentSummaries, ContentSummary } from '../../lib/contentService';

interface BlogIndexProps {
  allPostsData: ContentSummary[];
}

const BlogIndex: React.FC<BlogIndexProps> = ({ allPostsData }) => {
  return (
    <>
      <Head>
        <title>Blog - Etheca.Watch</title>
        <meta name="description" content="Latest insights and updates from Etheca.Watch on AI automation and workflow optimization." />
      </Head>
      
      <ScrollProgress />
      <Header />
      
      <main style={{ 
        background: 'var(--color-surface-gray)',
        minHeight: '100vh',
        paddingTop: 'var(--header-height)'
      }}>
        {/* Blog Title Section */}
        <section className="blog-title-section">
          <div className="blog-title-container">
            <div className="blog-title-line"></div>
            <h1 className="blog-title">Blog</h1>
            <div className="blog-title-line"></div>
          </div>
        </section>

        {/* Blog Posts Grid Section */}
        <section className="blog-posts-section">
          <div className="blog-container">
            <div className="blog-grid">
              {allPostsData.map((post) => (
                <Link key={post.id} href={`/blog/${post.id}`} className="blog-card-link">
                  <article className="blog-card">
                    {/* Thumbnail Image */}
                    {post.thumbnail && (
                      <div className="blog-card-image">
                        <img 
                          src={post.thumbnail} 
                          alt={post.title}
                          style={{
                            width: '100%',
                            height: '200px',
                            objectFit: 'cover',
                            borderRadius: 'var(--radius) var(--radius) 0 0'
                          }}
                        />
                      </div>
                    )}
                    
                    {/* Content Section */}
                    <div className="blog-card-content">
                      <h2 className="blog-card-title">{post.title}</h2>
                      
                      {/* Metadata */}
                      <div className="blog-card-meta">
                        {post.date && (
                          <time className="blog-card-date">
                            {new Date(post.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </time>
                        )}
                        {post.author && (
                          <span className="blog-card-author">by {post.author}</span>
                        )}
                      </div>
                      
                      {/* Excerpt */}
                      {post.description && (
                        <p className="blog-card-excerpt">{post.description}</p>
                      )}
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedContentSummaries();
  
  return {
    props: {
      allPostsData,
    },
  };
};

export default BlogIndex;