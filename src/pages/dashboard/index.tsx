
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/layout';
import { Button } from '@/components/ui/button';
import { CalendarIcon, FileText, Users, Settings, Plus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { TourItinerary } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

const Dashboard = () => {
  const navigate = useNavigate();
  const [itineraries, setItineraries] = useState<TourItinerary[]>([]);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState<'id' | 'en'>(
    localStorage.getItem('language') as 'id' | 'en' || 'en'
  );

  const translations = {
    en: {
      title: 'Dashboard',
      subtitle: 'Your tour itineraries at a glance',
      createItinerary: 'Create New Itinerary',
      noItineraries: 'No itineraries created yet.',
      name: 'Name',
      startDate: 'Start Date',
      numberOfPeople: 'Number of People',
      totalPrice: 'Total Price',
      days: 'Days',
      tourGuides: 'Tour Guides',
      view: 'View',
    },
    id: {
      title: 'Dasbor',
      subtitle: 'Rencana perjalanan wisata Anda sekilas',
      createItinerary: 'Buat Rencana Perjalanan Baru',
      noItineraries: 'Belum ada rencana perjalanan yang dibuat.',
      name: 'Nama',
      startDate: 'Tanggal Mulai',
      numberOfPeople: 'Jumlah Orang',
      totalPrice: 'Total Harga',
      days: 'Hari',
      tourGuides: 'Pemandu Wisata',
      view: 'Lihat',
    },
  };

  const t = translations[language];

  useEffect(() => {
    let mounted = true;
    
    const fetchItineraries = async () => {
      if (!mounted) return;
      
      setLoading(true);
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session?.user) {
          navigate('/auth');
          return;
        }
        
        const { data, error } = await supabase
          .from('itineraries')
          .select('*')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('Error fetching itineraries:', error);
          toast.error('Failed to load your itineraries');
          return;
        }
        
        // Parse JSON fields and convert to TourItinerary structure
        const parsedData = data.map(item => ({
          id: item.id,
          name: item.name,
          days: typeof item.days === 'string' ? JSON.parse(item.days) : item.days,
          tourGuides: typeof item.tour_guides === 'string' ? JSON.parse(item.tour_guides) : item.tour_guides,
          totalPrice: item.total_price,
          numberOfPeople: item.number_of_people,
          start_date: item.start_date,
          created_at: item.created_at,
          updated_at: item.updated_at,
          user_id: item.user_id
        }));
        
        if (mounted) {
          setItineraries(parsedData);
          setLoading(false);
        }
      } catch (error) {
        console.error('Dashboard error:', error);
        if (mounted) {
          toast.error('An error occurred while loading the dashboard');
          setLoading(false);
        }
      }
    };
    
    fetchItineraries();
    
    return () => {
      mounted = false;
    };
  }, [navigate]);

  const handleCreateItinerary = () => {
    navigate('/dashboard/itinerary');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-100">{t.title}</h1>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </div>

        <Button onClick={handleCreateItinerary} className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-black transition-all duration-300 hover:scale-105 shadow-md">
          <Plus className="h-4 w-4 mr-2" />
          {t.createItinerary}
        </Button>

        <Separator />

        {loading ? (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="bg-gray-100 border-gray-200 shadow-md">
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-8 w-24 mt-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : itineraries.length > 0 ? (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {itineraries.map((itinerary) => (
              <Card key={itinerary.id} className="bg-gray-100 border-gray-200 shadow-md">
                <CardHeader>
                  <CardTitle>{itinerary.name}</CardTitle>
                  <CardDescription>
                    {t.startDate}: {itinerary.start_date ? new Date(itinerary.start_date).toLocaleDateString() : 'N/A'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p>{t.numberOfPeople}: {itinerary.numberOfPeople}</p>
                  <p>{t.totalPrice}: ${itinerary.totalPrice}</p>
                  <Button variant="secondary" onClick={() => navigate('/dashboard/itinerary')}>
                    {t.view}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">
            <p>{t.noItineraries}</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
