import React from 'react';
import Head from 'next/head';
import Header from '../../src/components/Header';
import Footer from '../../src/components/Footer';
import ScrollProgress from '../../src/components/ScrollProgress';
import BlogPage from '../../src/pages/BlogPage';

const BlogIndex: React.FC = () => {
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
          <BlogPage />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default BlogIndex;