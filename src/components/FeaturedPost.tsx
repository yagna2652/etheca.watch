import React from 'react';

const FeaturedPost: React.FC = () => {
  return (
    <article 
      style={{ 
        width: '100%',
        marginBottom: '48px',
        padding: '24px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        fontSize: '16px',
        transform: 'scale(1)',
        zoom: '1'
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
        Introducing Etheca
      </h1>
      <p 
        style={{ 
          fontSize: '20px',
          color: '#374151',
          lineHeight: '1.6',
          fontFamily: 'inherit'
        }}
      >
        Etheca is revolutionizing the way we approach ethical technology and sustainable innovation. 
        Our platform brings together cutting-edge research, industry insights, and practical solutions 
        to help organizations build a more ethical and sustainable future through technology.
      </p>
    </article>
  );
};

export default FeaturedPost;