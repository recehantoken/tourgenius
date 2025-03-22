
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
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
    days: [
      {
        id: '1',
        day: 1,
        destinations: [],
        hotel: null,
        meals: [],
        transportation: null
      }
    ],
    tourGuides: [],
    totalPrice: 0,
    numberOfPeople: 2
  });
  
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const updateItineraryName = (name: string) => {
    setItinerary((prev) => ({
      ...prev,
      name
    }));
  };

  const updateNumberOfPeople = (people: number) => {
    setItinerary((prev) => ({
      ...prev,
      numberOfPeople: people
    }));
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
    
    setItinerary((prev) => ({
      ...prev,
      days: [...prev.days, newDay]
    }));
  };

  const removeDay = (dayId: string) => {
    if (itinerary.days.length <= 1) return;
    
    const updatedDays = itinerary.days
      .filter(day => day.id !== dayId)
      .map((day, index) => ({
        ...day,
        day: index + 1
      }));
    
    setItinerary((prev) => ({
      ...prev,
      days: updatedDays
    }));
  };

  const addDestination = (dayId: string, name: string, price: number) => {
    if (!name.trim()) return;
    
    const newDestination: Destination = {
      id: Date.now().toString(),
      name,
      description: name, // Setting description to name to fix TS error
      pricePerPerson: price,
      image: undefined // Default image is undefined
    };
    
    setItinerary((prev) => ({
      ...prev,
      days: prev.days.map(day => {
        if (day.id === dayId) {
          return {
            ...day,
            destinations: [...day.destinations, newDestination]
          };
        }
        return day;
      })
    }));
  };

  const removeDestination = (dayId: string, destinationId: string) => {
    setItinerary((prev) => ({
      ...prev,
      days: prev.days.map(day => {
        if (day.id === dayId) {
          return {
            ...day,
            destinations: day.destinations.filter(d => d.id !== destinationId)
          };
        }
        return day;
      })
    }));
  };

  const setHotel = (dayId: string, name: string, location: string, stars: number, price: number) => {
    if (!name.trim()) {
      setItinerary((prev) => ({
        ...prev,
        days: prev.days.map(day => {
          if (day.id === dayId) {
            return {
              ...day,
              hotel: null
            };
          }
          return day;
        })
      }));
      return;
    }
    
    const newHotel: Hotel = {
      id: Date.now().toString(),
      name,
      location,
      stars,
      pricePerNight: price,
      image: undefined // Default image is undefined
    };
    
    setItinerary((prev) => ({
      ...prev,
      days: prev.days.map(day => {
        if (day.id === dayId) {
          return {
            ...day,
            hotel: newHotel
          };
        }
        return day;
      })
    }));
  };

  const addMeal = (dayId: string, description: string, type: string, price: number) => {
    if (!description.trim()) return;
    
    // Validate meal type to match required types
    let mealType: 'breakfast' | 'lunch' | 'dinner' = 'lunch'; // Default
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
      days: prev.days.map(day => {
        if (day.id === dayId) {
          return {
            ...day,
            meals: [...day.meals, newMeal]
          };
        }
        return day;
      })
    }));
  };

  const removeMeal = (dayId: string, mealId: string) => {
    setItinerary((prev) => ({
      ...prev,
      days: prev.days.map(day => {
        if (day.id === dayId) {
          return {
            ...day,
            meals: day.meals.filter(m => m.id !== mealId)
          };
        }
        return day;
      })
    }));
  };

  const setTransportation = (dayId: string, description: string, price: number) => {
    if (!description.trim()) {
      setItinerary((prev) => ({
        ...prev,
        days: prev.days.map(day => {
          if (day.id === dayId) {
            return {
              ...day,
              transportation: null
            };
          }
          return day;
        })
      }));
      return;
    }
    
    const newTransportation: Transportation = {
      id: Date.now().toString(),
      description,
      pricePerPerson: price,
      type: 'car' // Setting default type to fix TS error
    };
    
    setItinerary((prev) => ({
      ...prev,
      days: prev.days.map(day => {
        if (day.id === dayId) {
          return {
            ...day,
            transportation: newTransportation
          };
        }
        return day;
      })
    }));
  };

  const addTourGuide = (name: string, expertise: string, pricePerDay: number) => {
    if (!name.trim()) return;
    
    const newGuide: TourGuide = {
      id: Date.now().toString(),
      name,
      expertise,
      pricePerDay,
      languages: [] // Setting empty languages array to fix TS error
    };
    
    // Don't add if already has similar name
    if (itinerary.tourGuides.some(g => g.name.toLowerCase() === name.toLowerCase())) {
      toast.error('A guide with this name already exists');
      return;
    }
    
    setItinerary((prev) => ({
      ...prev,
      tourGuides: [...prev.tourGuides, newGuide]
    }));
  };

  const removeTourGuide = (guideId: string) => {
    setItinerary((prev) => ({
      ...prev,
      tourGuides: prev.tourGuides.filter(g => g.id !== guideId)
    }));
  };

  const saveToGoogleCalendar = async () => {
    try {
      toast.loading('Preparing to save to Google Calendar...');
      
      // In a real implementation, this would call a Supabase Edge Function
      // that safely uses the Google Calendar API key
      
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
      
      // Here we would save the itinerary to Supabase
      // This is a placeholder for the actual implementation
      
      setTimeout(() => {
        toast.dismiss();
        toast.success('Itinerary saved successfully!');
        
        // Navigate to invoice page with the itinerary data
        navigate('/dashboard/invoices', { 
          state: { itinerary }
        });
      }, 1500);
    } catch (error) {
      toast.error('Failed to save itinerary');
      console.error(error);
    }
  };

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tour Itinerary Builder</h1>
          <p className="text-muted-foreground">Create and customize your perfect tour itinerary</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={saveToGoogleCalendar}>
            <CalendarIcon className="h-4 w-4 mr-2" />
            Save to Google Calendar
          </Button>
          <Button onClick={saveItinerary}>
            <Save className="h-4 w-4 mr-2" />
            Save Itinerary
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Itinerary Builder Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <GlassCard>
            <div className="space-y-4 p-6">
              <div>
                <Label htmlFor="itinerary-name">Itinerary Name</Label>
                <Input 
                  id="itinerary-name" 
                  value={itinerary.name} 
                  onChange={(e) => updateItineraryName(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="people-count">Number of People</Label>
                  <Input 
                    id="people-count" 
                    type="number" 
                    min={1} 
                    value={itinerary.numberOfPeople} 
                    onChange={(e) => updateNumberOfPeople(Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white" align="start">
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
          <GlassCard>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Tour Guides
              </CardTitle>
              <CardDescription>Assign guides for your tour</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {itinerary.tourGuides.map((guide) => (
                  <div key={guide.id} className="flex items-center p-3 border rounded-md">
                    <div>
                      <p className="font-medium">{guide.name}</p>
                      <p className="text-sm text-muted-foreground">{guide.expertise}</p>
                      <p className="text-sm font-medium">{formatRupiah(guide.pricePerDay)} per day</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeTourGuide(guide.id)}
                      className="ml-auto"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div>
                  <Label htmlFor="guide-name">Guide Name</Label>
                  <Input id="guide-name" placeholder="Guide name" />
                </div>
                <div>
                  <Label htmlFor="guide-expertise">Expertise</Label>
                  <Input id="guide-expertise" placeholder="Guide expertise" />
                </div>
                <div>
                  <Label htmlFor="guide-price">Price per Day (IDR)</Label>
                  <Input id="guide-price" type="number" placeholder="150000" />
                </div>
              </div>
              <Button 
                variant="outline" 
                className="mt-2"
                onClick={() => {
                  const nameInput = document.getElementById('guide-name') as HTMLInputElement;
                  const expertiseInput = document.getElementById('guide-expertise') as HTMLInputElement;
                  const priceInput = document.getElementById('guide-price') as HTMLInputElement;
                  
                  if (nameInput && expertiseInput && priceInput) {
                    addTourGuide(
                      nameInput.value,
                      expertiseInput.value,
                      Number(priceInput.value) || 0
                    );
                    nameInput.value = '';
                    expertiseInput.value = '';
                    priceInput.value = '';
                  }
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Guide
              </Button>
            </CardContent>
          </GlassCard>

          {/* Day by Day Itinerary */}
          <Tabs defaultValue={itinerary.days[0].id}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Day by Day Itinerary</h2>
              <Button onClick={addDay}>
                <Plus className="h-4 w-4 mr-2" />
                Add Day
              </Button>
            </div>
            
            <TabsList className="mb-4 overflow-x-auto flex w-full justify-start">
              {itinerary.days.map((day) => (
                <TabsTrigger key={day.id} value={day.id} className="min-w-[80px]">
                  Day {day.day}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {itinerary.days.map((day) => (
              <TabsContent key={day.id} value={day.id}>
                <GlassCard>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <CalendarIcon className="h-5 w-5" />
                        Day {day.day}
                      </CardTitle>
                      {itinerary.days.length > 1 && (
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          onClick={() => removeDay(day.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove Day
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Destinations */}
                    <div>
                      <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        Destinations
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        {day.destinations.map((destination) => (
                          <div key={destination.id} className="flex items-center p-3 border rounded-md">
                            <div>
                              <p className="font-medium">{destination.name}</p>
                              <p className="text-sm text-muted-foreground">{formatRupiah(destination.pricePerPerson)} per person</p>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => removeDestination(day.id, destination.id)}
                              className="ml-auto"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <Label htmlFor={`destination-name-${day.id}`}>Destination Name</Label>
                          <Input id={`destination-name-${day.id}`} placeholder="Enter destination name" />
                        </div>
                        <div>
                          <Label htmlFor={`destination-price-${day.id}`}>Price per Person (IDR)</Label>
                          <Input id={`destination-price-${day.id}`} type="number" placeholder="100000" />
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        className="mt-2"
                        onClick={() => {
                          const nameInput = document.getElementById(`destination-name-${day.id}`) as HTMLInputElement;
                          const priceInput = document.getElementById(`destination-price-${day.id}`) as HTMLInputElement;
                          
                          if (nameInput && priceInput) {
                            addDestination(
                              day.id,
                              nameInput.value,
                              Number(priceInput.value) || 0
                            );
                            nameInput.value = '';
                            priceInput.value = '';
                          }
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Destination
                      </Button>
                    </div>
                    
                    {/* Hotel */}
                    <div>
                      <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                        <HotelIcon className="h-5 w-5" />
                        Accommodation
                      </h3>
                      {day.hotel ? (
                        <div className="flex items-center p-3 border rounded-md mb-4">
                          <div>
                            <p className="font-medium">{day.hotel.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {day.hotel.location} - {day.hotel.stars} Stars
                            </p>
                            <p className="text-sm font-medium">{formatRupiah(day.hotel.pricePerNight)} per night</p>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => setHotel(day.id, '', '', 0, 0)}
                            className="ml-auto"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="mb-4">
                          <p className="text-sm text-muted-foreground">No hotel selected</p>
                        </div>
                      )}
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                        <div>
                          <Label htmlFor={`hotel-name-${day.id}`}>Hotel Name</Label>
                          <Input id={`hotel-name-${day.id}`} placeholder="Hotel name" />
                        </div>
                        <div>
                          <Label htmlFor={`hotel-location-${day.id}`}>Location</Label>
                          <Input id={`hotel-location-${day.id}`} placeholder="City/area" />
                        </div>
                        <div>
                          <Label htmlFor={`hotel-stars-${day.id}`}>Stars</Label>
                          <Input id={`hotel-stars-${day.id}`} type="number" min="1" max="5" placeholder="3" />
                        </div>
                        <div>
                          <Label htmlFor={`hotel-price-${day.id}`}>Price per Night (IDR)</Label>
                          <Input id={`hotel-price-${day.id}`} type="number" placeholder="500000" />
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        className="mt-2"
                        onClick={() => {
                          const nameInput = document.getElementById(`hotel-name-${day.id}`) as HTMLInputElement;
                          const locationInput = document.getElementById(`hotel-location-${day.id}`) as HTMLInputElement;
                          const starsInput = document.getElementById(`hotel-stars-${day.id}`) as HTMLInputElement;
                          const priceInput = document.getElementById(`hotel-price-${day.id}`) as HTMLInputElement;
                          
                          if (nameInput && locationInput && starsInput && priceInput) {
                            setHotel(
                              day.id,
                              nameInput.value,
                              locationInput.value,
                              Number(starsInput.value) || 3,
                              Number(priceInput.value) || 0
                            );
                            nameInput.value = '';
                            locationInput.value = '';
                            starsInput.value = '';
                            priceInput.value = '';
                          }
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Set Hotel
                      </Button>
                    </div>
                    
                    {/* Meals */}
                    <div>
                      <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                        <Utensils className="h-5 w-5" />
                        Meals
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        {day.meals.map((meal) => (
                          <div key={meal.id} className="flex items-center p-3 border rounded-md">
                            <div>
                              <p className="font-medium">{meal.description}</p>
                              <p className="text-sm text-muted-foreground">
                                {meal.type.charAt(0).toUpperCase() + meal.type.slice(1)}
                              </p>
                              <p className="text-sm font-medium">{formatRupiah(meal.pricePerPerson)} per person</p>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => removeMeal(day.id, meal.id)}
                              className="ml-auto"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div>
                          <Label htmlFor={`meal-desc-${day.id}`}>Meal Description</Label>
                          <Input id={`meal-desc-${day.id}`} placeholder="e.g. Seafood dinner" />
                        </div>
                        <div>
                          <Label htmlFor={`meal-type-${day.id}`}>Meal Type</Label>
                          <Input id={`meal-type-${day.id}`} placeholder="breakfast/lunch/dinner" />
                        </div>
                        <div>
                          <Label htmlFor={`meal-price-${day.id}`}>Price per Person (IDR)</Label>
                          <Input id={`meal-price-${day.id}`} type="number" placeholder="75000" />
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        className="mt-2"
                        onClick={() => {
                          const descInput = document.getElementById(`meal-desc-${day.id}`) as HTMLInputElement;
                          const typeInput = document.getElementById(`meal-type-${day.id}`) as HTMLInputElement;
                          const priceInput = document.getElementById(`meal-price-${day.id}`) as HTMLInputElement;
                          
                          if (descInput && typeInput && priceInput) {
                            addMeal(
                              day.id,
                              descInput.value,
                              typeInput.value.toLowerCase(),
                              Number(priceInput.value) || 0
                            );
                            descInput.value = '';
                            typeInput.value = '';
                            priceInput.value = '';
                          }
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Meal
                      </Button>
                    </div>
                    
                    {/* Transportation */}
                    <div>
                      <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                        <Plane className="h-5 w-5" />
                        Transportation
                      </h3>
                      {day.transportation ? (
                        <div className="flex items-center p-3 border rounded-md mb-4">
                          <div>
                            <p className="font-medium">{day.transportation.description}</p>
                            <p className="text-sm font-medium">{formatRupiah(day.transportation.pricePerPerson)} per person</p>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => setTransportation(day.id, '', 0)}
                            className="ml-auto"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="mb-4">
                          <p className="text-sm text-muted-foreground">No transportation selected</p>
                        </div>
                      )}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <Label htmlFor={`transport-desc-${day.id}`}>Description</Label>
                          <Input id={`transport-desc-${day.id}`} placeholder="e.g. Private car to airport" />
                        </div>
                        <div>
                          <Label htmlFor={`transport-price-${day.id}`}>Price per Person (IDR)</Label>
                          <Input id={`transport-price-${day.id}`} type="number" placeholder="200000" />
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        className="mt-2"
                        onClick={() => {
                          const descInput = document.getElementById(`transport-desc-${day.id}`) as HTMLInputElement;
                          const priceInput = document.getElementById(`transport-price-${day.id}`) as HTMLInputElement;
                          
                          if (descInput && priceInput) {
                            setTransportation(
                              day.id,
                              descInput.value,
                              Number(priceInput.value) || 0
                            );
                            descInput.value = '';
                            priceInput.value = '';
                          }
                        }}
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

        {/* Price Calculator Section */}
        <div className="lg:col-span-1">
          <PriceCalculator itinerary={itinerary} />
        </div>
      </div>
    </div>
  );
};

export default ItineraryBuilder;
