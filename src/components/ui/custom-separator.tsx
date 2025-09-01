import React from 'react';

interface CustomSeparatorProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

const CustomSeparator: React.FC<CustomSeparatorProps> = ({ 
  orientation = 'horizontal', 
  className = '' 
}) => {
  const baseStyles = {
    backgroundColor: 'var(--color-border-grid-alpha-60-white)',
    ...(orientation === 'horizontal' 
      ? { height: '1px', width: '100%' }
      : { height: '100%', width: '0.5px' }
    )
  };

  return (
    <div 
      style={baseStyles}
      className={className}
    />
  );
};

export { CustomSeparator };
