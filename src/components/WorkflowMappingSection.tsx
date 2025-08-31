import React from 'react';
const StoryImage = '/images/Story-removebg-preview.png';

const WorkflowMappingSection: React.FC = () => {
  return (
    <section className="border-t border-b border-l border-r container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div className="space-y-6 p-6 md:p-8 relative">
          <div className="relative z-10 space-y-6">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-medium tracking-tighter leading-tight">
            We map the chaos
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed tracking-wide max-w-lg">
            Our AI makes sense of your complex workflow so you don't have to. We turn that chaos into a simple prompt with the right updates, ready for your final say.
          </p>
          </div>
        </div>
        
        <div className="relative">
          <div className="bg-white p-6 md:p-8 flex items-center justify-center min-h-[360px] overflow-hidden">
            <img
              src={StoryImage}
              alt="Review, Approve, Done - workflow approval process"
              className="w-64 h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkflowMappingSection;
