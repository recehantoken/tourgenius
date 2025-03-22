import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Pricing = () => {
  const plans = [
    { name: 'Basic', price: 'IDR 150,000', features: ['1 User', '5 Itineraries', 'Email Support'] },
    { name: 'Pro', price: 'IDR 350,000', features: ['5 Users', 'Unlimited Itineraries', 'Priority Support'] },
    { name: 'Enterprise', price: 'Contact Us', features: ['Unlimited Users', 'Custom Features', 'Dedicated Support'] },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-amber-700 mb-8 text-center">Pricing</h1>
        <p className="text-gray-600 mb-12 text-center max-w-2xl mx-auto">
          Choose a plan that fits your tour planning needs. All plans are billed monthly.
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
                  {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;