"use client";

import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProductCard from "@/app/components/product-card/productCard";
import Quantity from "@/app/components/product-quantity/quantity";
import { getUserToken } from "@/utility/authtoken";
import { ProductContext } from "@/app/context/productcontext";
import s from './page.module.scss'

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

interface Order {
  itemNumber:string,
  email:string
}

interface review{
  comment:string;
}
interface Review {
  review:review
  id: string; // Change to string to match product ID
  comment: string;
  nameofreviewer?:string;
  userType?:string

}

const ProductDescription = ({ params }: { params: { id: string } }) => {
  const user = getUserToken();
  const { id } = params;
  const router = useRouter();
  const context = useContext(ProductContext);

  // Ensure context is not undefined
  if (!context) {
    throw new Error(
      "ProductDescription must be used within a ProductContextProvider"
    );
  }

  const [cart, cartIncrement] = context;
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [maxQuantityReached, setMaxQuantityReached] = useState(false);
  const [typeuser,setTypeUser]=useState("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState("");
  let userType="unverified";

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        try {
          const response = await fetch(`/api/data`);
          if (!response.ok) {
            throw new Error("Failed to fetch product");
          }
          const products: Product[] = await response.json();
          const foundProduct = products.find((product) => product._id === id);
          setProduct(foundProduct || null);
        } catch (error) {
          console.error("Error fetching product:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const response = await fetch('/api/storeReview', {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error('No Reviews');
        }
        const rev = await response.json();
        setReviews(rev);
      } catch (error) {
        console.error('Error fetching reviews:', error);
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

  const handleAddToCart = () => {
    if (user) {
      console.log(`Adding ${product?.name} to cart with quantity ${quantity}`);
      const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
      const newItem = { ...product, quantity };
      localStorage.setItem("cart", JSON.stringify([...cartItems, newItem]));
      cartIncrement(); // Increment the cart count
    } else {
      alert("Please login first to add items to the cart");
    }
  };

  const handleReviewSubmit = async () => {
    if (user) {
    if (!newReview) {
      alert("Please enter a comment.");
      return;
    }

    const review:({id:string,comment:String}) = {
      id: id,
      comment: newReview,
    };

try {
  const response = await fetch('/api/myorders');
  if (!response.ok) {
    throw new Error('Failed to fetch orders');
  }
  const result = await response.json();
  const filteredOrders = result.filter((order: { email: string; itemNumber: string; }) => order.email === user.email && order.itemNumber === id);
  userType = filteredOrders.length === 0 ? "Unverified Purchase" : "Verified purchase";
  setTypeUser(userType);
} catch (error) {
  console.error('Error fetching orders:', error);
} 
//
    const nameofreviewer=user.firstName;

    const reviewData = { review, id, nameofreviewer,userType}; 
    const getReview = await fetch('/api/storeReview', {
      method: 'POST',
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
  }
  else
  {
    alert('Login to submit the review')
  }
  };

  if (isLoading) {
    return <div>Loading...</div>;
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
            {/* <button onClick={handleAddToCart} className="add-to-cart-button">
              Add to Cart
            </button> */}
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
                    <p className={s["reviewer-name"]}>{review.nameofreviewer}</p>
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
        <button onClick={handleReviewSubmit} className={s["submit-review-button"]}>
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default ProductDescription;
