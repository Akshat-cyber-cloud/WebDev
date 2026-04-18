import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/common/Navbar';
import Hero from '../components/home/Hero';
import ProcessCards from '../components/home/ProcessCards';
import FeatureGrid from '../components/home/FeatureGrid';
import ValueProposition from '../components/home/ValueProposition';
import Footer from '../components/common/Footer';

const LandingPage = () => {
  const { logout, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      logout();
    }
  }, [loading, logout]);

  return (
    <div className="min-h-screen bg-background text-on-surface selection:bg-primary selection:text-on-primary">
      <Navbar />
      <main>
        <Hero />
        <ProcessCards />
        <FeatureGrid />
        <ValueProposition />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
