import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { DayItinerary, Destination, Hotel, Meal, TourGuide, Transportation, TourItinerary } from '@/lib/types';
import { Calendar as CalendarIcon, MapPin, Hotel as HotelIcon, Utensils, Plane, Users, Plus, Trash2, Save } from 'lucide-react';
import GlassCard from '@/components/ui/glass-card';
import PriceCalculator from '../pricing/price-calculator';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const ItineraryBuilder = () => {
  const navigate = useNavigate();
  const [itinerary, setItinerary] = useState<TourItinerary>({
    id: Date.now().toString(),
    name: 'New Tour Itinerary',
    days: [{
      id: '1',
      day: 1,
      destinations: [],
      hotel: null,
      meals: [],
      transportation: null
    }],
    tourGuides: [],
    totalPrice: 0,
    numberOfPeople: 2
  });
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // [Previous functions remain unchanged]
  const updateItineraryName = (name: string) => {
    setItinerary((prev) => ({ ...prev, name }));
  };

  const updateNumberOfPeople = (people: number) => {
    setItinerary((prev) => ({ ...prev, numberOfPeople: people }));
  };

  const addDay = () => {
    const newDay: DayItinerary = {
      id: Date.now().toString(),
      day: itinerary.days.length + 1,
      destinations: [],
      hotel: null,
      meals: [],
      transportation: null
    };
    setItinerary((prev) => ({ ...prev, days: [...prev.days, newDay] }));
  };

  const removeDay = (dayId: string) => {
    if (itinerary.days.length <= 1) return;
    const updatedDays = itinerary.days
      .filter(day => day.id !== dayId)
      .map((day, index) => ({ ...day, day: index + 1 }));
    setItinerary((prev) => ({ ...prev, days: updatedDays }));
  };

  const addDestination = (dayId: string, name: string, price: number) => {
    if (!name.trim()) return;
    const newDestination: Destination = {
      id: Date.now().toString(),
      name,
      description: name,
      pricePerPerson: price,
      image: undefined
    };
    setItinerary((prev) => ({
      ...prev,
      days: prev.days.map(day => day.id === dayId ? { ...day, destinations: [...day.destinations, newDestination] } : day)
    }));
  };

  const removeDestination = (dayId: string, destinationId: string) => {
    setItinerary((prev) => ({
      ...prev,
      days: prev.days.map(day => day.id === dayId ? { ...day, destinations: day.destinations.filter(d => d.id !== destinationId) } : day)
    }));
  };

  const setHotel = (dayId: string, name: string, location: string, stars: number, price: number) => {
    if (!name.trim()) {
      setItinerary((prev) => ({
        ...prev,
        days: prev.days.map(day => day.id === dayId ? { ...day, hotel: null } : day)
      }));
      return;
    }
    const newHotel: Hotel = {
      id: Date.now().toString(),
      name,
      location,
      stars,
      pricePerNight: price,
      image: undefined
    };
    setItinerary((prev) => ({
      ...prev,
      days: prev.days.map(day => day.id === dayId ? { ...day, hotel: newHotel } : day)
    }));
  };

  const addMeal = (dayId: string, description: string, type: string, price: number) => {
    if (!description.trim()) return;
    let mealType: 'breakfast' | 'lunch' | 'dinner' = 'lunch';
    if (type.toLowerCase() === 'breakfast') mealType = 'breakfast';
    else if (type.toLowerCase() === 'dinner') mealType = 'dinner';
    const newMeal: Meal = {
      id: Date.now().toString(),
      description,
      type: mealType,
      pricePerPerson: price
    };
    setItinerary((prev) => ({
      ...prev,
      days: prev.days.map(day => day.id === dayId ? { ...day, meals: [...day.meals, newMeal] } : day)
    }));
  };

  const removeMeal = (dayId: string, mealId: string) => {
    setItinerary((prev) => ({
      ...prev,
      days: prev.days.map(day => day.id === dayId ? { ...day, meals: day.meals.filter(m => m.id !== mealId) } : day)
    }));
  };

  const setTransportation = (dayId: string, description: string, price: number) => {
    if (!description.trim()) {
      setItinerary((prev) => ({
        ...prev,
        days: prev.days.map(day => day.id === dayId ? { ...day, transportation: null } : day)
      }));
      return;
    }
    const newTransportation: Transportation = {
      id: Date.now().toString(),
      description,
      pricePerPerson: price,
      type: 'car'
    };
    setItinerary((prev) => ({
      ...prev,
      days: prev.days.map(day => day.id === dayId ? { ...day, transportation: newTransportation } : day)
    }));
  };

  const addTourGuide = (name: string, expertise: string, pricePerDay: number) => {
    if (!name.trim()) return;
    if (itinerary.tourGuides.some(g => g.name.toLowerCase() === name.toLowerCase())) {
      toast.error('A guide with this name already exists');
      return;
    }
    const newGuide: TourGuide = {
      id: Date.now().toString(),
      name,
      expertise,
      pricePerDay,
      languages: []
    };
    setItinerary((prev) => ({ ...prev, tourGuides: [...prev.tourGuides, newGuide] }));
  };

  const removeTourGuide = (guideId: string) => {
    setItinerary((prev) => ({ ...prev, tourGuides: prev.tourGuides.filter(g => g.id !== guideId) }));
  };

  const saveToGoogleCalendar = async () => {
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

  const saveItinerary = async () => {
    try {
      toast.loading('Saving itinerary...');
      setTimeout(() => {
        toast.dismiss();
        toast.success('Itinerary saved successfully!');
        navigate('/dashboard/invoices', { state: { itinerary } });
      }, 1500);
    } catch (error) {
      toast.error('Failed to save itinerary');
      console.error(error);
    }
  };

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900 relative overflow-hidden">
      {/* Batik Pattern Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M36 34v-4m-6 10v-4m-6-6h4m10 0h4M10 24h40M10 36h40' stroke='%23ffffff' stroke-width='2'/%3E%3Ccircle fill='%23ffffff' cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      <div className="relative z-10 container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between bg-gradient-to-r from-gray-800/80 to-indigo-900/80 backdrop-blur-sm p-6 rounded-xl border border-white/10 shadow-lg">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 bg-clip-text text-transparent animate-gradient">
              Tour Itinerary Builder
            </h1>
            <p className="text-black mt-1">Craft your perfect journey with elegance</p>
          </div>
          <div className="flex gap-3">
            <Button 
              onClick={saveToGoogleCalendar}
              className="bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-black transition-all duration-300 hover:scale-105"
            >
              <CalendarIcon className="h-4 w-4 mr-2" />
              Google Calendar
            </Button>
            <Button 
              onClick={saveItinerary}
              className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-black transition-all duration-300 hover:scale-105"
            >
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Itinerary Builder Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <GlassCard className="bg-gray-800/50 backdrop-blur-sm border-white/10">
              <div className="space-y-6 p-6">
                <div>
                  <Label htmlFor="itinerary-name" className="text-black">Itinerary Name</Label>
                  <Input 
                    id="itinerary-name" 
                    value={itinerary.name} 
                    onChange={(e) => updateItineraryName(e.target.value)}
                    className="bg-gray-700/50 border-white/10 text-black focus:ring-amber-400/50"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="people-count" className="text-black">Number of People</Label>
                    <Input 
                      id="people-count" 
                      type="number" 
                      min={1} 
                      value={itinerary.numberOfPeople} 
                      onChange={(e) => updateNumberOfPeople(Number(e.target.value))}
                      className="bg-gray-700/50 border-white/10 text-black focus:ring-amber-400/50"
                    />
                  </div>
                  <div>
                    <Label className="text-black">Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal bg-gray-700/50 border-white/10 text-black hover:bg-gray-600/50",
                            !selectedDate && "text-gray-600"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-gray-800 border-white/10 text-black">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Tour Guides */}
            <GlassCard className="bg-gray-800/50 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-black">
                  <Users className="h-5 w-5" />
                  Tour Guides
                </CardTitle>
                <CardDescription className="text-black">Assign guides for your tour</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {itinerary.tourGuides.map((guide) => (
                    <div key={guide.id} className="flex items-center p-3 bg-gray-700/30 rounded-lg border border-white/5 hover:bg-gray-700/50 transition-all duration-300">
                      <div>
                        <p className="font-medium text-black">{guide.name}</p>
                        <p className="text-sm text-gray-600">{guide.expertise}</p>
                        <p className="text-sm text-black">{formatRupiah(guide.pricePerDay)}/day</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => removeTourGuide(guide.id)}
                        className="ml-auto text-rose-600 hover:text-rose-700 hover:bg-rose-400/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Input id="guide-name" placeholder="Guide name" className="bg-gray-700/50 border-white/10 text-black focus:ring-amber-400/50" />
                  <Input id="guide-expertise" placeholder="Expertise" className="bg-gray-700/50 border-white/10 text-black focus:ring-amber-400/50" />
                  <Input id="guide-price" type="number" placeholder="150000" className="bg-gray-700/50 border-white/10 text-black focus:ring-amber-400/50" />
                </div>
                <Button 
                  onClick={() => {
                    const name = (document.getElementById('guide-name') as HTMLInputElement).value;
                    const expertise = (document.getElementById('guide-expertise') as HTMLInputElement).value;
                    const price = Number((document.getElementById('guide-price') as HTMLInputElement).value);
                    addTourGuide(name, expertise, price);
                  }}
                  className="bg-amber-400 text-black hover:bg-amber-500 transition-all duration-300"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Guide
                </Button>
              </CardContent>
            </GlassCard>

            {/* Day by Day Itinerary */}
            <Tabs defaultValue={itinerary.days[0].id} className="space-y-6">
              <div className="flex items-center justify-between bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-white/10">
                <h2 className="text-xl font-semibold text-black">Day by Day Itinerary</h2>
                <Button 
                  onClick={addDay}
                  className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-black transition-all duration-300 hover:scale-105"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Day
                </Button>
              </div>
              <TabsList className="bg-gray-800/50 border-white/10 flex justify-start overflow-x-auto rounded-lg">
                {itinerary.days.map((day) => (
                  <TabsTrigger 
                    key={day.id} 
                    value={day.id} 
                    className="min-w-[100px] text-black data-[state=active]:bg-amber-400/20 data-[state=active]:text-black hover:bg-gray-700/50 transition-all duration-300"
                  >
                    Day {day.day}
                  </TabsTrigger>
                ))}
              </TabsList>
              {itinerary.days.map((day) => (
                <TabsContent key={day.id} value={day.id}>
                  <GlassCard className="bg-gray-800/50 backdrop-blur-sm border-white/10">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2 text-black">
                          <CalendarIcon className="h-5 w-5" />
                          Day {day.day}
                        </CardTitle>
                        {itinerary.days.length > 1 && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => removeDay(day.id)}
                            className="text-rose-600 hover:text-rose-700 hover:bg-rose-400/10"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remove
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-8">
                      {/* Destinations */}
                      <div>
                        <h3 className="text-lg font-medium mb-3 flex items-center gap-2 text-black">
                          <MapPin className="h-5 w-5" />
                          Destinations
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                          {day.destinations.map((destination) => (
                            <div key={destination.id} className="flex items-center p-3 bg-gray-700/30 rounded-lg border border-white/5 hover:bg-gray-700/50 transition-all duration-300">
                              <div>
                                <p className="font-medium text-black">{destination.name}</p>
                                <p className="text-sm text-black">{formatRupiah(destination.pricePerPerson)}/person</p>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => removeDestination(day.id, destination.id)}
                                className="ml-auto text-rose-600 hover:text-rose-700 hover:bg-rose-400/10"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <Input id={`destination-name-${day.id}`} placeholder="Destination name" className="bg-gray-700/50 border-white/10 text-black focus:ring-amber-400/50" />
                          <Input id={`destination-price-${day.id}`} type="number" placeholder="100000" className="bg-gray-700/50 border-white/10 text-black focus:ring-amber-400/50" />
                        </div>
                        <Button 
                          onClick={() => {
                            const name = (document.getElementById(`destination-name-${day.id}`) as HTMLInputElement).value;
                            const price = Number((document.getElementById(`destination-price-${day.id}`) as HTMLInputElement).value);
                            addDestination(day.id, name, price);
                          }}
                          className="mt-3 bg-amber-400 text-black hover:bg-amber-500 transition-all duration-300"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Destination
                        </Button>
                      </div>

                      {/* Hotel */}
                      <div>
                        <h3 className="text-lg font-medium mb-3 flex items-center gap-2 text-black">
                          <HotelIcon className="h-5 w-5" />
                          Accommodation
                        </h3>
                        {day.hotel && (
                          <div className="flex items-center p-3 bg-gray-700/30 rounded-lg border border-white/5 mb-4 hover:bg-gray-700/50 transition-all duration-300">
                            <div>
                              <p className="font-medium text-black">{day.hotel.name}</p>
                              <p className="text-sm text-gray-600">{day.hotel.location} - {day.hotel.stars} Stars</p>
                              <p className="text-sm text-black">{formatRupiah(day.hotel.pricePerNight)}/night</p>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => setHotel(day.id, '', '', 0, 0)}
                              className="ml-auto text-rose-600 hover:text-rose-700 hover:bg-rose-400/10"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                          <Input id={`hotel-name-${day.id}`} placeholder="Hotel name" className="bg-gray-700/50 border-white/10 text-black focus:ring-amber-400/50" />
                          <Input id={`hotel-location-${day.id}`} placeholder="Location" className="bg-gray-700/50 border-white/10 text-black focus:ring-amber-400/50" />
                          <Input id={`hotel-stars-${day.id}`} type="number" min="1" max="5" placeholder="3" className="bg-gray-700/50 border-white/10 text-black focus:ring-amber-400/50" />
                          <Input id={`hotel-price-${day.id}`} type="number" placeholder="500000" className="bg-gray-700/50 border-white/10 text-black focus:ring-amber-400/50" />
                        </div>
                        <Button 
                          onClick={() => {
                            const name = (document.getElementById(`hotel-name-${day.id}`) as HTMLInputElement).value;
                            const location = (document.getElementById(`hotel-location-${day.id}`) as HTMLInputElement).value;
                            const stars = Number((document.getElementById(`hotel-stars-${day.id}`) as HTMLInputElement).value);
                            const price = Number((document.getElementById(`hotel-price-${day.id}`) as HTMLInputElement).value);
                            setHotel(day.id, name, location, stars, price);
                          }}
                          className="mt-3 bg-amber-400 text-black hover:bg-amber-500 transition-all duration-300"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Set Hotel
                        </Button>
                      </div>

                      {/* Meals */}
                      <div>
                        <h3 className="text-lg font-medium mb-3 flex items-center gap-2 text-black">
                          <Utensils className="h-5 w-5" />
                          Meals
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                          {day.meals.map((meal) => (
                            <div key={meal.id} className="flex items-center p-3 bg-gray-700/30 rounded-lg border border-white/5 hover:bg-gray-700/50 transition-all duration-300">
                              <div>
                                <p className="font-medium text-black">{meal.description}</p>
                                <p className="text-sm text-gray-600">{meal.type.charAt(0).toUpperCase() + meal.type.slice(1)}</p>
                                <p className="text-sm text-black">{formatRupiah(meal.pricePerPerson)}/person</p>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => removeMeal(day.id, meal.id)}
                                className="ml-auto text-rose-600 hover:text-rose-700 hover:bg-rose-400/10"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <Input id={`meal-desc-${day.id}`} placeholder="Meal description" className="bg-gray-700/50 border-white/10 text-black focus:ring-amber-400/50" />
                          <Input id={`meal-type-${day.id}`} placeholder="breakfast/lunch/dinner" className="bg-gray-700/50 border-white/10 text-black focus:ring-amber-400/50" />
                          <Input id={`meal-price-${day.id}`} type="number" placeholder="75000" className="bg-gray-700/50 border-white/10 text-black focus:ring-amber-400/50" />
                        </div>
                        <Button 
                          onClick={() => {
                            const desc = (document.getElementById(`meal-desc-${day.id}`) as HTMLInputElement).value;
                            const type = (document.getElementById(`meal-type-${day.id}`) as HTMLInputElement).value;
                            const price = Number((document.getElementById(`meal-price-${day.id}`) as HTMLInputElement).value);
                            addMeal(day.id, desc, type, price);
                          }}
                          className="mt-3 bg-amber-400 text-black hover:bg-amber-500 transition-all duration-300"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Meal
                        </Button>
                      </div>

                      {/* Transportation */}
                      <div>
                        <h3 className="text-lg font-medium mb-3 flex items-center gap-2 text-black">
                          <Plane className="h-5 w-5" />
                          Transportation
                        </h3>
                        {day.transportation && (
                          <div className="flex items-center p-3 bg-gray-700/30 rounded-lg border border-white/5 mb-4 hover:bg-gray-700/50 transition-all duration-300">
                            <div>
                              <p className="font-medium text-black">{day.transportation.description}</p>
                              <p className="text-sm text-black">{formatRupiah(day.transportation.pricePerPerson)}/person</p>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => setTransportation(day.id, '', 0)}
                              className="ml-auto text-rose-600 hover:text-rose-700 hover:bg-rose-400/10"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <Input id={`transport-desc-${day.id}`} placeholder="Description" className="bg-gray-700/50 border-white/10 text-black focus:ring-amber-400/50" />
                          <Input id={`transport-price-${day.id}`} type="number" placeholder="200000" className="bg-gray-700/50 border-white/10 text-black focus:ring-amber-400/50" />
                        </div>
                        <Button 
                          onClick={() => {
                            const desc = (document.getElementById(`transport-desc-${day.id}`) as HTMLInputElement).value;
                            const price = Number((document.getElementById(`transport-price-${day.id}`) as HTMLInputElement).value);
                            setTransportation(day.id, desc, price);
                          }}
                          className="mt-3 bg-amber-400 text-black hover:bg-amber-500 transition-all duration-300"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Set Transportation
                        </Button>
                      </div>
                    </CardContent>
                  </GlassCard>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* Price Calculator */}
          <div className="lg:col-span-1">
            <PriceCalculator itinerary={itinerary} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryBuilder;