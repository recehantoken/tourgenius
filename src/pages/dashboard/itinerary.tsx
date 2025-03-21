
import React from 'react';
import DashboardLayout from '@/components/dashboard/layout';
import ItineraryBuilder from '@/components/dashboard/itinerary/itinerary-builder';

const ItineraryPage = () => {
  return (
    <DashboardLayout>
      <ItineraryBuilder />
    </DashboardLayout>
  );
};

export default ItineraryPage;
