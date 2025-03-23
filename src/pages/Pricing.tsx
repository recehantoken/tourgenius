import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/landing/navbar';
import Footer from '@/components/landing/footer';

const Pricing = () => {
  const plans = [
    {
      name: 'Basic',
      price: 'IDR 150,000/mo',
      features: [
        '1 User Account',
        'Up to 5 Itineraries per Month',
        'Standard Email Support (48-hour response)',
        'Basic Invoice Templates',
      ],
    },
    {
      name: 'Pro',
      price: 'IDR 350,000/mo',
      features: [
        'Up to 5 User Accounts',
        'Unlimited Itineraries',
        'Priority Email & Chat Support (24-hour response)',
        'Advanced Invoice Customization',
        'Real-Time Collaboration Tools',
      ],
    },
    {
      name: 'Enterprise',
      price: 'Contact Us',
      features: [
        'Unlimited User Accounts',
        'Custom Itinerary & Invoice Features',
        'Dedicated Account Manager',
        '24/7 Phone & Priority Support',
        'API Access for Integration',
      ],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <main className="flex-1 p-6 pt-20"> {/* Added pt-20 */}
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-amber-700 mb-8 text-center">Pricing</h1>
          <p className="text-gray-600 mb-12 text-center max-w-2xl mx-auto">
            Select a plan tailored to your tour business needs. From solo operators to large agencies, TourGenius offers scalable solutions with transparent pricing.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <Card key={index} className="bg-white border border-gray-200 shadow-md">
                <CardHeader>
                  <CardTitle className="text-xl text-amber-600">{plan.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-gray-900 mb-4">{plan.price}</p>
                  <ul className="text-gray-600 space-y-2">
                    {plan.features.map((feature, idx) => (
                      <li key={idx}>✓ {feature}</li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-amber-400 text-gray-900 hover:bg-amber-500">
                    {plan.name === 'Enterprise' ? 'Contact Sales' : 'Start Now'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;