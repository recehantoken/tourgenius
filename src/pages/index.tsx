
import React from 'react';
import Navbar from '@/components/landing/navbar';
import Hero from '@/components/landing/hero';
import Features from '@/components/landing/features';
import Footer from '@/components/landing/footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-batik-dark to-black text-white">
      <div className="absolute inset-0 bg-auth-pattern opacity-10 pointer-events-none"></div>
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
};

export default Index;
