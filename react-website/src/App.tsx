import React from 'react';
import './App.css';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import WorkspaceSection from './components/WorkspaceSection';
import DataSection from './components/DataSection';
import IntegrationsSection from './components/IntegrationsSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <HeroSection />
      <WorkspaceSection />
      <DataSection />
      <IntegrationsSection />
      <Footer />
    </div>
  );
}

export default App;
