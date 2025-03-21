
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { DayItinerary, Destination, Hotel, Meal, TourGuide, Transportation, TourItinerary } from '@/lib/types';
import { DESTINATIONS, HOTELS, MEALS, TOUR_GUIDES, TRANSPORTATIONS } from '@/lib/constants';
import { Calendar, MapPin, Hotel as HotelIcon, Utensils, Plane, Users, Plus, Trash2 } from 'lucide-react';
import GlassCard from '@/components/ui/glass-card';
import PriceCalculator from '../pricing/price-calculator';

const ItineraryBuilder = () => {
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

  const addDestination = (dayId: string, destinationId: string) => {
    const destination = DESTINATIONS.find(d => d.id === destinationId);
    if (!destination) return;
    
    setItinerary((prev) => ({
      ...prev,
      days: prev.days.map(day => {
        if (day.id === dayId) {
          return {
            ...day,
            destinations: [...day.destinations, destination]
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

  const setHotel = (dayId: string, hotelId: string | null) => {
    const hotel = hotelId ? HOTELS.find(h => h.id === hotelId) || null : null;
    
    setItinerary((prev) => ({
      ...prev,
      days: prev.days.map(day => {
        if (day.id === dayId) {
          return {
            ...day,
            hotel
          };
        }
        return day;
      })
    }));
  };

  const addMeal = (dayId: string, mealId: string) => {
    const meal = MEALS.find(m => m.id === mealId);
    if (!meal) return;
    
    setItinerary((prev) => ({
      ...prev,
      days: prev.days.map(day => {
        if (day.id === dayId) {
          return {
            ...day,
            meals: [...day.meals, meal]
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

  const setTransportation = (dayId: string, transportationId: string | null) => {
    const transportation = transportationId 
      ? TRANSPORTATIONS.find(t => t.id === transportationId) || null 
      : null;
    
    setItinerary((prev) => ({
      ...prev,
      days: prev.days.map(day => {
        if (day.id === dayId) {
          return {
            ...day,
            transportation
          };
        }
        return day;
      })
    }));
  };

  const addTourGuide = (guideId: string) => {
    const guide = TOUR_GUIDES.find(g => g.id === guideId);
    if (!guide) return;
    
    // Don't add if already added
    if (itinerary.tourGuides.some(g => g.id === guideId)) return;
    
    setItinerary((prev) => ({
      ...prev,
      tourGuides: [...prev.tourGuides, guide]
    }));
  };

  const removeTourGuide = (guideId: string) => {
    setItinerary((prev) => ({
      ...prev,
      tourGuides: prev.tourGuides.filter(g => g.id !== guideId)
    }));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tour Itinerary Builder</h1>
          <p className="text-muted-foreground">Create and customize your perfect tour itinerary</p>
        </div>
        <Button>Save Itinerary</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Itinerary Builder Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <GlassCard>
            <div className="space-y-4">
              <div>
                <Label htmlFor="itinerary-name">Itinerary Name</Label>
                <Input 
                  id="itinerary-name" 
                  value={itinerary.name} 
                  onChange={(e) => updateItineraryName(e.target.value)}
                />
              </div>
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

              <div className="flex gap-2">
                <Select onValueChange={(value) => addTourGuide(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Add a tour guide" />
                  </SelectTrigger>
                  <SelectContent>
                    {TOUR_GUIDES.map((guide) => (
                      <SelectItem key={guide.id} value={guide.id}>
                        {guide.name} - {guide.expertise}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline" onClick={() => {
                  const select = document.querySelector('[role="combobox"]') as HTMLElement;
                  if (select) select.click();
                }}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Guide
                </Button>
              </div>
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
                        <Calendar className="h-5 w-5" />
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
                              <p className="text-sm text-muted-foreground">${destination.pricePerPerson} per person</p>
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
                      <div className="flex gap-2">
                        <Select onValueChange={(value) => addDestination(day.id, value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Add a destination" />
                          </SelectTrigger>
                          <SelectContent>
                            {DESTINATIONS.map((destination) => (
                              <SelectItem key={destination.id} value={destination.id}>
                                {destination.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button variant="outline" onClick={() => {
                          const select = document.querySelector('[role="combobox"]') as HTMLElement;
                          if (select) select.click();
                        }}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Destination
                        </Button>
                      </div>
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
                              {day.hotel.location} - ${day.hotel.pricePerNight} per night
                            </p>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => setHotel(day.id, null)}
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
                      <Select onValueChange={(value) => setHotel(day.id, value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a hotel" />
                        </SelectTrigger>
                        <SelectContent>
                          {HOTELS.map((hotel) => (
                            <SelectItem key={hotel.id} value={hotel.id}>
                              {hotel.name} - {hotel.stars} Stars
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                                {meal.type.charAt(0).toUpperCase() + meal.type.slice(1)} - 
                                ${meal.pricePerPerson} per person
                              </p>
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
                      <div className="flex gap-2">
                        <Select onValueChange={(value) => addMeal(day.id, value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Add a meal" />
                          </SelectTrigger>
                          <SelectContent>
                            {MEALS.map((meal) => (
                              <SelectItem key={meal.id} value={meal.id}>
                                {meal.description} ({meal.type})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button variant="outline" onClick={() => {
                          const select = document.querySelector('[role="combobox"]') as HTMLElement;
                          if (select) select.click();
                        }}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Meal
                        </Button>
                      </div>
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
                            <p className="text-sm text-muted-foreground">
                              ${day.transportation.pricePerPerson} per person
                            </p>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => setTransportation(day.id, null)}
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
                      <Select onValueChange={(value) => setTransportation(day.id, value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select transportation" />
                        </SelectTrigger>
                        <SelectContent>
                          {TRANSPORTATIONS.map((transportation) => (
                            <SelectItem key={transportation.id} value={transportation.id}>
                              {transportation.description}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
