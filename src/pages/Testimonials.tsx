import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/landing/navbar';
import Footer from '@/components/landing/footer';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Johnathan Miller',
      role: 'Senior Tour Operator, Bali Adventures',
      text: 'TourGenius has revolutionized our workflow. The intuitive itinerary builder and automated invoicing have cut our planning time in half, allowing us to focus on delivering exceptional experiences for our clients.',
    },
    {
      name: 'Sofia Reyes',
      role: 'Travel Agency Owner, Java Journeys',
      text: 'The real-time collaboration feature is a game-changer. My team can now coordinate seamlessly across multiple projects, and the professional invoices we generate have impressed our corporate clients.',
    },
    {
      name: 'Liam Chen',
      role: 'Freelance Tour Guide, Sumatra Trails',
      text: 'As a solo operator, TourGenius gives me the tools to compete with larger firms. The customer management system keeps me organized, and the polished dashboard makes me look professional.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <main className="flex-1 p-6 pt-20"> {/* Added pt-20 */}
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-amber-700 mb-8 text-center">Testimonials</h1>
          <p className="text-gray-600 mb-12 text-center max-w-2xl mx-auto">
            Discover how TourGenius empowers travel professionals to streamline operations and elevate client experiences.
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
      </main>
      <Footer />
    </div>
  );
};

export default Testimonials;