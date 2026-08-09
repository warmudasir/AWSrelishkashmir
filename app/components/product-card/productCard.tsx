"use client";

import React from "react";
import Image from "next/image";
import styles from "./productCard.module.scss"; // Assuming you have a CSS module for styling
import { ProductProps } from "./type";
import navigate from "next/navigation";
import { useRouter } from "next/navigation";


const ProductCard = ({ product, selectProduct }: { product: ProductProps; selectProduct?: (product: ProductProps) => void }) => {
  const isOutOfStock = product.quantity === 0;
  const router = useRouter();
  const newRoute = `/productdescription`;
  const handleProductClick = () => {
    selectProduct && selectProduct(product);
    router.push(newRoute);

  }

  return (
    <button onClick={handleProductClick}>
      <div className={styles["productCard"]}>
        <div className={styles["imageWrapper"]}>
          <Image
            src={product.imageUrl || "/path/to/default/image.jpg"} // Provide a default image path if necessary
            alt={product.name}
            layout="fill" // Fill the parent container
            objectFit="cover" // Cover the image area while maintaining aspect ratio
          />
          {isOutOfStock && (
            <div className={styles["outOfStockLabel"]}>Out of Stock</div>
          )}
        </div>
        <div className={styles["productDetails"]}>
          <div>
            <span>
              <strong>{product.name}</strong>
              <br />
              *****
            </span>
          </div>
          <div>
            <span>
              <strong>Price:</strong> ₹
              {product.price}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
};

export default ProductCard;
