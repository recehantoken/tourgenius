
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

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [hasItineraries, setHasItineraries] = useState(false);

  // Stats data - normally would come from API
  const stats = [
    { title: 'Active Tours', value: hasItineraries ? '2' : '0', icon: <Calendar className="h-5 w-5" />, color: 'text-blue-500' },
    { title: 'Total Revenue', value: hasItineraries ? formatRupiah(24500000) : formatRupiah(0), icon: <DollarSign className="h-5 w-5" />, color: 'text-green-500' },
    { title: 'Invoices', value: hasItineraries ? '3' : '0', icon: <FileText className="h-5 w-5" />, color: 'text-purple-500' },
    { title: 'Customers', value: hasItineraries ? '5' : '0', icon: <Users className="h-5 w-5" />, color: 'text-orange-500' },
  ];

  const recentItineraries = hasItineraries ? [
    { id: '1', name: 'Bali Explorer', days: 5, price: formatRupiah(24500000), date: '2023-11-15' },
    { id: '2', name: 'Yogyakarta Adventure', days: 3, price: formatRupiah(12000000), date: '2023-11-10' },
    { id: '3', name: 'Komodo Island Trek', days: 4, price: formatRupiah(18500000), date: '2023-11-05' },
  ] : [];

  // Load user data on component mount
  useEffect(() => {
    async function getUserData() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          setUserData(user);
          // Store user info in localStorage for the layout component
          localStorage.setItem('user', JSON.stringify({
            name: user.email?.split('@')[0] || 'User',
            email: user.email
          }));
          
          // Check if user has saved any itineraries
          // For demo purposes, we're using localStorage, but in a real app
          // you would fetch this from a database
          const savedItineraries = localStorage.getItem('savedItineraries');
          setHasItineraries(!!savedItineraries);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to load user data');
      } finally {
        setLoading(false);
      }
    }

    getUserData();
  }, []);

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
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Dashboard</h1>
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
                  <div className={`p-2.5 rounded-full bg-opacity-10 ${stat.color.replace('text-', 'bg-')}`}>
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
              {recentItineraries.length > 0 ? (
                <div className="space-y-4">
                  {recentItineraries.map((itinerary) => (
                    <div
                      key={itinerary.id}
                      className="p-4 border border-white/5 rounded-md hover:bg-white/5 transition-colors flex items-center justify-between"
                    >
                      <div>
                        <h3 className="font-medium text-white">{itinerary.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {itinerary.days} days · Created on {itinerary.date}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-batik-gold">{itinerary.price}</span>
                        <Button variant="outline" size="sm" className="border-batik-gold/50 text-batik-gold hover:bg-batik-gold/10">View</Button>
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
              {hasItineraries && (
                <div className="mt-4 text-center">
                  <Link to="/dashboard/itinerary">
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
