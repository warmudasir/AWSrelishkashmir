"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import { getUserToken } from "../utility/authtoken";
type userDataType = {
  firstName: string;
  email: string;
  lastname: string;
  role: string;
};

export default function Home() {
  const router = useRouter();
  const [userData, setUserData] = useState<userDataType | null>(null);

  useEffect(() => {
    const tokenData = getUserToken();
    setUserData(tokenData);

    if (tokenData === null || tokenData.role !== "admin") {
      if (tokenData && tokenData.role === "deliveryagent") {
        router.push("/deliveryagent");
      } else {
        router.push("/");
      }
    }
  }, [router]);

  // Your state management and form handlers
  // ...

  return (
    <div>
      <Header />
      <div style={{ padding: "100px" }}>
        {/* Your form and button elements */}
        <Footer />
      </div>
    </div>
  );
}
