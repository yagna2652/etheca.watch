import React from 'react';
import { Button } from "@/components/ui/button";

const Footer: React.FC = () => {
  return (
    <footer className="SecuritySection_section__dbHHJ" style={{background: 'var(--color-black)'}}>
      <div className="SecuritySection_container__DQLVK">
        <div className="SecuritySection_content__riStQ" style={{padding: '80px 60px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <h2 
            className="SecuritySection_title__oeX23"
            style={{
              fontSize: '28px',
              fontWeight: '500',
              lineHeight: '1.4',
              maxWidth: '700px',
              margin: '0 auto',
              fontFamily: 'var(--font-primary)',
              textAlign: 'center',
              padding: '0 20px'
            }}
          >
            Breakthroughs are born from the freedom to explore, not from busywork
          </h2>
          <div style={{marginTop: '40px'}}>
            <Button size="lg">Get Started Today</Button>
          </div>
          <div style={{marginTop: '60px', fontSize: '14px', color: 'var(--color-text-white)', opacity: 0.8}}>
            <div style={{marginBottom: '8px'}}>© 2025 Etheca</div>
            <div>
              Art by <a 
                href="https://danallison.info/drawings/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{color: 'var(--color-text-white)', textDecoration: 'underline'}}
              >
                Dan Allison
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;