import React from 'react';
import Navbar from '@/components/landing/navbar';
import Footer from '@/components/landing/footer';

const PrivacyPolicy = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <main className="flex-1 p-6">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold text-amber-700 mb-8 text-center">Privacy Policy</h1>
          <div className="prose text-gray-600">
            <p className="text-sm italic">Last updated: March 22, 2025</p>
            <h2 className="text-2xl text-amber-600 mt-6">1. Introduction</h2>
            <p>
              At TourGenius, we are committed to safeguarding the privacy of our users. This Privacy Policy outlines how we collect, use, disclose, and protect your personal information when you use our tour planning platform and related services.
            </p>
            <h2 className="text-2xl text-amber-600 mt-6">2. Information We Collect</h2>
            <p>
              We collect various types of information to provide and enhance our services, including:
              <ul className="list-disc pl-6">
                <li><strong>Personal Data:</strong> Name, email address, phone number, and payment details provided during account creation or transactions.</li>
                <li><strong>Usage Data:</strong> Information about how you interact with our platform, such as itinerary details, IP addresses, and browser types.</li>
                <li><strong>Client Data:</strong> Information you input about your customers for tour management purposes.</li>
              </ul>
            </p>
            <h2 className="text-2xl text-amber-600 mt-6">3. How We Use Your Information</h2>
            <p>
              Your data enables us to:
              <ul className="list-disc pl-6">
                <li>Facilitate itinerary creation, invoice generation, and customer management.</li>
                <li>Process payments securely through trusted third-party providers.</li>
                <li>Improve our platform through analytics and user feedback.</li>
                <li>Communicate with you regarding updates, support, and promotional offers (with your consent).</li>
              </ul>
            </p>
            <h2 className="text-2xl text-amber-600 mt-6">4. Data Sharing and Security</h2>
            <p>
              We do not sell your personal information. Data may be shared with:
              <ul className="list-disc pl-6">
                <li>Service providers (e.g., payment processors) under strict confidentiality agreements.</li>
                <li>Legal authorities if required by law.</li>
              </ul>
              We employ industry-standard encryption and security measures to protect your data from unauthorized access.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;