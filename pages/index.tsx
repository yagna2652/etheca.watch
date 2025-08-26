import React from 'react';
import Head from 'next/head';
import Header from '../src/components/Header';
import AutomationHero from '../src/components/AutomationHero';
import InvisibleHandSection from '../src/components/InvisibleHandSection';
import IntegrationsShowcase from '../src/components/IntegrationsShowcase';
import WorkflowMappingSection from '../src/components/WorkflowMappingSection';
import Footer from '../src/components/Footer';

export default function Home() {
  return (
    <>
      <Head>
        <title>Etheca - The End of Manual Data Entry</title>
        <meta name="description" content="We just observe how you work and then update your system of records accordingly. Focus on your work, not data entry." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </Head>
      <div className="App">
        <Header />
        <AutomationHero />
        <InvisibleHandSection />
        <IntegrationsShowcase />
        <WorkflowMappingSection />
        <Footer />
      </div>
    </>
  );
}