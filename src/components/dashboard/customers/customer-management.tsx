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

// [Previous mock data remains the same]

const CustomerManagement = () => {
  // [Previous state declarations remain the same]

  // Status badge with enhanced styling
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
      {/* Batik Pattern Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M36 34v-4m-6 10v-4m-6-6h4m10 0h4M10 24h40M10 36h40' stroke='%23ffffff' stroke-width='2'/%3E%3Ccircle fill='%23ffffff' cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      <div className="relative z-10 container mx-auto p-6 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-gray-800/80 to-indigo-900/80 backdrop-blur-sm p-6 rounded-xl border border-white/10 shadow-lg">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 bg-clip-text text-transparent animate-gradient">
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

        {/* Search Section */}
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

        {/* Table Section */}
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

        {/* Dialogs - Enhanced Styling */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="bg-gray-800/95 backdrop-blur-sm border border-white/10 text-white">
            <DialogHeader>
              <DialogTitle className="text-amber-200">Add New Customer</DialogTitle>
              <DialogDescription className="text-gray-300">
                Enter the details of the new customer.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {/* [Input fields remain the same but with enhanced styling] */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right text-gray-200">Name*</Label>
                <Input
                  id="name"
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                  className="col-span-3 bg-gray-700/50 border-white/10 text-white focus:ring-amber-400/50"
                />
              </div>
              {/* [Other input fields follow similar styling] */}
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

        {/* [Edit and Delete Dialogs follow similar styling enhancements] */}
      </div>
    </div>
  );
};

export default CustomerManagement;