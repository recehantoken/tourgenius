
import React from 'react';
import DashboardLayout from '@/components/dashboard/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Calendar, DollarSign, FileText, Plus, Users } from 'lucide-react';
import GlassCard from '@/components/ui/glass-card';

const Dashboard = () => {
  // In a real app, we'd fetch this data from an API
  const stats = [
    { title: 'Active Tours', value: '12', icon: <Calendar className="h-5 w-5" />, color: 'text-blue-500' },
    { title: 'Total Revenue', value: '$24,500', icon: <DollarSign className="h-5 w-5" />, color: 'text-green-500' },
    { title: 'Invoices', value: '16', icon: <FileText className="h-5 w-5" />, color: 'text-purple-500' },
    { title: 'Customers', value: '38', icon: <Users className="h-5 w-5" />, color: 'text-orange-500' },
  ];

  const recentItineraries = [
    { id: '1', name: 'Paris Explorer', days: 5, price: '$2,450', date: '2023-11-15' },
    { id: '2', name: 'Italian Adventure', days: 7, price: '$3,200', date: '2023-11-10' },
    { id: '3', name: 'Tokyo Discovery', days: 6, price: '$2,800', date: '2023-11-05' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back to your tour planning dashboard</p>
          </div>
          <Link to="/dashboard/itinerary">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Itinerary
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <GlassCard key={i} className="animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
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
          <GlassCard className="lg:col-span-2 animate-fade-up animation-delay-300">
            <CardHeader>
              <CardTitle>Recent Itineraries</CardTitle>
              <CardDescription>Your recently created tour plans</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentItineraries.map((itinerary) => (
                  <div
                    key={itinerary.id}
                    className="p-4 border rounded-md hover:bg-muted/20 transition-colors flex items-center justify-between"
                  >
                    <div>
                      <h3 className="font-medium">{itinerary.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {itinerary.days} days · Created on {itinerary.date}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-medium">{itinerary.price}</span>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Link to="/dashboard/itinerary">
                  <Button variant="outline">View All Itineraries</Button>
                </Link>
              </div>
            </CardContent>
          </GlassCard>

          {/* Quick Actions */}
          <GlassCard className="animate-fade-up animation-delay-500">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link to="/dashboard/itinerary">
                <Button className="w-full justify-start">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Itinerary
                </Button>
              </Link>
              <Link to="/dashboard/invoices">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Invoice
                </Button>
              </Link>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                View Calendar
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Manage Customers
              </Button>
            </CardContent>
          </GlassCard>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
