import React from 'react';
import GlassCard from '@/components/ui/glass-card';
import { Calendar, DollarSign, FileText, Map, Settings, Users } from 'lucide-react';

const features = [
  {
    icon: <Calendar className="h-10 w-10 text-black" />,
    title: 'Smart Itinerary Builder',
    description: 'Easily plan day-by-day activities with a drag-and-drop interface. Customize every aspect of your tour.'
  },
  {
    icon: <Map className="h-10 w-10 text-black" />,
    title: 'Destination Management',
    description: 'Add attractions, activities, and points of interest with detailed information and pricing.'
  },
  {
    icon: <Users className="h-10 w-10 text-black" />,
    title: 'Tour Guide Assignment',
    description: 'Select from qualified guides based on expertise, languages, and availability.'
  },
  {
    icon: <DollarSign className="h-10 w-10 text-black" />,
    title: 'Automatic Price Calculation',
    description: 'Real-time cost updates as you build your itinerary, with detailed breakdowns for all components.'
  },
  {
    icon: <FileText className="h-10 w-10 text-black" />,
    title: 'Professional Invoices',
    description: 'Generate branded, detailed invoices that can be sent directly to clients with payment options.'
  },
  {
    icon: <Settings className="h-10 w-10 text-black" />,
    title: 'Customization Options',
    description: 'Tailor meals, accommodations, and transportation to meet specific client preferences and budgets.'
  }
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-accent">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-black">Powerful Features for Tour Professionals</h2>
          <p className="text-black">
            All the tools you need to create exceptional travel experiences for your clients
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <GlassCard
              key={index}
              className="flex flex-col items-start h-full transition-all duration-300"
              hoverEffect={true}
            >
              <div className="mb-4 p-3 bg-black/10 rounded-lg">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-black">{feature.title}</h3>
              <p className="text-black">{feature.description}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;