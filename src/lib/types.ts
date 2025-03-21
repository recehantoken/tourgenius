
export interface User {
  id: string;
  email: string;
  name: string;
}

export interface TourGuide {
  id: string;
  name: string;
  expertise: string;
  languages: string[];
  pricePerDay: number;
  image?: string;
}

export interface Destination {
  id: string;
  name: string;
  description: string;
  pricePerPerson: number;
  image?: string;
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  stars: number;
  pricePerNight: number;
  image?: string;
}

export interface Transportation {
  id: string;
  type: 'flight' | 'train' | 'bus' | 'car' | 'ferry';
  description: string;
  pricePerPerson: number;
}

export interface Meal {
  id: string;
  type: 'breakfast' | 'lunch' | 'dinner';
  description: string;
  pricePerPerson: number;
}

export interface DayItinerary {
  id: string;
  day: number;
  destinations: Destination[];
  hotel: Hotel | null;
  meals: Meal[];
  transportation: Transportation | null;
}

export interface TourItinerary {
  id: string;
  name: string;
  days: DayItinerary[];
  tourGuides: TourGuide[];
  totalPrice: number;
  numberOfPeople: number;
}

export interface Invoice {
  id: string;
  itineraryId: string;
  customerName: string;
  customerEmail: string;
  date: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'draft' | 'sent' | 'paid';
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}
