import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const HelpCenter = () => {
  const faqCategories = [
    {
      title: 'Getting Started',
      items: [
        { question: 'How do I create my first itinerary?', link: '#' },
        { question: 'What are the steps to set up my team account?', link: '#' },
        { question: 'How can I customize invoice templates?', link: '#' },
      ],
    },
    {
      title: 'Troubleshooting',
      items: [
        { question: 'Why can’t I log in to my account?', link: '#' },
        { question: 'What to do if payment processing fails?', link: '#' },
        { question: 'How to resolve sync issues in collaboration mode?', link: '#' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-amber-700 mb-8 text-center">Help Center</h1>
        <p className="text-gray-600 mb-12 text-center max-w-2xl mx-auto">
          Access comprehensive resources and expert support to maximize your TourGenius experience. Search our knowledge base or reach out for personalized assistance.
        </p>
        <div className="max-w-lg mx-auto mb-12">
          <div className="flex gap-2">
            <Input placeholder="Search help articles (e.g., 'itinerary setup')" className="bg-gray-50 border-gray-200" />
            <Button className="bg-amber-400 text-gray-900 hover:bg-amber-500">Search</Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqCategories.map((category, index) => (
            <div key={index}>
              <h2 className="text-xl font-semibold text-amber-600 mb-4">{category.title}</h2>
              <ul className="text-gray-600 space-y-2">
                {category.items.map((item, idx) => (
                  <li key={idx}>
                    <a href={item.link} className="hover:text-amber-600">{item.question}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;