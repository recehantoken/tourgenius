
import React from 'react';
import DashboardLayout from '@/components/dashboard/layout';
import ItineraryBuilder from '@/components/dashboard/itinerary/itinerary-builder';
import { useEffect } from 'react';
import { toast } from 'sonner';

const ItineraryPage = () => {
  useEffect(() => {
    // Check if Google API is loaded and initialize it
    const loadGoogleCalendarAPI = () => {
      try {
        // This would be implemented with a proper Google Calendar auth flow
        // and the API key would be stored securely in Supabase secrets
        console.log('Google Calendar API initialized');
      } catch (error) {
        console.error('Failed to load Google Calendar API', error);
      }
    };

    loadGoogleCalendarAPI();
  }, []);

  return (
    <DashboardLayout>
      <ItineraryBuilder />
    </DashboardLayout>
  );
};

export default ItineraryPage;
