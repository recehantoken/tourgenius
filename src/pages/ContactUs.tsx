import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-amber-700 mb-8 text-center">Contact Us</h1>
        <p className="text-gray-600 mb-12 text-center max-w-2xl mx-auto">
          Our dedicated support team is here to assist you with any inquiries, technical issues, or feedback. Connect with us to ensure your tour planning runs smoothly.
        </p>
        <div className="max-w-lg mx-auto bg-white p-6 rounded-xl border border-gray-200 shadow-md">
          <form className="space-y-4">
            <div>
              <label className="text-gray-700 font-medium">Full Name</label>
              <Input placeholder="Enter your full name" className="bg-gray-50 border-gray-200" />
            </div>
            <div>
              <label className="text-gray-700 font-medium">Email Address</label>
              <Input type="email" placeholder="Enter your email" className="bg-gray-50 border-gray-200" />
            </div>
            <div>
              <label className="text-gray-700 font-medium">Subject</label>
              <Input placeholder="e.g., Technical Support" className="bg-gray-50 border-gray-200" />
            </div>
            <div>
              <label className="text-gray-700 font-medium">Message</label>
              <Textarea placeholder="Describe your inquiry or issue" className="bg-gray-50 border-gray-200" rows={5} />
            </div>
            <Button type="submit" className="w-full bg-amber-400 text-gray-900 hover:bg-amber-500">
              Submit Inquiry
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;