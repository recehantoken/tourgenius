
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Plus, Search, Edit, Trash2, User } from 'lucide-react';
import { toast } from 'sonner';
import GlassCard from '@/components/ui/glass-card';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

const CustomerManagement = () => {
  const [customers, setCustomers] = useState<Customer[]>([
    { 
      id: '1', 
      name: 'John Doe', 
      email: 'john@example.com', 
      phone: '+62 812-3456-7890', 
      address: 'Jl. Sudirman No. 123, Jakarta' 
    },
    { 
      id: '2', 
      name: 'Jane Smith', 
      email: 'jane@example.com', 
      phone: '+62 878-9012-3456', 
      address: 'Jl. Thamrin No. 456, Jakarta' 
    },
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const handleAddCustomer = () => {
    if (!newCustomer.name || !newCustomer.email) {
      toast.error('Name and email are required');
      return;
    }

    const customer = {
      id: Date.now().toString(),
      ...newCustomer
    };

    setCustomers([...customers, customer]);
    setNewCustomer({ name: '', email: '', phone: '', address: '' });
    setIsAddDialogOpen(false);
    toast.success('Customer added successfully');
  };

  const handleEditCustomer = () => {
    if (!selectedCustomer) return;

    const updatedCustomers = customers.map(customer => 
      customer.id === selectedCustomer.id ? selectedCustomer : customer
    );

    setCustomers(updatedCustomers);
    setSelectedCustomer(null);
    setIsEditDialogOpen(false);
    toast.success('Customer updated successfully');
  };

  const handleDeleteCustomer = (id: string) => {
    setCustomers(customers.filter(customer => customer.id !== id));
    toast.success('Customer deleted successfully');
  };

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Customer Management</h1>
          <p className="text-muted-foreground">Manage your tour customers</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-batik-gold to-primary hover:opacity-90 text-batik-dark font-semibold">
              <Plus className="h-4 w-4 mr-2" />
              Add Customer
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-batik-dark border-white/5">
            <DialogHeader>
              <DialogTitle>Add New Customer</DialogTitle>
              <DialogDescription>
                Enter customer details below
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name*
                </Label>
                <Input
                  id="name"
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                  className="col-span-3 bg-batik-dark/70 border-white/10"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email*
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={newCustomer.email}
                  onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                  className="col-span-3 bg-batik-dark/70 border-white/10"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="phone"
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                  className="col-span-3 bg-batik-dark/70 border-white/10"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right">
                  Address
                </Label>
                <Input
                  id="address"
                  value={newCustomer.address}
                  onChange={(e) => setNewCustomer({...newCustomer, address: e.target.value})}
                  className="col-span-3 bg-batik-dark/70 border-white/10"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddCustomer}>
                Add Customer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search & Filters */}
      <div className="flex items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search customers..."
            className="pl-10 bg-batik-dark/70 border-white/10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Customer List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredCustomers.length > 0 ? (
          filteredCustomers.map((customer) => (
            <GlassCard key={customer.id} className="hover:bg-white/5 transition-colors border border-white/5 bg-batik-dark/40">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="rounded-full p-2 bg-primary/10 text-primary">
                      <User className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">{customer.name}</h3>
                      <p className="text-sm text-muted-foreground">{customer.email}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 mt-2">
                        <p className="text-sm">📞 {customer.phone || 'No phone number'}</p>
                        <p className="text-sm">🏠 {customer.address || 'No address'}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Dialog open={isEditDialogOpen && selectedCustomer?.id === customer.id} onOpenChange={(open) => {
                      setIsEditDialogOpen(open);
                      if (!open) setSelectedCustomer(null);
                    }}>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="icon"
                          className="border-white/10 hover:bg-white/5"
                          onClick={() => setSelectedCustomer(customer)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px] bg-batik-dark border-white/5">
                        <DialogHeader>
                          <DialogTitle>Edit Customer</DialogTitle>
                          <DialogDescription>
                            Update customer details below
                          </DialogDescription>
                        </DialogHeader>
                        {selectedCustomer && (
                          <>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-name" className="text-right">
                                  Name
                                </Label>
                                <Input
                                  id="edit-name"
                                  value={selectedCustomer.name}
                                  onChange={(e) => setSelectedCustomer({...selectedCustomer, name: e.target.value})}
                                  className="col-span-3 bg-batik-dark/70 border-white/10"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-email" className="text-right">
                                  Email
                                </Label>
                                <Input
                                  id="edit-email"
                                  type="email"
                                  value={selectedCustomer.email}
                                  onChange={(e) => setSelectedCustomer({...selectedCustomer, email: e.target.value})}
                                  className="col-span-3 bg-batik-dark/70 border-white/10"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-phone" className="text-right">
                                  Phone
                                </Label>
                                <Input
                                  id="edit-phone"
                                  value={selectedCustomer.phone}
                                  onChange={(e) => setSelectedCustomer({...selectedCustomer, phone: e.target.value})}
                                  className="col-span-3 bg-batik-dark/70 border-white/10"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-address" className="text-right">
                                  Address
                                </Label>
                                <Input
                                  id="edit-address"
                                  value={selectedCustomer.address}
                                  onChange={(e) => setSelectedCustomer({...selectedCustomer, address: e.target.value})}
                                  className="col-span-3 bg-batik-dark/70 border-white/10"
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => {
                                setSelectedCustomer(null);
                                setIsEditDialogOpen(false);
                              }}>
                                Cancel
                              </Button>
                              <Button onClick={handleEditCustomer}>
                                Save Changes
                              </Button>
                            </DialogFooter>
                          </>
                        )}
                      </DialogContent>
                    </Dialog>
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="border-white/10 hover:bg-white/5 hover:border-red-500/50 hover:text-red-500"
                      onClick={() => handleDeleteCustomer(customer.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </GlassCard>
          ))
        ) : (
          <GlassCard className="bg-batik-dark/40 border border-white/5">
            <CardContent className="p-8 text-center">
              <div className="mb-4 flex justify-center">
                <User className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No customers found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? 'No results match your search' : 'Start by adding a new customer'}
              </p>
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Customer
              </Button>
            </CardContent>
          </GlassCard>
        )}
      </div>
    </div>
  );
};

export default CustomerManagement;
