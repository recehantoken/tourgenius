
import React from 'react';
import DashboardLayout from '@/components/dashboard/layout';
import InvoiceGenerator from '@/components/dashboard/invoices/invoice-generator';
import { Toaster } from 'sonner';

const InvoicesPage = () => {
  return (
    <DashboardLayout>
      <Toaster position="top-center" richColors />
      <InvoiceGenerator />
    </DashboardLayout>
  );
};

export default InvoicesPage;
