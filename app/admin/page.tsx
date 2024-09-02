"use client";
import { useEffect, useState } from "react";
import { getUserToken } from "../utility/authtoken";
import { useRouter } from "next/navigation";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";

type userDataType = {
  firstName: string;
  email: string;
  lastname: string;
  role: string;
};

export default function Home() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [updatequantity, updateQuantity] = useState("");
  const [productName, setProductName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [userData, setUserData] = useState<userDataType | null>(null);

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
          updatequantity,
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
      <Header />
      <div style={{ padding: "100px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "50px",
            marginBottom: "50px",
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              backgroundColor: "#f8f8f8",
              padding: "20px",
              borderRadius: "8px",
              flex: "1",
            }}
          >
            <h2>Add New Product</h2>
            {errorMessage && (
              <div style={{ color: "red", marginBottom: "10px" }}>
                {errorMessage}
              </div>
            )}
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: "100%", marginBottom: "10px" }}
            />
            <br />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ width: "100%", marginBottom: "10px" }}
            />
            <br />
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={{ width: "100%", marginBottom: "10px" }}
            />
            <br />
            <input
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              style={{ width: "100%", marginBottom: "10px" }}
            />
            <br />
            <input type="file" onChange={(e: any) => setFile(e.target.files[0])} />
            <br />
            <button
              type="submit"
              style={{
                marginTop: "10px",
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Submit Product
            </button>
            {imageUrl && (
              <div style={{ marginTop: "20px" }}>
                <img src={imageUrl} alt="Uploaded image" />
              </div>
            )}
          </form>

          <form
            onSubmit={addquantity}
            style={{
              backgroundColor: "#f8f8f8",
              padding: "20px",
              borderRadius: "8px",
              flex: "1",
            }}
          >
            <h2>Update Product Quantity</h2>
            <label htmlFor="product-name">Product Name</label>
            <input
              type="text"
              placeholder="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              style={{ width: "100%", marginBottom: "10px" }}
            />
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              placeholder="Quantity"
              value={updatequantity}
              onChange={(e) => updateQuantity(e.target.value)}
              style={{ width: "100%", marginBottom: "10px" }}
            />
            <button
              type="submit"
              style={{
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Update Quantity
            </button>
          </form>
        </div>

        <div style={{ textAlign: "center" }}>
          <button
            onClick={checkOrders}
            style={{
              padding: "10px 20px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            All Orders
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
