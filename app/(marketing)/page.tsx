"use client"

import React from 'react';
import { HeroSection } from '@/components/hero-section';
import { InvisibleHandSection } from '@/components/invisible-hand-section';
import { SingleSourceSection } from '@/components/single-source-section';
import { IntegrationsSection } from '@/components/integrations-section';
import { TransparencySection } from '@/components/transparency-section';

export default function HomePage() {
  const handleEmailSubmit = (email: string) => {
    // Handle email submission - you can implement your logic here
    console.log('Email submitted:', email);
  };

  return (
    <>
      <HeroSection
        onEmailSubmit={handleEmailSubmit}
        backgroundImageUrl="/assets/backgrounds/Background.svg"
        heroImageUrl="/assets/illustrations/Hero Illustration.svg"
      />
      <InvisibleHandSection />
      <SingleSourceSection />
      <IntegrationsSection />
      <TransparencySection />
    </>
  );
}