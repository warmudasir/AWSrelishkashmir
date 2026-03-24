"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { userLoginType } from "../login/page";

type AuthContextType = {
  user: userLoginType | null;
  setUser: (user: userLoginType | null) => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<userLoginType | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  console.log("useAuth called");
  const context = useContext(AuthContext);
  console.log("useAuth passed");
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  console.log("useAuth returned");
  return context;
};
