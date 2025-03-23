
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CalendarIcon, Save } from 'lucide-react';
import { saveToGoogleCalendar } from './itinerary-utils';
import { TourItinerary } from '@/lib/types';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { calculateTotalPrice } from './itinerary-utils';

interface ItineraryHeaderProps {
  itinerary: TourItinerary;
  selectedDate: Date | undefined;
  isSaving: boolean;
}

const ItineraryHeader = ({ itinerary, selectedDate, isSaving: propIsSaving }: ItineraryHeaderProps) => {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(propIsSaving);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      toast.loading('Saving itinerary...');
      
      let totalPrice = calculateTotalPrice(itinerary);
      
      const itineraryWithPrice = {
        ...itinerary,
        totalPrice
      };

      const { data, error } = await supabase
        .from('itineraries')
        .insert({
          name: itineraryWithPrice.name,
          user_id: (await supabase.auth.getUser()).data.user?.id,
          start_date: selectedDate || new Date(),
          number_of_people: itineraryWithPrice.numberOfPeople,
          total_price: itineraryWithPrice.totalPrice,
          days: itineraryWithPrice.days,
          tour_guides: itineraryWithPrice.tourGuides
        })
        .select();

      if (error) throw error;
      
      toast.dismiss();
      toast.success('Itinerary saved successfully!');
      
      navigate('/dashboard/invoices', { state: { itinerary: itineraryWithPrice } });
    } catch (error) {
      console.error('Error saving itinerary:', error);
      toast.dismiss();
      toast.error('Failed to save itinerary');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gray-100 p-6 rounded-xl border border-gray-200 shadow-md">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent animate-gradient">
          Tour Itinerary Builder
        </h1>
        <p className="text-gray-600 mt-1">Craft your perfect journey with elegance</p>
      </div>
      <div className="flex gap-3">
        <Button 
          onClick={saveToGoogleCalendar}
          className="bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-black transition-all duration-300 hover:scale-105 shadow-md"
        >
          <CalendarIcon className="h-4 w-4 mr-2" />
          Google Calendar
        </Button>
        <Button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-black transition-all duration-300 hover:scale-105 shadow-md"
        >
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </div>
  );
};

export default ItineraryHeader;
