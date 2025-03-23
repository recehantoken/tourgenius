
import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Calendar, DollarSign, FileText, Plus, Users } from 'lucide-react';
import GlassCard from '@/components/ui/glass-card';
import { Skeleton } from '@/components/ui/skeleton';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { formatRupiah } from '@/lib/utils';

interface Itinerary {
  id: string;
  name: string;
  total_price: number;
  created_at: string;
  number_of_people: number;
  days: any[];
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  created_at: string;
}

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get user session
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          toast.error('Session expired. Please login again.');
          return;
        }

        // Set user data
        setUserData(session.user);
        
        // Store user info in localStorage for the layout component
        localStorage.setItem('user', JSON.stringify({
          name: session.user.email?.split('@')[0] || 'User',
          email: session.user.email
        }));

        // Fetch itineraries
        const { data: itineraryData, error: itineraryError } = await supabase
          .from('itineraries')
          .select('*')
          .order('created_at', { ascending: false });

        if (itineraryError) throw itineraryError;
        
        setItineraries(itineraryData || []);
        
        // Calculate total revenue
        const revenue = itineraryData ? itineraryData.reduce((sum, item) => sum + Number(item.total_price), 0) : 0;
        setTotalRevenue(revenue);

        // Fetch customers
        const { data: customerData, error: customerError } = await supabase
          .from('customers')
          .select('*')
          .order('created_at', { ascending: false });

        if (customerError) throw customerError;
        
        setCustomers(customerData || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT') {
          window.location.href = '/auth';
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Stats data based on actual data
  const stats = [
    { 
      title: 'Active Tours', 
      value: itineraries.length.toString(), 
      icon: <Calendar className="h-5 w-5" />, 
      color: 'text-blue-500' 
    },
    { 
      title: 'Total Revenue', 
      value: formatRupiah(totalRevenue), 
      icon: <DollarSign className="h-5 w-5" />, 
      color: 'text-green-500' 
    },
    { 
      title: 'Invoices', 
      value: itineraries.length.toString(), 
      icon: <FileText className="h-5 w-5" />, 
      color: 'text-purple-500' 
    },
    { 
      title: 'Customers', 
      value: customers.length.toString(), 
      icon: <Users className="h-5 w-5" />, 
      color: 'text-orange-500' 
    },
  ];

  if (loading) {
    return (
      <DashboardLayout>
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <Skeleton className="h-8 w-64 mb-2" />
              <Skeleton className="h-5 w-80" />
            </div>
            <Skeleton className="h-10 w-36" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Skeleton className="h-96 w-full lg:col-span-2" />
            <Skeleton className="h-96 w-full" />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-100">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back to your tour planning dashboard</p>
          </div>
          <Link to="/dashboard/itinerary">
            <Button className="bg-gradient-to-r from-batik-gold to-primary hover:opacity-90 text-batik-dark font-semibold">
              <Plus className="h-4 w-4 mr-2" />
              New Itinerary
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <GlassCard key={i} className="animate-fade-up border border-white/5 bg-batik-dark/40" style={{ animationDelay: `${i * 100}ms` }}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-2.5 rounded-full bg-opacity-50 ${stat.color.replace('text-', 'bg-')}`}>
                    <div className={stat.color}>{stat.icon}</div>
                  </div>
                </div>
              </CardContent>
            </GlassCard>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Itineraries */}
          <GlassCard className="lg:col-span-2 animate-fade-up animation-delay-300 border border-white/5 bg-batik-dark/40">
            <CardHeader>
              <CardTitle className="text-white">Recent Itineraries</CardTitle>
              <CardDescription>Your recently created tour plans</CardDescription>
            </CardHeader>
            <CardContent>
              {itineraries.length > 0 ? (
                <div className="space-y-4">
                  {itineraries.slice(0, 3).map((itinerary) => (
                    <div
                      key={itinerary.id}
                      className="p-4 border border-white/5 rounded-md hover:bg-white/5 transition-colors flex items-center justify-between"
                    >
                      <div>
                        <h3 className="font-medium text-white">{itinerary.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {itinerary.days.length} days · Created on {new Date(itinerary.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-batik-gold">{formatRupiah(itinerary.total_price)}</span>
                        <Link to="/dashboard/invoices" state={{ itineraryId: itinerary.id }}>
                          <Button variant="outline" size="sm" className="border-batik-gold/50 text-batik-gold hover:bg-batik-gold/10">View</Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-md">
                  <Calendar className="h-12 w-12 text-muted-foreground mb-3" />
                  <h3 className="text-lg font-medium">No Itineraries Yet</h3>
                  <p className="text-muted-foreground mt-1 mb-6 text-center max-w-md">
                    Create your first tour itinerary to see it here. You can plan day-by-day activities, accommodations, and more.
                  </p>
                  <Link to="/dashboard/itinerary">
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Create First Itinerary
                    </Button>
                  </Link>
                </div>
              )}
              {itineraries.length > 0 && (
                <div className="mt-4 text-center">
                  <Link to="/dashboard/invoices">
                    <Button variant="outline" className="border-batik-gold/50 text-batik-gold hover:bg-batik-gold/10">View All Itineraries</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </GlassCard>

          {/* Quick Actions */}
          <GlassCard className="animate-fade-up animation-delay-500 border border-white/5 bg-batik-dark/40">
            <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link to="/dashboard/itinerary">
                <Button className="w-full justify-start bg-gradient-to-r from-batik-gold to-primary hover:opacity-90 text-batik-dark font-semibold">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Itinerary
                </Button>
              </Link>
              <Link to="/dashboard/invoices">
                <Button variant="outline" className="w-full justify-start border-white/10 hover:bg-white/5">
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Invoice
                </Button>
              </Link>
              <Link to="/dashboard/itinerary">
                <Button variant="outline" className="w-full justify-start border-white/10 hover:bg-white/5">
                  <Calendar className="mr-2 h-4 w-4" />
                  View Calendar
                </Button>
              </Link>
              <Link to="/dashboard/customers">
                <Button variant="outline" className="w-full justify-start border-white/10 hover:bg-white/5">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Customers
                </Button>
              </Link>
            </CardContent>
          </GlassCard>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
