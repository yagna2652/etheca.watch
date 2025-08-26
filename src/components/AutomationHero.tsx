import React from 'react';
import { Button } from "@/components/ui/button";

const AutomationHero: React.FC = () => {


  return (
    <section className="HeroSection_hero__MpuRV">
      <div className="HeroSection_container__z36V8">
        <div className="HeroSection_top__SlNTc">
          <div className="HeroSection_content__Z3NWj">
            <h1 className="HeroSection_title__r1ung FeaturesSection_heading_1__Tp9Oi">
              The end of manual data entry
            </h1>
            <p className="HeroSection_description__qiMon">
              We just observe how you work and then update your system of records accordingly
            </p>
            <div className="HeroSection_button_container__RfDt0">
              <Button
                size="lg"
                style={{
                  backgroundColor: '#44547e',
                  color: '#fff',
                  padding: '20px 40px',
                  border: 'none',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-primary)',
                  fontSize: '18px',
                  fontWeight: '500',
                  minHeight: '56px',
                  minWidth: '180px'
                }}
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AutomationHero;