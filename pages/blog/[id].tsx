import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../../src/components/Header';
import Footer from '../../src/components/Footer';
import ScrollProgress from '../../src/components/ScrollProgress';
import { getAllContentIds, getContentData, ContentData } from '../../lib/contentService';

interface BlogPostProps {
  postData: ContentData;
}

const BlogPost: React.FC<BlogPostProps> = ({ postData }) => {
  return (
    <>
      <Head>
        <title>{postData.title} - Etheca.Watch Blog</title>
        <meta name="description" content={postData.description || `Read ${postData.title} on the Etheca.Watch blog.`} />
      </Head>
      
      <ScrollProgress />
      <Header />
      
      <main style={{ 
        background: 'var(--color-surface-gray)',
        minHeight: '100vh',
        paddingTop: 'var(--header-height)'
      }}>
        {/* Content with vertical lines */}
        <div className="content-with-lines">
          <article className="blog-post">
            <div className="blog-post-container">
              {/* Back to Blog Link */}
              <nav className="blog-post-nav">
                <Link href="/blog" className="blog-back-link">
                  ← Back to Blog
                </Link>
              </nav>

              {/* Post Header */}
              <header className="blog-post-header">
                <h1 className="blog-post-title">{postData.title}</h1>
                
                {/* Post Metadata */}
                <div className="blog-post-meta">
                  {postData.date && (
                    <time className="blog-post-date">
                      {new Date(postData.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  )}
                  {postData.author && (
                    <span className="blog-post-author">by {postData.author}</span>
                  )}
                </div>
              </header>

              {/* Post Content */}
              <div 
                className="blog-post-content"
                dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
              />
            </div>
          </article>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllContentIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getContentData(params?.id as string);
  
  return {
    props: {
      postData,
    },
  };
};

export default BlogPost;