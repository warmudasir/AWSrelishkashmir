"use client";

import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProductCard from "@/app/components/product-card/productCard";
import Quantity from "@/app/components/product-quantity/quantity";
import { getUserToken } from "@/utility/authtoken";
import { ProductContext } from "@/app/context/productcontext";
import s from "./page.module.scss";
import Loading from "@/app/components/loading/loading";
import type { Product, ReviewRecord } from "@/app/types/type";

const ProductDescription = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const user = getUserToken();
  const router = useRouter();
  const { selectedProduct } = useContext(ProductContext) || {};
  console.log(selectedProduct, "selected product in product description");
  // Ensure context is not undefined
  if (!selectedProduct) {
    throw new Error(
      "Must Select a product before accessing the product description page."
    );
  }

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [maxQuantityReached, setMaxQuantityReached] = useState(false);
  const [typeuser, setTypeUser] = useState("");
  const [reviews, setReviews] = useState<ReviewRecord[]>([]);
  const [newReview, setNewReview] = useState("");
  useEffect(() => {
    if (selectedProduct) {
      setProduct(selectedProduct);
      setIsLoading(false);
    }
  }, [selectedProduct]);
  let userType = "unverified";

  useEffect(() => {
    const getReviews = async () => {
      try {
        const response = await fetch("/api/storeReview", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("No Reviews");
        }
        const rev = await response.json();
        setReviews(rev);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    getReviews();
  }, []);

  const handleIncreaseQuantity = () => {
    if (product && quantity < product.quantity) {
      setQuantity(quantity + 1);
      setMaxQuantityReached(false);
    } else {
      setMaxQuantityReached(true);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setMaxQuantityReached(false);
    }
  };

  const handleReviewSubmit = async () => {
    if (user) {
      if (!newReview) {
        alert("Please enter a comment.");
        return;
      }

      try {
        const response = await fetch("/api/myorders");
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const result = await response.json();
        const filteredOrders = result.filter(
          (order: { email: string; itemNumber: string }) =>
            order.email === user.email && order.itemNumber === id
        );
        userType =
          filteredOrders.length === 0
            ? "Unverified Purchase"
            : "Verified purchase";
        setTypeUser(userType);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
      //
      const nameofreviewer = user.firstName;

      const reviewData = {
        review: { comment: newReview },
        id,
        nameofreviewer,
        userType,
      };
      const getReview = await fetch("/api/storeReview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });

      if (getReview.ok) {
        // Clear the input field
        setNewReview("");
        alert("Review submitted successfully!");
      } else {
        alert("Failed to submit review.");
      }
    } else {
      alert("Login to submit the review");
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const buyprod = () => {
    router.push(
      `/productbuy/${product._id}?quantity=${quantity}&name=${product.name}&price=${product.price}&imageUrl=${product.imageUrl}`
    );
  };

  return (
    <div>
      <div className={s["product-container"]}>
        <ProductCard product={product} />
        <div className={s["product-details"]}>
          <h1 className={s["product-title"]}>{product.name}</h1>
          <p>{product.description}</p>
          <Quantity
            quantity={quantity}
            handleIncreaseQuantity={handleIncreaseQuantity}
            handleDecreaseQuantity={handleDecreaseQuantity}
          />
          {maxQuantityReached && (
            <p className={s["max-quantity-message"]}>
              Maximum available quantity reached
            </p>
          )}
          <div className={s["button-group"]}>
            <button onClick={buyprod} className={s["buy-now-button"]}>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <hr />
      {/* Review Section */}
      <div className={s["review-section"]}>
        <h2>Product Reviews</h2>
        <ol>
          {reviews
            .filter((review) => review.id === id)
            .map((review, index) => (
              <li key={index}>
                <div className={s["review-content"]}>
                  <p className={s["review-text"]}>{review.review.comment}</p>
                  <div className={s["review-details"]}>
                    <p className={s["reviewer-name"]}>
                      {review.nameofreviewer}
                    </p>
                    <p className={s["reviewer-status"]}>{review.userType}</p>
                  </div>
                </div>
              </li>
            ))}
        </ol>
        <textarea
          placeholder="Add your comment here..."
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
        />
        <button
          onClick={handleReviewSubmit}
          className={s["submit-review-button"]}
        >
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default ProductDescription;
