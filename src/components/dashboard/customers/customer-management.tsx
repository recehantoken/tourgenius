import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { PlusCircle, Search, Trash2, Edit, UserPlus } from 'lucide-react';

// Mock data
const initialCustomers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+62 812-3456-7890', status: 'active', notes: 'Repeat customer' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+62 813-5678-9012', status: 'inactive', notes: 'Cultural tours' },
  { id: 3, name: 'Robert Johnson', email: 'robert@example.com', phone: '+62 857-1234-5678', status: 'active', notes: 'Vegetarian' },
  { id: 4, name: 'Emily Davis', email: 'emily@example.com', phone: '+62 878-9012-3456', status: 'pending', notes: 'First-timer' },
  { id: 5, name: 'Michael Wilson', email: 'michael@example.com', phone: '+62 821-3456-7890', status: 'active', notes: 'Adventure' },
];

const CustomerManagement = () => {
  const [customers, setCustomers] = useState(initialCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState<any>(null);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'pending',
    notes: ''
  });

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  const handleAddCustomer = () => {
    if (!newCustomer.name || !newCustomer.email || !newCustomer.phone) {
      toast.error('Please fill in all required fields');
      return;
    }
    const id = customers.length > 0 ? Math.max(...customers.map(c => c.id)) + 1 : 1;
    setCustomers([...customers, { ...newCustomer, id }]);
    setNewCustomer({ name: '', email: '', phone: '', status: 'pending', notes: '' });
    setIsAddDialogOpen(false);
    toast.success('Customer added successfully');
  };

  const handleEditCustomer = () => {
    if (!currentCustomer.name || !currentCustomer.email || !currentCustomer.phone) {
      toast.error('Please fill in all required fields');
      return;
    }
    setCustomers(customers.map(customer => 
      customer.id === currentCustomer.id ? currentCustomer : customer
    ));
    setIsEditDialogOpen(false);
    toast.success('Customer updated successfully');
  };

  const handleDeleteCustomer = () => {
    setCustomers(customers.filter(customer => customer.id !== currentCustomer.id));
    setIsDeleteDialogOpen(false);
    toast.success('Customer deleted successfully');
  };

  const StatusBadge = ({ status }: { status: string }) => {
    const styles = {
      active: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      inactive: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      pending: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    };
    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status as keyof typeof styles]} transition-all duration-300 hover:scale-105`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M36 34v-4m-6 10v-4m-6-6h4m10 0h4M10 24h40M10 36h40' stroke='%23ffffff' stroke-width='2'/%3E%3Ccircle fill='%23ffffff' cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      <div className="relative z-10 container mx-auto p-6 space-y-8 text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-gray-800/80 to-indigo-900/80 backdrop-blur-sm p-6 rounded-xl border border-white/10 shadow-lg">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 bg-clip-text text-transparent">
              Customer Management
            </h2>
            <p className="text-gray-300 mt-1">Manage your tour customers with elegance</p>
          </div>
          <Button 
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-gray-900 font-semibold transform transition-all duration-300 hover:scale-105 shadow-md"
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Add Customer
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search customers..."
            className="pl-10 bg-gray-800/50 border-white/10 text-white placeholder-gray-400 rounded-full focus:ring-2 focus:ring-amber-400/50 transition-all duration-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-white/10 shadow-xl overflow-hidden">
          <Table>
            <TableHeader className="bg-gradient-to-r from-gray-900 to-indigo-900">
              <TableRow className="border-b border-white/5">
                {['Name', 'Email', 'Phone', 'Status', 'Notes', 'Actions'].map((header) => (
                  <TableHead key={header} className="text-amber-200 font-semibold">
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <TableRow 
                    key={customer.id} 
                    className="border-b border-white/5 text-gray-200 hover:bg-white/5 transition-colors duration-200"
                  >
                    <TableCell className="font-medium">{customer.name}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell><StatusBadge status={customer.status} /></TableCell>
                    <TableCell className="max-w-xs truncate">{customer.notes}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-amber-300 hover:text-amber-400 hover:bg-amber-400/10"
                        onClick={() => {
                          setCurrentCustomer(customer);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-rose-300 hover:text-rose-400 hover:bg-rose-400/10"
                        onClick={() => {
                          setCurrentCustomer(customer);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-gray-400">
                    No customers found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="bg-gray-800/95 backdrop-blur-sm border border-white/10 text-white">
            <DialogHeader>
              <DialogTitle className="text-amber-200">Add New Customer</DialogTitle>
              <DialogDescription className="text-gray-300">
                Enter the details of the new customer.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right text-gray-200">Name*</Label>
                <Input
                  id="name"
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                  className="col-span-3 bg-gray-700/50 border-white/10 text-white focus:ring-amber-400/50"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right text-gray-200">Email*</Label>
                <Input
                  id="email"
                  type="email"
                  value={newCustomer.email}
                  onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                  className="col-span-3 bg-gray-700/50 border-white/10 text-white focus:ring-amber-400/50"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right text-gray-200">Phone*</Label>
                <Input
                  id="phone"
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                  className="col-span-3 bg-gray-700/50 border-white/10 text-white focus:ring-amber-400/50"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right text-gray-200">Status</Label>
                <Select
                  value={newCustomer.status}
                  onValueChange={(value) => setNewCustomer({ ...newCustomer, status: value })}
                >
                  <SelectTrigger className="col-span-3 bg-gray-700/50 border-white/10 text-white">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-white/10 text-white">
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="notes" className="text-right text-gray-200">Notes</Label>
                <Textarea
                  id="notes"
                  value={newCustomer.notes}
                  onChange={(e) => setNewCustomer({ ...newCustomer, notes: e.target.value })}
                  className="col-span-3 bg-gray-700/50 border-white/10 text-white focus:ring-amber-400/50"
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsAddDialogOpen(false)}
                className="border-amber-400/50 text-amber-400 hover:bg-amber-400/10"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleAddCustomer}
                className="bg-amber-400 text-gray-900 hover:bg-amber-500"
              >
                Add Customer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="bg-gray-800/95 backdrop-blur-sm border border-white/10 text-white">
            <DialogHeader>
              <DialogTitle className="text-amber-200">Edit Customer</DialogTitle>
              <DialogDescription className="text-gray-300">
                Update the customer's information.
              </DialogDescription>
            </DialogHeader>
            {currentCustomer && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-name" className="text-right text-gray-200">Name*</Label>
                  <Input
                    id="edit-name"
                    value={currentCustomer.name}
                    onChange={(e) => setCurrentCustomer({ ...currentCustomer, name: e.target.value })}
                    className="col-span-3 bg-gray-700/50 border-white/10 text-white focus:ring-amber-400/50"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-email" className="text-right text-gray-200">Email*</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={currentCustomer.email}
                    onChange={(e) => setCurrentCustomer({ ...currentCustomer, email: e.target.value })}
                    className="col-span-3 bg-gray-700/50 border-white/10 text-white focus:ring-amber-400/50"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-phone" className="text-right text-gray-200">Phone*</Label>
                  <Input
                    id="edit-phone"
                    value={currentCustomer.phone}
                    onChange={(e) => setCurrentCustomer({ ...currentCustomer, phone: e.target.value })}
                    className="col-span-3 bg-gray-700/50 border-white/10 text-white focus:ring-amber-400/50"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-status" className="text-right text-gray-200">Status</Label>
                  <Select
                    value={currentCustomer.status}
                    onValueChange={(value) => setCurrentCustomer({ ...currentCustomer, status: value })}
                  >
                    <SelectTrigger className="col-span-3 bg-gray-700/50 border-white/10 text-white">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-white/10 text-white">
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-notes" className="text-right text-gray-200">Notes</Label>
                  <Textarea
                    id="edit-notes"
                    value={currentCustomer.notes}
                    onChange={(e) => setCurrentCustomer({ ...currentCustomer, notes: e.target.value })}
                    className="col-span-3 bg-gray-700/50 border-white/10 text-white focus:ring-amber-400/50"
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsEditDialogOpen(false)}
                className="border-amber-400/50 text-amber-400 hover:bg-amber-400/10"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleEditCustomer}
                className="bg-amber-400 text-gray-900 hover:bg-amber-500"
              >
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="bg-gray-800/95 backdrop-blur-sm border border-white/10 text-white">
            <DialogHeader>
              <DialogTitle className="text-amber-200">Delete Customer</DialogTitle>
              <DialogDescription className="text-gray-300">
                Are you sure you want to delete this customer? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            {currentCustomer && (
              <div className="py-4">
                <p><strong>Name:</strong> {currentCustomer.name}</p>
                <p><strong>Email:</strong> {currentCustomer.email}</p>
              </div>
            )}
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsDeleteDialogOpen(false)}
                className="border-amber-400/50 text-amber-400 hover:bg-amber-400/10"
              >
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleDeleteCustomer}
                className="bg-rose-500 hover:bg-rose-600 text-white"
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CustomerManagement;