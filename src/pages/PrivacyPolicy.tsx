import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold text-amber-700 mb-8 text-center">Privacy Policy</h1>
        <div className="prose text-gray-600">
          <p>Last updated: March 22, 2025</p>
          <h2 className="text-2xl text-amber-600 mt-6">Introduction</h2>
          <p>
            TourGenius values your privacy. This policy explains how we collect, use, and protect your personal information.
          </p>
          <h2 className="text-2xl text-amber-600 mt-6">Data Collection</h2>
          <p>
            We collect information such as your name, email, and payment details when you use our services.
          </p>
          <h2 className="text-2xl text-amber-600 mt-6">Data Usage</h2>
          <p>
            Your data is used to provide and improve our tour planning services, process payments, and communicate with you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;