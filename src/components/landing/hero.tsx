
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import GlassCard from '@/components/ui/glass-card';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white -z-10 dark:from-gray-900 dark:to-gray-950"></div>
      
      {/* Animated shapes */}
      <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float dark:bg-blue-800 dark:opacity-20"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float animation-delay-2000 dark:bg-purple-800 dark:opacity-20"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2 text-center lg:text-left">
            <div className="space-y-6 max-w-2xl mx-auto lg:mx-0">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight animate-fade-up">
                Create Extraordinary Travel Experiences
              </h1>
              <p className="text-lg text-secondary-foreground leading-relaxed animate-fade-up animation-delay-150">
                Plan, customize, and manage tour itineraries with precision. Calculate costs automatically, 
                and generate professional invoices in seconds.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start animate-fade-up animation-delay-300">
                <Link to="/auth?signup=true">
                  <Button size="lg" className="group">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/#features">
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 animate-fade-in animation-delay-500">
            <GlassCard className="relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1576153192621-7a3be10b356e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                alt="Dashboard Preview"
                className="w-full h-auto rounded object-cover shadow-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 glass rounded-b-lg">
                <p className="text-sm font-medium">Dashboard preview: Tour itinerary builder</p>
              </div>
            </GlassCard>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <GlassCard className="animate-float">
                <div className="flex flex-col items-center p-2 text-center">
                  <div className="text-4xl font-bold text-primary">2,500+</div>
                  <p className="text-sm text-muted-foreground">Tours Created</p>
                </div>
              </GlassCard>
              <GlassCard className="animate-float animation-delay-150">
                <div className="flex flex-col items-center p-2 text-center">
                  <div className="text-4xl font-bold text-primary">98%</div>
                  <p className="text-sm text-muted-foreground">Customer Satisfaction</p>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
