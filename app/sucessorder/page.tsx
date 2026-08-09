"use client";

import React, { Suspense } from 'react';
import Link from 'next/link';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import { useSearchParams } from 'next/navigation';
import s from './success.module.scss';

const OrderSuccessPage: React.FC = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams?.get('orderId');

  return (
    <>
      <Header />
      <div className={s.wrapper}>
        <div className={s.card}>
          <h2 className={s.title}>
            🎉 Order Placed Successfully!
          </h2>
          <p className={s.message}>
            Thank you for your purchase. Your order number is{' '}
            <strong>{orderId}</strong>. We will send you a confirmation email
            shortly.
          </p>
          <div className={s.actions}>
            <Link href="/">
              <button className={s.primaryButton}>
                Continue Shopping
              </button>
            </Link>
            <Link href="/myorders">
              <button className={s.secondaryButton}>
                View Orders
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

const OrderSuccessPageWithSuspense = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <OrderSuccessPage />
  </Suspense>
);

export default OrderSuccessPageWithSuspense;
