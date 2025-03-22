
import React from 'react';
import DashboardLayout from '@/components/dashboard/layout';
import ItineraryBuilder from '@/components/dashboard/itinerary/itinerary-builder';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Toaster } from 'sonner';

const ItineraryPage = () => {
  useEffect(() => {
    // Load saved itineraries if available
    const loadSavedItineraries = () => {
      try {
        // This would load saved itineraries from Supabase
        console.log('Loading saved itineraries');
      } catch (error) {
        console.error('Failed to load saved itineraries', error);
      }
    };

    loadSavedItineraries();
  }, []);

  return (
    <DashboardLayout>
      <Toaster position="top-center" richColors />
      <ItineraryBuilder />
    </DashboardLayout>
  );
};

export default ItineraryPage;
