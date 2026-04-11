import React from 'react';
import Navbar from '../components/common/Navbar';
import Hero from '../components/home/Hero';
import ProcessCards from '../components/home/ProcessCards';
import FeatureGrid from '../components/home/FeatureGrid';
import Footer from '../components/common/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background text-on-surface selection:bg-primary selection:text-on-primary">
      <Navbar />
      <main>
        <Hero />
        <ProcessCards />
        <FeatureGrid />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
