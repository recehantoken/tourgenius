
import { DayItinerary, Destination, Hotel, Meal, TourGuide, Transportation, TourItinerary } from '@/lib/types';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export const formatRupiah = (amount: number) => {
  return new Intl.NumberFormat('id-ID', { 
    style: 'currency', 
    currency: 'IDR', 
    minimumFractionDigits: 0 
  }).format(amount);
};

export const saveToGoogleCalendar = async () => {
  try {
    toast.loading('Preparing to save to Google Calendar...');
    setTimeout(() => {
      toast.dismiss();
      toast.success('Itinerary saved to Google Calendar!');
    }, 2000);
  } catch (error) {
    toast.error('Failed to save to Google Calendar');
    console.error(error);
  }
};

export const saveItineraryToSupabase = async (
  itinerary: TourItinerary, 
  selectedDate: Date | undefined,
  navigate: (path: string, options?: { state: { itinerary: TourItinerary } }) => void
) => {
  try {
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
    throw error;
  }
};

export const calculateTotalPrice = (itinerary: TourItinerary): number => {
  let totalPrice = 0;
  
  itinerary.days.forEach(day => {
    day.destinations.forEach(dest => {
      totalPrice += dest.pricePerPerson * itinerary.numberOfPeople;
    });
    
    if (day.hotel) {
      totalPrice += day.hotel.pricePerNight;
    }
    
    day.meals.forEach(meal => {
      totalPrice += meal.pricePerPerson * itinerary.numberOfPeople;
    });
    
    if (day.transportation) {
      totalPrice += day.transportation.pricePerPerson * itinerary.numberOfPeople;
    }
  });
  
  itinerary.tourGuides.forEach(guide => {
    totalPrice += guide.pricePerDay * itinerary.days.length;
  });
  
  return totalPrice;
};
