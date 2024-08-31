"use client";

import React from 'react';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import { useSearchParams } from 'next/navigation';

const OrderSuccessPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  return (
    <>
      <Header />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh',
          backgroundColor: '#f8f9fa',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            backgroundColor: '#ffffff',
            padding: '30px',
            borderRadius: '10px',
            boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
            maxWidth: '500px',
            width: '100%',
          }}
        >
          <h2 style={{ color: '#28a745', marginBottom: '20px' }}>
            🎉 Order Placed Successfully!
          </h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '20px' }}>
            Thank you for your purchase. Your order number is{' '}
            <strong>{orderId}</strong>. We will send you a confirmation email
            shortly.
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Link href="/">
              <button
                style={{
                  backgroundColor: '#007bff',
                  padding: '10px 20px',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Continue Shopping
              </button>
            </Link>
            <Link href="/myorders">
              <button
                style={{
                  backgroundColor: '#28a745',
                  padding: '10px 20px',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
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

export default OrderSuccessPage;
