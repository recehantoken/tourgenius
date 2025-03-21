
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Invoice, TourItinerary } from '@/lib/types';
import { Calendar, Download, FileText, Printer, Send } from 'lucide-react';
import { toast } from 'sonner';
import GlassCard from '@/components/ui/glass-card';

interface InvoiceGeneratorProps {
  itinerary?: TourItinerary;
}

const InvoiceGenerator = ({ itinerary }: InvoiceGeneratorProps) => {
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

  // Sample invoice items for the preview
  const demoItems = [
    { id: '1', description: 'Tour Package (4 days)', quantity: 2, unitPrice: 750, total: 1500 },
    { id: '2', description: 'Premium Hotel Accommodation', quantity: 3, unitPrice: 200, total: 600 },
    { id: '3', description: 'Guided Tours', quantity: 4, unitPrice: 125, total: 500 },
    { id: '4', description: 'Airport Transfers', quantity: 2, unitPrice: 60, total: 120 },
  ];

  const subtotal = demoItems.reduce((sum, item) => sum + item.total, 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Invoice Generator</h1>
          <p className="text-muted-foreground">Create and send professional invoices</p>
        </div>
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
                    {demoItems.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="py-3">{item.description}</td>
                        <td className="py-3 text-right">{item.quantity}</td>
                        <td className="py-3 text-right">${item.unitPrice.toFixed(2)}</td>
                        <td className="py-3 text-right">${item.total.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="w-full max-w-xs ml-auto">
                <div className="flex justify-between mb-2">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Tax (5%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
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
