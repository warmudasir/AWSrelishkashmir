import React from "react";
import Products from "../components/products";
import { Product } from "../types/common";
import { getProducts } from "../services/products/getproducts";

export default async function page() {
  const products: Product[] = await getProducts();
  return (
    <div>
      <Products products={products} />
    </div>
  );
}
