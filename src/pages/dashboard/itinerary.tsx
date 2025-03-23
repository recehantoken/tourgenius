
import React, { useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/layout';
import ItineraryBuilder from '@/components/dashboard/itinerary/itinerary-builder';
import { toast } from 'sonner';
import { Toaster } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

const ItineraryPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error('Please login to access this page');
        navigate('/auth');
      }
    };

    checkAuth();

    // Load saved itineraries if available
    const loadSavedItineraries = async () => {
      try {
        const { data, error } = await supabase
          .from('itineraries')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        
        if (data && data.length > 0) {
          console.log('Loaded saved itineraries:', data.length);
        }
      } catch (error) {
        console.error('Failed to load saved itineraries', error);
      }
    };

    loadSavedItineraries();
  }, [navigate]);

  return (
    <DashboardLayout>
      <Toaster position="top-center" richColors />
      <ItineraryBuilder />
    </DashboardLayout>
  );
};

export default ItineraryPage;
