import React from 'react';
import { Button } from "@/components/ui/button";
const EthecaLogo = '/images/Etheca Connect Dots.png';

const Header: React.FC = () => {
  return (
    <header 
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        width: '100%',
        height: '80px',
        background: 'var(--color-white)',
        borderBottom: '1px solid var(--color-border-grid-alpha-60-white)',
        backdropFilter: 'blur(8px)'
      }}
    >
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '100%',
          maxWidth: '1920px',
          margin: '0 auto',
          padding: '0 80px'
        }}
      >
        {/* Logo Section */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <a 
            href="/" 
            style={{ 
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <img 
              src={EthecaLogo} 
              alt="Etheca Logo" 
              style={{
                height: '40px',
                width: 'auto',
                objectFit: 'contain'
              }}
            />
            <span
              style={{
                color: 'var(--color-text-black)',
                fontSize: '24px',
                fontWeight: '700',
                fontFamily: 'var(--font-primary)'
              }}
            >
              Etheca
            </span>
          </a>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <a href="mailto:hello@etheca.watch" style={{ textDecoration: 'none' }}>
            <Button 
              style={{ 
                backgroundColor: '#44547e', 
                color: '#fff',
                padding: '12px 24px',
                border: 'none',
                borderRadius: '4px',
                fontFamily: 'var(--font-primary)',
                fontSize: '16px',
                fontWeight: '500',
                minHeight: '44px',
                cursor: 'pointer'
              }}
            >
              Contact Us
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;