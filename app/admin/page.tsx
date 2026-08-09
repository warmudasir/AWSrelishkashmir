"use client";
import { useEffect, useState } from "react";
import { getUserToken } from "../../utility/authtoken";
import { useRouter } from "next/navigation";
import type { UserDataType } from "../types/type";
import s from "./admin.module.scss";

export default function Home() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [updateQuantity, setUpdateQuantity] = useState("");
  const [productName, setProductName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [userData, setUserData] = useState<UserDataType | null>(null);

  useEffect(() => {
    const userData = getUserToken();
    setUserData(userData);
    if (userData === null || userData.role !== "admin") {
      if (userData?.role === "deliveryagent") {
        router.push("/deliveryagent");
      } else {
        router.push("/");
      }
    }
  }, []); // Add an empty dependency array

  const checkOrders = () => {
    router.push("/allorders");
  };
  const addquantity = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const orderResponse = await fetch("/api/updatequantity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          updateQuantity,
          productName,
        }),
      });

      if (orderResponse.ok) {
        console.log("Quantity updated successfully");
      } else {
        console.error("Error updating quantity");
      }
    } catch (error) {
      console.error("Error updating quantity", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("quantity", quantity);

    try {
      const res = await fetch("/api/imageupload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setImageUrl(data.imageUrl);
        setErrorMessage(""); // Clear any previous error message
      } else {
        const errorData = await res.json();
        if (errorData.error) {
          setErrorMessage("The product with the same name already exists");
        } else {
          setErrorMessage("Error uploading image");
        }
      }
    } catch (error) {
      console.error("Error uploading image", error);
      setErrorMessage("Error uploading image");
    }
  };

  return (
    <div>
      <div className={s.pageWrapper}>
        <div className={s.dashboardLayout}>
          <form onSubmit={handleSubmit} className={s.panel}>
            <h2 className={s.panelTitle}>Add New Product</h2>
            {errorMessage && <div className={s.errorMessage}>{errorMessage}</div>}
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={s.input}
            />
            <br />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={s.textarea}
            />
            <br />
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className={s.input}
            />
            <br />
            <input
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className={s.input}
            />
            <br />
            <input
              type="file"
              onChange={(e: any) => setFile(e.target.files[0])}
              className={s.uploadInput}
            />
            <br />
            <button type="submit" className={s.submitButton}>
              Submit Product
            </button>
            {imageUrl && (
              <div className={s.imagePreview}>
                <img src={imageUrl} alt="Uploaded image" />
              </div>
            )}
          </form>

          <form onSubmit={addquantity} className={s.panel}>
            <h2>Update Product Quantity</h2>
            <label htmlFor="product-name">Product Name</label>
            <input
              type="text"
              placeholder="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className={s.input}
            />
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              placeholder="Quantity"
              value={updateQuantity}
              onChange={(e) => setUpdateQuantity(e.target.value)}
              className={s.input}
            />
            <button type="submit" className={s.submitButton}>
              Update Quantity
            </button>
          </form>
        </div>

        <div className={s.actions}>
          <button onClick={checkOrders} className={s.orderButton}>
            All Orders
          </button>
        </div>
      </div>
    </div>
  );
}
