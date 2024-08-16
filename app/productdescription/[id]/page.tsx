"use client";

import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import ProductCard from "@/app/components/productCard";
import Quantity from "@/app/components/quantity";
import { getUserToken } from "@/app/utility/authtoken";
import { ProductContext } from "@/app/context/productcontext";

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

interface Review {
  id: string; // Change to string to match product ID
  comment: string;
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

    const review: Review = {
      id: id,
      comment: newReview,
    };
    // console.log(user);
    // Save the review (In a real-world application, you would post this to a backend)
//
try {
  const response = await fetch('/api/myorders');
  if (!response.ok) {
    throw new Error('Failed to fetch orders');
  }
  const result = await response.json();
  const filteredOrders = result.filter(order => order.email === user.email && order.itemNumber === id);
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
      <Header />
      <div className="product-container">
        <ProductCard product={product} />
        <div className="product-details">
          <h1 className="product-title">{product.name}</h1>
          <p>{product.description}</p>
          <Quantity
            quantity={quantity}
            handleIncreaseQuantity={handleIncreaseQuantity}
            handleDecreaseQuantity={handleDecreaseQuantity}
          />
          {maxQuantityReached && (
            <p className="max-quantity-message">
              Maximum available quantity reached
            </p>
          )}
          <div className="button-group">
            <button onClick={buyprod} className="buy-now-button">
              Buy Now
            </button>
            <button onClick={handleAddToCart} className="add-to-cart-button">
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <hr />
      {/* Review Section */}
      <div className="review-section">
        <h2>Product Reviews</h2>
        <ol>
          {reviews
            .filter((review) => review.id === id)
            .map((review, index) => (
              <li key={index}>
                <div className="review-content">
                  <p className="review-text">{review.review.comment}</p>
                  <div className="review-details">
                    <p className="reviewer-name">{review.nameofreviewer}</p>
                    <p className="reviewer-status">{review.userType}</p>
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
        <button onClick={handleReviewSubmit} className="submit-review-button">
          Submit Review
        </button>
      </div>
      <Footer />
      <style jsx>{`
        .product-container {
          padding: 100px 20px 50px;
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
        }

        .product-details {
          margin-top: 30px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        .product-title {
          font-size: 20px;
          font-weight: bold;
        }

        .max-quantity-message {
          color: red;
          font-size: 14px;
          margin-top: 10px;
        }

        .button-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 20px;
        }

        .buy-now-button,
        .add-to-cart-button {
          background-color: #050a44;
          color: white;
          padding: 15px;
          border-radius: 2px;
          cursor: pointer;
          width: 100%;
        }

        .review-section {
          margin-top: 30px;
          max-width: 600px;
          margin: 0 auto;
          text-align: left; /* Ensure the section is left-aligned */
        }

        .review-section h2 {
          font-size: 24px;
          margin-bottom: 20px;
        }

        .review-section textarea {
          width: 100%;
          padding: 10px;
          margin-top: 10px;
          border-radius: 4px;
          border: 1px solid #ccc;
          resize: none;
        }

        .review-section button {
          margin-top: 10px;
          padding: 5px 10px;
          background-color: #3498db;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .review-section button:hover {
          background-color: #2980b9;
        }

        ul {
          padding-left: 0;
          list-style-type: none; /* Remove default bullets */
          color: #555;
          margin-bottom: 20px;
        }

        li {
          margin-bottom: 20px;
        }

        .review-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .review-text {
          margin-right: 10px;
          flex-grow: 1; /* Take the available space */
        }

        .review-details {
          text-align: right; /* Align text to the right */
          white-space: nowrap; /* Prevent line break */
        }

        .reviewer-name {
          font-weight: bold;
        }

        .reviewer-status {
          font-size: 0.8em; /* Smaller text for status */
          color: gray; /* Change color to indicate status */
        }

        @media (min-width: 768px) {
          .product-container {
            flex-direction: row;
            align-items: center;
            justify-content: space-around;
            padding-top: 150px;
          }

          .product-details {
            margin-left: 50px;
            text-align: left;
            align-items: flex-start;
            flex: 1;
          }

          .product-title {
            font-size: 24px;
          }

          .button-group {
            flex-direction: row;
          }

          .buy-now-button,
          .add-to-cart-button {
            width: auto;
          }

          .review-section {
            text-align: left; /* Align to left on larger screens */
            margin-left: 20px; /* Add margin to the left */
          }
        }
      `}</style>
    </div>
  );
};

export default ProductDescription;
