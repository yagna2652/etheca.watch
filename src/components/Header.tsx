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
        background: 'var(--color-surface-gray)',
        borderBottom: '1px solid rgba(130, 130, 148, 0.3)',
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
          padding: '0 var(--layout-margin)',
          width: '100%'
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
              gap: '4px'
            }}
          >
            <img
              src={EthecaLogo}
              alt="Etheca Logo"
              className="header-logo-mobile"
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
                letterSpacing: '-0.02em',
                lineHeight: '1.4',
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
              size="default"
              style={{ 
                backgroundColor: '#1a1a22', 
                color: '#f4f4f6',
                border: 'none',
                borderRadius: '8px',
                fontFamily: 'var(--font-primary)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                padding: '12px 24px',
                fontSize: '14px',
                fontWeight: '500',
                minHeight: '44px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center'
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