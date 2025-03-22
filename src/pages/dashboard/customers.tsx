
import React from 'react';
import DashboardLayout from '@/components/dashboard/layout';
import CustomerManagement from '@/components/dashboard/customers/customer-management';
import { Toaster } from 'sonner';

const CustomersPage = () => {
  return (
    <DashboardLayout>
      <div className="bg-batik-dark/20 p-4 rounded-lg">
        <Toaster position="top-center" richColors />
        <CustomerManagement />
      </div>
    </DashboardLayout>
  );
};

export default CustomersPage;
