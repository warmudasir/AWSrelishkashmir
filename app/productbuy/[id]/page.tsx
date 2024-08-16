"use client";

import React, { useEffect } from "react";
import Footer from "@/app/components/footer";
import Header from "@/app/components/header";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import styles from "./productbuy.module.scss";
import { getUserToken } from "../../utility/authtoken";

const Page = ({ params }: { params: { id: string } }) => {
  const userData = getUserToken();
  const { id } = params;
  const searchParams = useSearchParams();
  const quantity = searchParams.get("quantity") || 1;
  const name = searchParams.get("name") || "Product Name";
  const price = searchParams.get("price") || "0.00";
  const totalpayable = price * quantity;
  const imageUrl =
    searchParams.get("imageUrl") || "https://via.placeholder.com/150";

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      console.log("Razorpay script loaded");
    };
    document.body.appendChild(script);
  }, []);

  const orderInfo = async (orderInfo: any) => {
    const itemdata = {
      itemNumber: id,
      quantity,
      productname: name,
      productprice: price,
      imageUrl,
      orderStatus:'Processing'
    };
    const finaldata = { ...orderInfo, ...itemdata };

    const razorpayResponse = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: parseInt(totalpayable) * 100 }), // Amount in paise
    });

    const orderData = await razorpayResponse.json();

    if (orderData.id) {
      const options = {
        key: "rzp_test_AlDHhT9lXcsjQf",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Relish Kashmir",
        description: "Sample Product",
        order_id: orderData.id,
        handler: async function (response: any) {
              const orderResponse = await fetch("/api/orderdata", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...finaldata,
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              signature: response.razorpay_signature,
            }),
          });
          router.push(`/sucessorder?orderId=${response.razorpay_order_id}`);
        },
        prefill: {
          name: orderInfo.firstName + " " + orderInfo.lastName,
          email: orderInfo.email,
          contact: orderInfo.phone,
        },
        notes: {
          address: orderInfo.address,
        },
        theme: {
          color: "#3399cc",
        },
      };

      if (window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        console.error("Razorpay object not available");
      }
    } else {
      console.error("Failed to create order");
    }
  };

  return (
    <div>
      <Header />
      <div className={styles.container}>
        {userData && userData.email ? (
          <div className={styles.formWrapper}>
            <form
              onSubmit={handleSubmit((data) =>
                orderInfo({
                  ...data,
                  firstName: userData.firstName,
                  lastName: userData.lastName,
                  email: userData.email,
                })
              )}
              className={styles.form}
            >
              <input
                type="tel"
                placeholder="Phone Number"
                className={styles.input}
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^\d{10}$/,
                    message: "Enter a valid 10-digit phone number",
                  },
                })}
              />
              {errors.phone && (
                <span className={styles.error}>{errors.phone.message}</span>
              )}
              <input
                type="text"
                placeholder="Address"
                className={styles.input}
                {...register("address", { required: "Address is required" })}
              />
              {errors.address && (
                <span className={styles.error}>{errors.address.message}</span>
              )}
              <input
                type="text"
                placeholder="Pincode"
                className={styles.input}
                {...register("pincode", {
                  required: "Pincode is required",
                  pattern: {
                    value: /^\d{6}$/,
                    message: "Enter a valid 6-digit pincode",
                  },
                })}
              />
              {errors.pincode && (
                <span className={styles.error}>{errors.pincode.message}</span>
              )}
              <button type="submit" className={styles.button}>
                Proceed to Payment
              </button>
            </form>
          </div>
        ) : (
          <div className={styles.formWrapper}>
            <form onSubmit={handleSubmit(orderInfo)} className={styles.form}>
              <input
                type="text"
                placeholder="First Name"
                className={styles.input}
                {...register("firstName", {
                  required: "First Name is required",
                })}
              />
              {errors.firstName && (
                <span className={styles.error}>
                  {errors.firstName.message}
                </span>
              )}
              <input
                type="text"
                placeholder="Last Name"
                className={styles.input}
                {...register("lastName", { required: "Last Name is required" })}
              />
              {errors.lastName && (
                <span className={styles.error}>{errors.lastName.message}</span>
              )}
              <input
                type="email"
                placeholder="Email"
                className={styles.input}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <span className={styles.error}>{errors.email.message}</span>
              )}
              <input
                type="tel"
                placeholder="Phone Number"
                className={styles.input}
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^\d{10}$/,
                    message: "Enter a valid 10-digit phone number",
                  },
                })}
              />
              {errors.phone && (
                <span className={styles.error}>{errors.phone.message}</span>
              )}
              <input
                type="text"
                placeholder="Address"
                className={styles.input}
                {...register("address", { required: "Address is required" })}
              />
              {errors.address && (
                <span className={styles.error}>{errors.address.message}</span>
              )}
              <input
                type="text"
                placeholder="Pincode"
                className={styles.input}
                {...register("pincode", {
                  required: "Pincode is required",
                  pattern: {
                    value: /^\d{6}$/,
                    message: "Enter a valid 6-digit pincode",
                  },
                })}
              />
              {errors.pincode && (
                <span className={styles.error}>{errors.pincode.message}</span>
              )}
              <button type="submit" className={styles.button}>
                Proceed to Payment
              </button>
            </form>
          </div>
        )}
        <div className={styles.sidebar}>
          <h2 className={styles.sidebarTitle}>Your Order</h2>
          <div className={styles.productDetails}>
            <img src={imageUrl} alt={name} className={styles.productImage} />
            <div className={styles.productInfo}>
              <h3 className={styles.productName}>{name}</h3>
              <p className={styles.productPrice}>Price: ₹{totalpayable}</p>
              <p className={styles.productQuantity}>Quantity: {quantity}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
