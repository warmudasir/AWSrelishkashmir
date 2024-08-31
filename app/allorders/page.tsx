"use client";

import React, { useEffect, useState } from "react";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import Image from "next/image";
import { getUserToken } from "../utility/authtoken";
import { useRouter } from "next/navigation";

interface Product {
  _id: string;
  id: number;
  Name: string;
  price?: string;
  imageUrl: string;
  productname: string;
  quantity: number;
  productprice: number;
  firstName: string;
  address: string;
  pincode: string;
  phone: string;
  orderStatus: string;
  orderId: string; // Ensure orderId is part of the interface
}

const Products = () => {
  const router = useRouter();
  const userData = getUserToken();

  if (userData === null || userData.role === "user") {
    router.push("/");
  }

  const [orders, setOrders] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusUpdate, setStatusUpdate] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/myorders");
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const result = await response.json();
        setOrders(result);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleStatusChange = (orderId: string, status: string) => {
    setStatusUpdate((prev) => ({
      ...prev,
      [orderId]: status,
    }));
  };

  const handleStatusSubmit = async (orderId: string) => {
    try {
      const updatedOrder = {
        orderStatus: statusUpdate[orderId],
      };
      const response = await fetch(`/api/orderdata?orderId=${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedOrder),
      });
      if (!response.ok) {
        throw new Error("Failed to update order status");
      }
      const updatedOrders = orders.map((order) =>
        order.orderId === orderId
          ? { ...order, orderStatus: statusUpdate[orderId] }
          : order
      );
      setOrders(updatedOrders);
      alert("Order status updated successfully!");
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status.");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (userData?.email && orders.length === 0) {
    return (
      <div>
        <Header />
        <div className="no-orders">
          <h2>No orders found</h2>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="orders-container">
        {userData?.email ? (
          [...orders] // Create a shallow copy of the array
            .reverse() // Reverse the array
            .map((order) => (
              <div className="order-card" key={order.orderId}>
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
                  <p>Unit Price: ₹{order.productprice}</p>
                  <p>Total Order Price: ₹{order.productprice * order.quantity}</p>

                  <h2>Address Details</h2>
                  <p>Name: {order.firstName}</p>
                  <p>Address: {order.address}</p>
                  <p>Pincode: {order.pincode}</p>
                  <p>Phone Number: {order.phone}</p>
                </div>

                <div className="order-status">
                  <h2>Order Status</h2>
                  {order.orderStatus === "Delivered" ? (
                    <p>Delivered</p>
                  ) : (
                    <>
                      <select
                        value={statusUpdate[order.orderId] || order.orderStatus}
                        onChange={(e) =>
                          handleStatusChange(order.orderId, e.target.value)
                        }
                      >
                        <option value="Item Dispatched">Item Dispatched</option>
                        <option value="In transit">In transit</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Delivery attempt failed">
                          Delivery attempt failed
                        </option>
                      </select>
                      {order.orderStatus !== "Delivered" && (
                        <button onClick={() => handleStatusSubmit(order.orderId)}>
                          Submit
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))
        ) : (
          <div className="login-message">
            <h2>Please log in first to check your orders</h2>
          </div>
        )}
      </div>
      <Footer />
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
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
        .order-status select {
          margin-top: 10px;
          padding: 5px;
          border-radius: 4px;
          border: 1px solid #ccc;
          font-size: 16px;
        }
        .order-status button {
          margin-top: 10px;
          padding: 5px 10px;
          background-color: #e67e22;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        .order-status button:hover {
          background-color: #d35400;
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
