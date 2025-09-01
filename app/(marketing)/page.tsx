import React from 'react';
import AutomationHero from '../../src/components/AutomationHero';
import InvisibleHandSection from '../../src/components/InvisibleHandSection';
import IntegrationsShowcase from '../../src/components/IntegrationsShowcase';
import WorkflowMappingSection from '../../src/components/WorkflowMappingSection';

export const metadata = {
  title: "Etheca - The End of Manual Data Entry",
  description: "We just observe how you work and then update your system of records accordingly. Focus on your work, not data entry.",
}

export default function HomePage() {
  return (
    <>
      <AutomationHero />
      <InvisibleHandSection />
      <IntegrationsShowcase />
      <WorkflowMappingSection />
    </>
  );
}