import React from 'react';
import Navbar from '@/components/landing/navbar';
import Footer from '@/components/landing/footer';

const CookiePolicy = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <main className="flex-1 p-6">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold text-amber-700 mb-8 text-center">Cookie Policy</h1>
          <div className="prose text-gray-600">
            <p className="text-sm italic">Last updated: March 22, 2025</p>
            <h2 className="text-2xl text-amber-600 mt-6">1. Introduction to Cookies</h2>
            <p>
              TourGenius uses cookies—small text files stored on your device—to enhance your experience on our platform. This Cookie Policy explains what cookies we use, why we use them, and how you can manage them.
            </p>
            <h2 className="text-2xl text-amber-600 mt-6">2. Types of Cookies We Use</h2>
            <p>
              We utilize the following cookies:
              <ul className="list-disc pl-6">
                <li><strong>Essential Cookies:</strong> Required for core functionality, such as user authentication and session management.</li>
                <li><strong>Analytics Cookies:</strong> Collect anonymized data to analyze platform usage and improve performance.</li>
                <li><strong>Marketing Cookies:</strong> Enable personalized content and advertisements (optional, with your consent).</li>
              </ul>
            </p>
            <h2 className="text-2xl text-amber-600 mt-6">3. Managing Your Cookie Preferences</h2>
            <p>
              You can control cookies through your browser settings, though disabling essential cookies may impair platform functionality. For more control, adjust your preferences in your TourGenius account settings where applicable.
            </p>
            <h2 className="text-2xl text-amber-600 mt-6">4. Third-Party Cookies</h2>
            <p>
              We may integrate third-party services (e.g., analytics providers) that set their own cookies. These are governed by the respective providers’ privacy policies.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CookiePolicy;