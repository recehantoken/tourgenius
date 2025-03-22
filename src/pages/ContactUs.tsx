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
          Have questions or need assistance? Reach out to our team.
        </p>
        <div className="max-w-lg mx-auto bg-white p-6 rounded-xl border border-gray-200 shadow-md">
          <form className="space-y-4">
            <div>
              <label className="text-gray-700">Name</label>
              <Input placeholder="Your name" className="bg-gray-50 border-gray-200" />
            </div>
            <div>
              <label className="text-gray-700">Email</label>
              <Input type="email" placeholder="Your email" className="bg-gray-50 border-gray-200" />
            </div>
            <div>
              <label className="text-gray-700">Message</label>
              <Textarea placeholder="Your message" className="bg-gray-50 border-gray-200" />
            </div>
            <Button type="submit" className="w-full bg-amber-400 text-gray-900 hover:bg-amber-500">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;