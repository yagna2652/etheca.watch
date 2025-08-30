import React from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Header from '../../src/components/Header';
import Footer from '../../src/components/Footer';
import ScrollProgress from '../../src/components/ScrollProgress';
import BlogPage from '../../src/pages/BlogPage';
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
      <div className="App">
        <Header />
        <div className="content-with-lines" style={{ 
          background: 'var(--color-surface-gray)',
          minHeight: '100vh'
        }}>
          <BlogPage posts={allPostsData} />
        </div>
        <Footer />
      </div>
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