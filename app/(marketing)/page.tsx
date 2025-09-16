"use client"

import React from 'react';
import { HeroSection } from '@/components/hero-section';
import { InvisibleHandSection } from '@/components/invisible-hand-section';
import { SingleSourceSection } from '@/components/single-source-section';

export default function HomePage() {
  const handleEmailSubmit = (email: string) => {
    // Handle email submission - you can implement your logic here
    console.log('Email submitted:', email);
  };

  return (
    <>
      <HeroSection
        onEmailSubmit={handleEmailSubmit}
        backgroundImageUrl="http://localhost:3845/assets/542b86e0c5d69f82773cc785ab8c854d1edda15b.svg"
        heroImageUrl="http://localhost:3845/assets/0dd1a2b846fad94d73143069ad661cf5f9f22909.png"
      />
      <InvisibleHandSection />
      <SingleSourceSection />
    </>
  );
}