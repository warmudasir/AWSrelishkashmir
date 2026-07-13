"use client";

import ProductCard from "./product-card/productCard";
import styles from "./products.module.scss";
import Link from "next/link";
import { Product } from "../types/common";


const Products = ({ products }: { products: Product[] }) => {

  if (products.length === 0) {
    return <div>No products available</div>;
  }

  return (
    <>
      <div className={styles.body}>
        {products.map((product) => {
          const isOutOfStock = product.quantity === 0;

          return (
            <div
              key={product.id}
              className={styles.productWrapper}
              style={{
                opacity: isOutOfStock ? 0.5 : 1,
                cursor: isOutOfStock ? "not-allowed" : "pointer",
              }}
            >
              {isOutOfStock ? (
                <ProductCard product={product} />
              ) : (
                <Link href={`/productdescription/${product.id}`} passHref>
                  <div style={{ textDecoration: "none", color: "inherit" }}>
                    <ProductCard product={product} />
                  </div>
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Products;
