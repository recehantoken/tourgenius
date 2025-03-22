
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/layout';
import CustomerManagement from '@/components/dashboard/customers/customer-management';
import { Toaster } from 'sonner';

const CustomersPage = () => {
  return (
    <DashboardLayout>
      <Toaster position="top-center" richColors />
      <CustomerManagement />
    </DashboardLayout>
  );
};

export default CustomersPage;
