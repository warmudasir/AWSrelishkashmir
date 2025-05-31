"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { getUserToken } from "../../utility/authtoken";

interface Product {
  email?:string;
  _id: string;
  id: number;
  Name: string;
  price?: string;
  imageUrl: string;
  productname: string;
  quantity: number;
  productprice: number;
  orderStatus: string;
}

const Products = () => {
  const [orders, setOrders] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = getUserToken();
      setUserData(user);

      if (user?.email) {
        try {
          const response = await fetch('/api/myorders');
          if (!response.ok) {
            throw new Error('Failed to fetch orders');
          }
          const result: Product[] = await response.json();
          const filteredOrders = result.filter((order) => user.email === order.email);
          setOrders(filteredOrders);
        } catch (error) {
          console.error('Error fetching orders:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (userData?.email && orders.length === 0) {
    return (
      <div>
        <div className="no-orders">
          <h2>No orders found</h2>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="orders-container">
        {userData?.email ? (
          orders
            .slice() // Create a shallow copy of the array
            .reverse() // Reverse the array
            .map((order) => (
              <div className="order-card" key={order._id}>
                <Image
                  src={order.imageUrl}
                  alt="Product Image"
                  width={200}
                  height={200}
                  className="product-image"
                />

                <div className="order-details">
                  <h2>Order Details</h2>
                  <h3>Product Name: {order.productname}</h3>
                  <p>Total Quantity: {order.quantity}</p>
                  <p>Total Payable: ₹{order.productprice * order.quantity}</p>
                  <p>Description: Healthy and pure saffron from Kashmir. Enjoy the best taste and aroma.</p>
                </div>
                <div className="order-status">
                  <h2>Order Status: <span>{order.orderStatus}</span></h2>
                </div>
              </div>
            ))
        ) : (
          <div className="login-message">
            <h2>Please log in first to check your orders</h2>
          </div>
        )}
      </div>
      <style jsx>{`
        .orders-container {
          padding: 20px;
          margin-top: 100px; /* Add margin to prevent overlap with the navbar */
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .order-card {
          background-color: #fbe9d0;
          padding: 20px;
          margin: 20px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          max-width: 800px;
          box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          transition: transform 0.2s ease;
        }
        .order-card:hover {
          transform: translateY(-5px);
        }
        .product-image {
          border-radius: 8px;
        }
        .order-details {
          flex: 1;
          margin-left: 20px;
        }
        .order-details h3 {
          margin-top: 10px;
          font-size: 18px;
        }
        .order-details p {
          margin: 5px 0;
          color: #555;
        }
        .order-status {
          text-align: right;
        }
        .order-status h2 {
          margin: 0;
          color: #444;
        }
        .order-status span {
          color: #e67e22;
        }
        .login-message {
          text-align: center;
          padding: 100px;
        }
        .no-orders {
          text-align: center;
          padding: 100px;
        }
        @media (max-width: 768px) {
          .order-card {
            flex-direction: column;
            align-items: flex-start;
          }
          .order-details {
            margin-left: 0;
            margin-top: 20px;
          }
          .order-status {
            text-align: left;
            margin-top: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default Products;
