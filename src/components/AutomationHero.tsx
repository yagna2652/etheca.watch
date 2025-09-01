"use client"

import React from 'react';
import { HoverBorderGradient } from "@/src/components/ui/hover-border-gradient";

const AutomationHero: React.FC = () => {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
      {/* Inner Content Container with Vertical Borders */}
      <div className="w-full flex items-center justify-center relative">
        {/* Grid Background */}
        <div 
          className="absolute inset-0 opacity-80"
          style={{
            backgroundSize: '24px 24px',
            backgroundPosition: '12px 12px',
            backgroundImage: `
              linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
            `,
            maskImage: 'radial-gradient(ellipse at center, white, transparent 70%)'
          }}
        />
        
        <div className="relative z-10 px-6 md:px-8 py-24 md:py-32 w-full">
          <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          <div className="space-y-6">
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tighter leading-tight">
              The end of manual data entry
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed tracking-wide">
              We just observe how you work and then update your system of records accordingly
            </p>
          </div>
          
          <div className="pt-4">
            <HoverBorderGradient
              as="button"
              onClick={() => window.open('mailto:hello@etheca.watch', '_blank')}
              className="bg-background text-foreground flex items-center justify-center"
              containerClassName="rounded-lg"
              style={{
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: '500',
              }}
            >
              Enter the Waitlist
            </HoverBorderGradient>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AutomationHero;