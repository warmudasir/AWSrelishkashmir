"use client";
import { createContext, useState } from "react";
import type { Product } from "@/app/types/type";

type ProductContextType = {
  selectedProduct: Product | null;
  selectProduct: (product: Product | null) => void;
};

export const ProductContext = createContext<ProductContextType | null>(null);
export default function ProductProvider({ children }: { children: React.ReactNode }) {
  const [selectedProduct, selectProduct] = useState<Product | null>(null);
  return (
    <ProductContext.Provider value={{ selectedProduct, selectProduct }}>
      {children}
    </ProductContext.Provider>
  );
}