import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const HelpCenter = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-amber-700 mb-8 text-center">Help Center</h1>
        <p className="text-gray-600 mb-12 text-center max-w-2xl mx-auto">
          Find answers to common questions or search our knowledge base.
        </p>
        <div className="max-w-lg mx-auto mb-12">
          <div className="flex gap-2">
            <Input placeholder="Search help articles..." className="bg-gray-50 border-gray-200" />
            <Button className="bg-amber-400 text-gray-900 hover:bg-amber-500">Search</Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold text-amber-600 mb-4">Getting Started</h2>
            <ul className="text-gray-600 space-y-2">
              <li><a href="#" className="hover:text-amber-600">How to Create an Itinerary</a></li>
              <li><a href="#" className="hover:text-amber-600">Setting Up Your Account</a></li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-amber-600 mb-4">Troubleshooting</h2>
            <ul className="text-gray-600 space-y-2">
              <li><a href="#" className="hover:text-amber-600">Login Issues</a></li>
              <li><a href="#" className="hover:text-amber-600">Payment Problems</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;