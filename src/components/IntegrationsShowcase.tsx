import React from 'react';
const WorksWithToolsImage = '/images/workswithyourtools-removebg-preview.png';

const IntegrationsShowcase: React.FC = () => {
  return (
    <section className="border-t">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div className="space-y-6 p-6 md:p-8 relative">
          <div className="relative z-10 space-y-6">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-medium tracking-tighter leading-tight">
            Works with your tools.
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed tracking-wide max-w-lg">
            We integrate with your favorite CRMs, project management boards, and communication apps to capture updates automatically.
          </p>
          </div>
        </div>
        
        <div className="relative border-l">
          <div className="p-6 md:p-8 flex items-center justify-center min-h-[360px] overflow-hidden">
            <img
              src={WorksWithToolsImage}
              alt="Works with your tools - integrations with CRMs and project management"
              className="w-64 h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationsShowcase;
