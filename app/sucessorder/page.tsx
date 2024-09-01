"use client";

import dynamic from 'next/dynamic';
import React from 'react';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';

// Dynamically import the OrderSuccessPage component with SSR disabled
const OrderSuccessPageContent = dynamic(() => import('./orderSuccessPageContent'), {
  ssr: false,
});

const OrderSuccessPage: React.FC = () => {
  return (
    <>
      <Header />
      <OrderSuccessPageContent />
      <Footer />
    </>
  );
};

export default OrderSuccessPage;
