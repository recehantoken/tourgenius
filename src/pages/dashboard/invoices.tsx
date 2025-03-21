
import React from 'react';
import DashboardLayout from '@/components/dashboard/layout';
import InvoiceGenerator from '@/components/dashboard/invoices/invoice-generator';

const InvoicesPage = () => {
  return (
    <DashboardLayout>
      <InvoiceGenerator />
    </DashboardLayout>
  );
};

export default InvoicesPage;
