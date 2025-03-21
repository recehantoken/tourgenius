
import { Destination, Hotel, Meal, TourGuide, Transportation } from './types';

export const TOUR_GUIDES: TourGuide[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    expertise: 'History & Architecture',
    languages: ['English', 'French', 'Spanish'],
    pricePerDay: 250,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '2',
    name: 'Maria Garcia',
    expertise: 'Local Culture & Cuisine',
    languages: ['English', 'Spanish', 'Italian'],
    pricePerDay: 230,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '3',
    name: 'David Kim',
    expertise: 'Adventure & Outdoor Activities',
    languages: ['English', 'Korean', 'Japanese'],
    pricePerDay: 280,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  }
];

export const DESTINATIONS: Destination[] = [
  {
    id: '1',
    name: 'Eiffel Tower',
    description: 'Iconic iron tower in Paris with panoramic city views',
    pricePerPerson: 25,
    image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '2',
    name: 'Louvre Museum',
    description: 'World\'s largest art museum and historic monument in Paris',
    pricePerPerson: 17,
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '3',
    name: 'Montmartre',
    description: 'Historic hill district with artist legacy and basilica',
    pricePerPerson: 15,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '4',
    name: 'Palace of Versailles',
    description: 'Opulent royal residence with formal gardens and fountains',
    pricePerPerson: 18,
    image: 'https://images.unsplash.com/photo-1548115184-bc6544d06a58?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  }
];

export const HOTELS: Hotel[] = [
  {
    id: '1',
    name: 'Grand Hotel Paris',
    location: 'Paris, France',
    stars: 5,
    pricePerNight: 450,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '2',
    name: 'Boutique Marais',
    location: 'Paris, France',
    stars: 4,
    pricePerNight: 320,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '3',
    name: 'Riverside Inn',
    location: 'Paris, France',
    stars: 3,
    pricePerNight: 180,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  }
];

export const TRANSPORTATIONS: Transportation[] = [
  {
    id: '1',
    type: 'flight',
    description: 'Economy Class Flight',
    pricePerPerson: 350
  },
  {
    id: '2',
    type: 'train',
    description: 'High-speed Train',
    pricePerPerson: 120
  },
  {
    id: '3',
    type: 'bus',
    description: 'Luxury Coach Bus',
    pricePerPerson: 60
  },
  {
    id: '4',
    type: 'car',
    description: 'Private Car with Driver',
    pricePerPerson: 200
  }
];

export const MEALS: Meal[] = [
  {
    id: '1',
    type: 'breakfast',
    description: 'Continental Breakfast',
    pricePerPerson: 18
  },
  {
    id: '2',
    type: 'breakfast',
    description: 'Full Breakfast Buffet',
    pricePerPerson: 25
  },
  {
    id: '3',
    type: 'lunch',
    description: 'Light Lunch',
    pricePerPerson: 30
  },
  {
    id: '4',
    type: 'lunch',
    description: 'Gourmet Lunch',
    pricePerPerson: 45
  },
  {
    id: '5',
    type: 'dinner',
    description: 'Casual Dinner',
    pricePerPerson: 35
  },
  {
    id: '6',
    type: 'dinner',
    description: 'Fine Dining Experience',
    pricePerPerson: 75
  }
];
