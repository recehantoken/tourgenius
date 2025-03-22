import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const Testimonials = () => {
  const testimonials = [
    { name: 'John Doe', role: 'Tour Operator', text: 'TourGenius transformed how I plan trips—efficient and user-friendly!' },
    { name: 'Jane Smith', role: 'Travel Agent', text: 'The invoicing feature saved me hours of work every week.' },
    { name: 'Alex Lee', role: 'Guide', text: 'Collaboration with my team has never been easier.' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-amber-700 mb-8 text-center">Testimonials</h1>
        <p className="text-gray-600 mb-12 text-center max-w-2xl mx-auto">
          Hear from tour professionals who trust TourGenius to power their businesses.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white border border-gray-200 shadow-md">
              <CardContent className="pt-6">
                <p className="text-gray-600 italic mb-4">"{testimonial.text}"</p>
                <p className="text-amber-600 font-semibold">{testimonial.name}</p>
                <p className="text-gray-500 text-sm">{testimonial.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;