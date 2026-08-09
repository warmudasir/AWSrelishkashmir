"use client";

import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import jwt from "jsonwebtoken";
import { getUserToken } from "../../utility/authtoken";
import s from "./login.module.scss";
import cn from "classnames";
import { useAuth } from "../context/authcontext";
import type { AuthUser, LoginFormValues } from "@/app/types/type";

const validateLogin = async (
  data: LoginFormValues,
  router: any,
  setError: (message: string) => void,
  setUser: (user: AuthUser | null) => void,
) => {
  console.log(data, "data incoming")
  try {
    const response = await fetch("api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log("Login API response:", response); // Log the entire response for debugging
    if (!response.ok) {
      throw new Error("Invalid login credentials");
    }

    const result = await response.json();
    console.log("Login API result:", result); // Log the result for debugging
    const { token } = result;
    console.log("Received token:", token); // Log the received token for debugging
    const decoded: AuthUser = jwt.decode(token) as AuthUser;
    console.log(decoded, "decccc"); // Log the decoded token for debugging
    if (typeof decoded !== "string" && decoded.role) {
      setUser(decoded);
      if (decoded.role === "admin") {
        router.replace("/admin");
      } else if (decoded.role === "user") {
        router.replace("/");
        router.refresh();
      } else if (decoded.role === "deliveryagent") {
        router.replace("/deliveryagent");
      }
    } else {
      throw new Error("Invalid token payload");
    }
  } catch (error) {
    setError("Invalid login credentials");
    console.error("Error:", error);
  }
};

const LoginPage: React.FC = () => {
  const { user, setUser } = useAuth();
  console.log("LoginPage user:", user);
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  // Check if the user is already logged in
  useEffect(() => {
    const userData = getUserToken();
    if (userData) {
      router.push("/");
    }
  }, [router]);

  const { register, handleSubmit } = useForm<LoginFormValues>();

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    setError(null); // Clear previous error messages
    validateLogin(data, router, setError, setUser);
  };

  return (
    <>
      <div className={s["trial"]}>
        <div className={s.heroPanel}>
          <h1> Discover 100% natural, hand-sorted dry fruits and genuine Himalayan Shilajit by reaching out to local traders via Relish Kashmir</h1>
        </div>
        <div className={s.formPanel}>
          <div className={s.formWrapper}>
            <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className={s.input}
                {...register("email", { required: true })}
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className={s.input}
                {...register("password", { required: true })}
              />
              <button
                className={cn(s["LoginPage__form_button"], "my-2")}
                type="submit"
              >
                Login
              </button>
              {error && <p className={s.errorText}>{error}</p>}
              <p>
                Don&apos;t have an account?{" "}
                <Link href="/signup" className={s.link}>
                  Signup
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
