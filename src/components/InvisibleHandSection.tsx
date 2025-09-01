import React from 'react';
const InvisibleHandImage = '/images/Invisible-hand-removebg-preview.png';

const InvisibleHandSection: React.FC = () => {
  return (
    <section className="border-t relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div className="space-y-6 p-6 md:p-8 relative">
          <div
            className="absolute inset-0 opacity-80 pointer-events-none"
            style={{
              backgroundSize: '6px 6px',
              backgroundPosition: '96px 96px',
              backgroundImage: `
                linear-gradient(to right, transparent 6px, hsl(var(--border)) 7px, hsl(var(--border)) 8px, transparent 9px),
                linear-gradient(to bottom, transparent 6px, hsl(var(--border)) 7px, hsl(var(--border)) 8px, transparent 9px)
              `,
            }}
          />
          <div
            className="absolute inset-0 bg-background pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 20%, hsl(var(--background)))',
            }}
          />
          <div className="relative z-10 space-y-6">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-medium tracking-tighter leading-tight">
            The invisible hand that updates your data
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed tracking-wide max-w-lg">
            Focus on your work, not data entry. Our AI learns your workflow to keep your source of truth perfectly accurate, guaranteed.
          </p>
          </div>
        </div>
        
        <div className="relative border-l">
          <div className="p-6 md:p-8 flex items-center justify-center min-h-[360px]">
            <img
              src={InvisibleHandImage}
              alt="The invisible hand that updates your data"
              className="w-64 h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvisibleHandSection;
