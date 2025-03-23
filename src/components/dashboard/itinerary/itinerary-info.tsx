
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from '@/components/ui/button';
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from 'lucide-react';
import { cn } from "@/lib/utils";
import GlassCard from '@/components/ui/glass-card';

interface ItineraryInfoProps {
  name: string;
  numberOfPeople: number;
  selectedDate: Date | undefined;
  onNameChange: (name: string) => void;
  onPeopleChange: (people: number) => void;
  onDateChange: (date: Date | undefined) => void;
}

const ItineraryInfo = ({
  name,
  numberOfPeople,
  selectedDate,
  onNameChange,
  onPeopleChange,
  onDateChange
}: ItineraryInfoProps) => {
  return (
    <GlassCard className="bg-white border border-gray-200 shadow-md">
      <div className="space-y-6 p-6">
        <div>
          <Label htmlFor="itinerary-name" className="text-gray-700">Itinerary Name</Label>
          <Input 
            id="itinerary-name" 
            value={name} 
            onChange={(e) => onNameChange(e.target.value)}
            className="bg-gray-50 border-gray-200 text-gray-900 focus:ring-amber-400/50"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="people-count" className="text-gray-700">Number of People</Label>
            <Input 
              id="people-count" 
              type="number" 
              min={1} 
              value={numberOfPeople} 
              onChange={(e) => onPeopleChange(Number(e.target.value))}
              className="bg-gray-50 border-gray-200 text-gray-900 focus:ring-amber-400/50"
            />
          </div>
          <div>
            <Label className="text-gray-700">Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal bg-gray-50 border-gray-200 text-gray-900 hover:bg-gray-100",
                    !selectedDate && "text-gray-600"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-white border-gray-200 text-gray-900">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={onDateChange}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default ItineraryInfo;
