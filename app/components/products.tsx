"use client";

import ProductCard from "./product-card/productCard";
import styles from "./products.module.scss";
import Link from "next/link";
import { Product } from "../types/common";
import { ProductContext } from "../context/productcontext";
import { useContext } from "react";


const Products = ({ products }: { products: Product[] }) => {
  const context = useContext(ProductContext);
  const { selectProduct } = context || {};

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
              className={`${styles.productWrapper} ${isOutOfStock ? styles.productWrapperOutOfStock : styles.productWrapperReady}`}
            >
              {isOutOfStock ? (
                <ProductCard product={product} />
              ) : (
                // <Link href={`/productdescription/${product.id}`} passHref>
                <div className={styles.productLink} >
                  <ProductCard product={product} selectProduct={selectProduct} />
                </div>
                // </Link>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Products;
