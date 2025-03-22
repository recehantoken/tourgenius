import React from 'react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold text-amber-700 mb-8 text-center">Terms of Service</h1>
        <div className="prose text-gray-600">
          <p>Last updated: March 22, 2025</p>
          <h2 className="text-2xl text-amber-600 mt-6">Acceptance of Terms</h2>
          <p>
            By using TourGenius, you agree to these terms and conditions.
          </p>
          <h2 className="text-2xl text-amber-600 mt-6">Service Usage</h2>
          <p>
            You may use our platform to plan tours, generate invoices, and manage clients, subject to our guidelines.
          </p>
          <h2 className="text-2xl text-amber-600 mt-6">Payments</h2>
          <p>
            All payments are non-refundable unless otherwise stated.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;