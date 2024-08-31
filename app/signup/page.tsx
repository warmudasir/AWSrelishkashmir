"use client";

import React from "react";
import Footer from "@/app/components/footer/footer";
import Header from "@/app/components/header/header";
import styles from "./signup.module.scss";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const SignupPage = () => {
  const router = useRouter();

  const { register, handleSubmit } = useForm();

  const orderInfo = async (data: any) => {
    data.role = "user";
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log(response);
    console.log(result.message);
    if (response.ok) {
      router.push("/login");
    } else {
      alert(result.message);
    }
  };

  return (
    <div>
      <Header />
      <div className={styles.signupContainer}>
        <div className={styles.formWrapper}>
          <form onSubmit={handleSubmit(orderInfo)} className={styles.signupForm}>
            <input
              type="text"
              placeholder="First Name"
              className={styles.input}
              {...register("firstName")}
            />
            <input
              type="text"
              placeholder="Last Name"
              className={styles.input}
              {...register("lastName")}
            />
            <input
              type="email"
              placeholder="Email"
              className={styles.input}
              {...register("email")}
            />
            <input
              type="text"
              placeholder="Phone Number"
              className={styles.input}
              {...register("phone")}
            />
            <input
              type="password"
              placeholder="Password"
              className={styles.input}
              {...register("password")}
            />
            <button type="submit" className={styles.signupButton}>
              Sign Up
            </button>
          </form>
          <button
            className={styles.loginRedirectButton}
            onClick={() => router.push("/login")}
          >
            Already have an account? Login
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignupPage;
