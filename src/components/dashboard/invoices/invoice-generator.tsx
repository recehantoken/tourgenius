
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Invoice, TourItinerary } from '@/lib/types';
import { Calendar, Download, FileText, Printer, Send } from 'lucide-react';
import { toast } from 'sonner';
import GlassCard from '@/components/ui/glass-card';
import { useLocation, useNavigate } from 'react-router-dom';

interface InvoiceGeneratorProps {
  itinerary?: TourItinerary;
}

const InvoiceGenerator = ({ itinerary: propItinerary }: InvoiceGeneratorProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [itinerary, setItinerary] = useState<TourItinerary | undefined>(propItinerary);
  
  // Get itinerary from location state if not provided as prop
  useEffect(() => {
    if (location.state?.itinerary && !propItinerary) {
      setItinerary(location.state.itinerary);
    }
  }, [location.state?.itinerary, propItinerary]);

  const [invoice, setInvoice] = useState<Partial<Invoice>>({
    customerName: '',
    customerEmail: '',
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'draft'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInvoice(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerateInvoice = () => {
    if (!invoice.customerName || !invoice.customerEmail) {
      toast.error('Please fill in all required fields');
      return;
    }

    // In a real app, we'd save the invoice to a database
    toast.success('Invoice generated successfully!');
  };

  const handleSendInvoice = () => {
    if (!invoice.customerName || !invoice.customerEmail) {
      toast.error('Please fill in all required fields');
      return;
    }

    // In a real app, we'd send the invoice via email
    toast.success('Invoice sent to customer!');
    setInvoice(prev => ({ ...prev, status: 'sent' }));
  };

  const handleAddToCalendar = () => {
    if (!itinerary) {
      toast.error('No itinerary data available');
      return;
    }
    
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

  // Format currency in Indonesian Rupiah
  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Prepare invoice items from itinerary data
  const generateInvoiceItems = () => {
    if (!itinerary) return [];
    
    const items = [];
    
    // Add destinations
    if (itinerary.days.some(day => day.destinations.length > 0)) {
      const totalDestinationsCost = itinerary.days.reduce((sum, day) => {
        return sum + day.destinations.reduce((daySum, dest) => 
          daySum + dest.pricePerPerson * itinerary.numberOfPeople, 0);
      }, 0);
      
      items.push({
        id: '1',
        description: 'Destinations & Attractions',
        quantity: itinerary.numberOfPeople,
        unitPrice: totalDestinationsCost / itinerary.numberOfPeople,
        total: totalDestinationsCost
      });
    }
    
    // Add accommodation
    const totalAccommodationCost = itinerary.days.reduce((sum, day) => {
      return sum + (day.hotel ? day.hotel.pricePerNight : 0);
    }, 0);
    
    if (totalAccommodationCost > 0) {
      items.push({
        id: '2',
        description: `Accommodation (${itinerary.days.length} nights)`,
        quantity: 1,
        unitPrice: totalAccommodationCost,
        total: totalAccommodationCost
      });
    }
    
    // Add meals
    const totalMealsCost = itinerary.days.reduce((sum, day) => {
      return sum + day.meals.reduce((daySum, meal) => 
        daySum + meal.pricePerPerson * itinerary.numberOfPeople, 0);
    }, 0);
    
    if (totalMealsCost > 0) {
      items.push({
        id: '3',
        description: 'Meals & Dining',
        quantity: itinerary.numberOfPeople,
        unitPrice: totalMealsCost / itinerary.numberOfPeople,
        total: totalMealsCost
      });
    }
    
    // Add transportation
    const totalTransportationCost = itinerary.days.reduce((sum, day) => {
      return sum + (day.transportation ? 
        day.transportation.pricePerPerson * itinerary.numberOfPeople : 0);
    }, 0);
    
    if (totalTransportationCost > 0) {
      items.push({
        id: '4',
        description: 'Transportation',
        quantity: itinerary.numberOfPeople,
        unitPrice: totalTransportationCost / itinerary.numberOfPeople,
        total: totalTransportationCost
      });
    }
    
    // Add tour guides
    const totalGuidesCost = itinerary.tourGuides.reduce((sum, guide) => {
      return sum + guide.pricePerDay * itinerary.days.length;
    }, 0);
    
    if (totalGuidesCost > 0) {
      items.push({
        id: '5',
        description: `Tour Guide Services (${itinerary.days.length} days)`,
        quantity: 1,
        unitPrice: totalGuidesCost,
        total: totalGuidesCost
      });
    }
    
    return items;
  };

  // Use itinerary data or fallback to demo items
  const invoiceItems = itinerary ? generateInvoiceItems() : [
    { id: '1', description: 'Tour Package (4 days)', quantity: 2, unitPrice: 750000, total: 1500000 },
    { id: '2', description: 'Premium Hotel Accommodation', quantity: 3, unitPrice: 200000, total: 600000 },
    { id: '3', description: 'Guided Tours', quantity: 4, unitPrice: 125000, total: 500000 },
    { id: '4', description: 'Airport Transfers', quantity: 2, unitPrice: 60000, total: 120000 },
  ];

  const subtotal = invoiceItems.reduce((sum, item) => sum + item.total, 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Invoice Generator</h1>
          <p className="text-muted-foreground">Create and send professional invoices</p>
        </div>
        {itinerary && (
          <Button onClick={handleAddToCalendar}>
            <Calendar className="h-4 w-4 mr-2" />
            Add to Google Calendar
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Invoice Details */}
        <div className="lg:col-span-1 space-y-6">
          <GlassCard>
            <CardHeader>
              <CardTitle>Invoice Details</CardTitle>
              <CardDescription>Fill in the customer information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="customerName">Customer Name</Label>
                <Input
                  id="customerName"
                  name="customerName"
                  value={invoice.customerName}
                  onChange={handleChange}
                  placeholder="Enter customer name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customerEmail">Customer Email</Label>
                <Input
                  id="customerEmail"
                  name="customerEmail"
                  type="email"
                  value={invoice.customerEmail}
                  onChange={handleChange}
                  placeholder="Enter customer email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Invoice Date</Label>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={invoice.date}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <Input
                    id="dueDate"
                    name="dueDate"
                    type="date"
                    value={invoice.dueDate}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-3">
              <Button 
                className="w-full" 
                onClick={handleGenerateInvoice}
              >
                <FileText className="h-4 w-4 mr-2" />
                Generate Invoice
              </Button>
              <Button 
                className="w-full" 
                variant="outline"
                onClick={handleSendInvoice}
              >
                <Send className="h-4 w-4 mr-2" />
                Send to Customer
              </Button>
            </CardFooter>
          </GlassCard>
          
          <GlassCard className="bg-primary/5 animate-float">
            <CardContent className="pt-6">
              <h3 className="font-medium mb-2">Invoice Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" size="sm" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </Button>
              </div>
            </CardContent>
          </GlassCard>
        </div>

        {/* Invoice Preview */}
        <div className="lg:col-span-2">
          <GlassCard className="max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-2xl font-bold">Invoice</h2>
                  <p className="text-muted-foreground">#INV-{new Date().getFullYear()}-{Math.floor(1000 + Math.random() * 9000)}</p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
                    TourGenius
                  </div>
                  <p className="text-sm text-muted-foreground">Premium Tour Planning</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="font-medium mb-2">Bill To:</h3>
                  <p>{invoice.customerName || 'Customer Name'}</p>
                  <p className="text-muted-foreground">{invoice.customerEmail || 'customer@example.com'}</p>
                </div>
                <div className="text-right">
                  <h3 className="font-medium mb-2">Invoice Details:</h3>
                  <p>Date: {invoice.date || new Date().toISOString().split('T')[0]}</p>
                  <p>Due Date: {invoice.dueDate || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}</p>
                  <p>Status: <span className="capitalize">{invoice.status || 'Draft'}</span></p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="font-medium mb-4">Invoice Items:</h3>
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left pb-2">Description</th>
                      <th className="text-right pb-2">Qty</th>
                      <th className="text-right pb-2">Unit Price</th>
                      <th className="text-right pb-2">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceItems.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="py-3">{item.description}</td>
                        <td className="py-3 text-right">{item.quantity}</td>
                        <td className="py-3 text-right">{formatRupiah(item.unitPrice)}</td>
                        <td className="py-3 text-right">{formatRupiah(item.total)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="w-full max-w-xs ml-auto">
                <div className="flex justify-between mb-2">
                  <span>Subtotal:</span>
                  <span>{formatRupiah(subtotal)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Tax (5%):</span>
                  <span>{formatRupiah(tax)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span>{formatRupiah(total)}</span>
                </div>
              </div>

              <div className="mt-12 text-center text-sm text-muted-foreground">
                <p>Thank you for your business!</p>
                <p>Payment is due within 14 days of receipt of this invoice.</p>
              </div>
            </CardContent>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default InvoiceGenerator;
