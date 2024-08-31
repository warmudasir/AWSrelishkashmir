"use client";

import React from "react";
import Image from "next/image";
// import s from "./product-card-module.scss"
interface Product {
  _id: string;
  id: number;
  name: string;
  description: string;
  price?: string;
  imageUrl: string;
  availableQuantity: number;
  quantity: number; // Adding this field for quantity management
}

const ProductCard = ({ product }: { product: Product }) => {
  const isOutOfStock = product.quantity === 0;

  const styles = {
    productCard: {
      width: "220px",
      padding: "10px",
      backgroundColor: "#FBE9D0",
      borderRadius: "2px",
      color: "black",
      margin: "0 auto", // Center the card
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      position: "relative",
    } as React.CSSProperties,
    imageWrapper: {
      width: "100%",
      position: "relative",
    } as React.CSSProperties,
    outOfStockLabel: {
      position: "absolute",
      bottom: "10px",
      left: "50%",
      transform: "translateX(-50%)",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      color: "white",
      padding: "2px 6px",
      borderRadius: "3px",
      fontSize: "12px",
    } as React.CSSProperties,
    productDetails: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      marginTop: "10px",
    } as React.CSSProperties,
  };

  return (
    <div style={styles.productCard}>
      <div style={styles.imageWrapper}>
        <Image
          src={product.imageUrl || "/path/to/default/image.jpg"} // Provide a default image path if necessary
          alt={product.name}
          width={200}
          height={200}
        />
        {isOutOfStock && (
          <div style={styles.outOfStockLabel}>Out of Stock</div>
        )}
      </div>
      <div style={styles.productDetails}>
        <div>
          <span>
            {product.name}
            <br />
            *****
          </span>
        </div>
        <div>
          <span>{product.price}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
  