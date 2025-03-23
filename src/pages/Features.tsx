import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/landing/navbar';
import Footer from '@/components/landing/footer';

const Features = () => {
  const features = [
    { title: 'Itinerary Planning', description: 'Design detailed, customizable tour itineraries with ease.' },
    { title: 'Invoice Generation', description: 'Create professional invoices with automatic cost breakdowns.' },
    { title: 'Real-Time Collaboration', description: 'Work with your team seamlessly in real-time.' },
    { title: 'Customer Management', description: 'Track client details and preferences efficiently.' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <main className="flex-1 p-6 pt-20"> {/* Added pt-20 */}
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-amber-700 mb-8 text-center">Features</h1>
          <p className="text-gray-600 mb-12 text-center max-w-2xl mx-auto">
            Discover the powerful tools that make TourGenius the ultimate platform for tour professionals.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-amber-600">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Features;