import React from 'react';
import { Button } from "@/components/ui/button";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

const AutomationHero: React.FC = () => {


  return (
    <section className="HeroSection_hero__MpuRV" style={{ position: 'relative' }}>
      {/* Grid Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundSize: '20px 20px',
          backgroundImage: `
            linear-gradient(to right, rgba(224, 224, 229, 0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(224, 224, 229, 0.3) 1px, transparent 1px)
          `,
          zIndex: 1,
        }}
      />
      {/* Radial gradient overlay for faded effect */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--color-surface-gray)',
          WebkitMask: 'radial-gradient(ellipse at center, transparent 20%, black)',
          mask: 'radial-gradient(ellipse at center, transparent 20%, black)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />
      <div className="HeroSection_container__z36V8" style={{ position: 'relative', zIndex: 3 }}>
        <div className="HeroSection_top__SlNTc">
          <div className="HeroSection_content__Z3NWj">
            <h1 className="HeroSection_title__r1ung FeaturesSection_heading_1__Tp9Oi">
              The end of manual data entry
            </h1>
            <p className="HeroSection_description__qiMon">
              We just observe how you work and then update your system of records accordingly
            </p>
            <div className="HeroSection_button_container__RfDt0">
              <HoverBorderGradient
                containerClassName=""
                as="button"
                onClick={() => window.open('mailto:hello@etheca.watch', '_blank')}
                className="bg-white dark:bg-white text-black dark:text-black flex items-center justify-center"
                style={{
                  borderRadius: '8px',
                  fontFamily: 'var(--font-primary)',
                  cursor: 'pointer',
                  padding: '16px 32px',
                  fontSize: '16px',
                  fontWeight: '500',
                  minHeight: '48px',
                }}
              >
                Contact Us
              </HoverBorderGradient>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AutomationHero;