import React from 'react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold text-amber-700 mb-8 text-center">Terms of Service</h1>
        <div className="prose text-gray-600">
          <p className="text-sm italic">Last updated: March 22, 2025</p>
          <h2 className="text-2xl text-amber-600 mt-6">1. Acceptance of Terms</h2>
          <p>
            By accessing or using TourGenius, you agree to be bound by these Terms of Service ("Terms"). These Terms govern your use of our platform, including all features, tools, and services provided.
          </p>
          <h2 className="text-2xl text-amber-600 mt-6">2. Use of Services</h2>
          <p>
            You may use TourGenius to:
            <ul className="list-disc pl-6">
              <li>Create and manage tour itineraries.</li>
              <li>Generate invoices and process payments.</li>
              <li>Collaborate with team members and clients.</li>
            </ul>
            You agree not to misuse our services, including engaging in illegal activities or violating intellectual property rights.
          </p>
          <h2 className="text-2xl text-amber-600 mt-6">3. Subscription and Payments</h2>
          <p>
            TourGenius offers subscription plans as outlined in our Pricing section. Payments are processed monthly, and all fees are non-refundable except where explicitly stated. Failure to pay may result in suspension of your account.
          </p>
          <h2 className="text-2xl text-amber-600 mt-6">4. Termination</h2>
          <p>
            We reserve the right to terminate or suspend your account for violations of these Terms, with or without notice. Upon termination, your access to saved data may be restricted.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;