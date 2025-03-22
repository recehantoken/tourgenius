import React from 'react';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold text-amber-700 mb-8 text-center">Cookie Policy</h1>
        <div className="prose text-gray-600">
          <p>Last updated: March 22, 2025</p>
          <h2 className="text-2xl text-amber-600 mt-6">What Are Cookies?</h2>
          <p>
            Cookies are small text files stored on your device to enhance your experience on TourGenius.
          </p>
          <h2 className="text-2xl text-amber-600 mt-6">How We Use Cookies</h2>
          <p>
            We use cookies for authentication, analytics, and personalized content.
          </p>
          <h2 className="text-2xl text-amber-600 mt-6">Managing Cookies</h2>
          <p>
            You can disable cookies in your browser settings, though this may affect functionality.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;