"use client";

import React from "react";
import s from "./signup.module.scss";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const SignupPage = () => {
  const router = useRouter();

  const { register, handleSubmit } = useForm();

  const orderInfo = async (data: any) => {
    console.log(data, "data incoming from signup");
    data.role = "user";
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (response.ok) {
      router.push("/login");
    } else {
      alert(result.message);
    }
  };

  return (
    <>
      <div className={s["trial"]}>
        <div style={{ backgroundColor: "black", flex: "1", display: "flex" }}>
          <div style={{ width: "300px", display: "flex", justifyContent: "center", alignItems: "center", margin: "auto" }}>
            <form
              onSubmit={handleSubmit(orderInfo)}
              className={s.signupForm}
            >
              <input
                type="text"
                placeholder="First Name"
                className={s.input}
                {...register("firstName")}
              />
              <input
                type="text"
                placeholder="Last Name"
                className={s.input}
                {...register("lastName")}
              />
              <input
                type="email"
                placeholder="Email"
                className={s.input}
                {...register("email")}
              />
              <input
                type="text"
                placeholder="Phone Number"
                className={s.input}
                {...register("phone")}
              />
              <input
                type="password"
                placeholder="Password"
                className={s.input}
                {...register("password")}
              />
              <button type="submit" className={s.signupButton}>
                Sign Up
              </button>
            </form>
          </div>
        </div>
        <div style={{ backgroundColor: "#680101", flex: "1", display: "flex", justifyContent: "center", alignItems: "center", padding: "20px", textAlign: "center" }}>
          <h1>Bring home the warmth, aroma, and soul of Kashmir.<br />
            <i>Sign up for exclusive flavors.</i></h1>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
