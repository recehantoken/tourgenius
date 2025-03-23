
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

export const saveToGoogleCalendar = async (itinerary: TourItinerary) => {
  try {
    toast.loading('Menyiapkan data untuk Google Calendar...');
    
    // Format dates for Google Calendar
    const startDate = itinerary.days[0]?.date || new Date();
    const endDate = itinerary.days[itinerary.days.length - 1]?.date || new Date();
    
    // Create event details
    const eventTitle = `Tour: ${itinerary.name}`;
    const eventDetails = createEventDetails(itinerary);
    const encodedTitle = encodeURIComponent(eventTitle);
    const encodedDetails = encodeURIComponent(eventDetails);
    
    // Format dates for URL
    const formatDate = (date: Date) => {
      if (!(date instanceof Date)) {
        date = new Date(date);
      }
      
      return date.toISOString().replace(/-|:|\.\d+/g, '');
    };
    
    const startDateStr = formatDate(new Date(startDate));
    const endDateStr = formatDate(new Date(endDate));
    
    // Construct Google Calendar URL
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodedTitle}&details=${encodedDetails}&dates=${startDateStr}/${endDateStr}`;
    
    // Open in new tab
    window.open(googleCalendarUrl, '_blank');
    
    toast.dismiss();
    toast.success('Google Calendar terbuka di tab baru!');
  } catch (error) {
    toast.error('Gagal menyimpan ke Google Calendar');
    console.error(error);
  }
};

// Helper function to create event details
const createEventDetails = (itinerary: TourItinerary): string => {
  let details = `${itinerary.name}\n\n`;
  details += `Jumlah orang: ${itinerary.numberOfPeople}\n`;
  details += `Total biaya: ${formatRupiah(calculateTotalPrice(itinerary))}\n\n`;
  
  // Add days information
  itinerary.days.forEach((day, index) => {
    details += `Hari ${index + 1}:\n`;
    
    // Add destinations
    if (day.destinations.length > 0) {
      details += "Destinasi:\n";
      day.destinations.forEach(dest => {
        details += `- ${dest.name}: ${formatRupiah(dest.pricePerPerson)}/orang\n`;
      });
    }
    
    // Add hotel
    if (day.hotel) {
      details += `Hotel: ${day.hotel.name} - ${formatRupiah(day.hotel.pricePerNight)}/malam\n`;
    }
    
    // Add meals
    if (day.meals.length > 0) {
      details += "Makanan:\n";
      day.meals.forEach(meal => {
        details += `- ${meal.type}: ${meal.name} - ${formatRupiah(meal.pricePerPerson)}/orang\n`;
      });
    }
    
    // Add transportation
    if (day.transportation) {
      details += `Transportasi: ${day.transportation.type} - ${formatRupiah(day.transportation.pricePerPerson)}/orang\n`;
    }
    
    details += "\n";
  });
  
  // Add tour guides
  if (itinerary.tourGuides.length > 0) {
    details += "Pemandu Wisata:\n";
    itinerary.tourGuides.forEach(guide => {
      details += `- ${guide.name} - ${formatRupiah(guide.pricePerDay)}/hari\n`;
    });
  }
  
  return details;
};

export const saveItineraryToSupabase = async (
  itinerary: TourItinerary, 
  selectedDate: Date | undefined,
  navigate: (path: string, options?: { state: { itinerary: TourItinerary } }) => void
) => {
  try {
    toast.loading('Menyimpan rencana perjalanan...');
    
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
    toast.success('Rencana perjalanan berhasil disimpan!');
    
    navigate('/dashboard/invoices', { state: { itinerary: itineraryWithPrice } });
  } catch (error) {
    console.error('Error saving itinerary:', error);
    toast.dismiss();
    toast.error('Gagal menyimpan rencana perjalanan');
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
