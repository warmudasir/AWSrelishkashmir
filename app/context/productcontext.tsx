"use client";

import React, { ReactNode, createContext, useState } from "react";

// Define the type for the context
type CartContextType = [number, () => void];

// Create a context with the default value
export const ProductContext = createContext<CartContextType | undefined>(
  undefined,
);

// Define the context provider component
const ProductContextProvider = ({ children }: { children: ReactNode }) => {
  const [cart, updateCart] = useState<number>(0);

  // Function to increment the cart count
  const cartIncrement = () => {
    updateCart((prevCart) => prevCart + 1);
  };

  return (
    <ProductContext.Provider value={[cart, cartIncrement]}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
