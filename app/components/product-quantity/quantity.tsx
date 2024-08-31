import React from "react";

interface QuantityProps {
  quantity: number;
  handleIncreaseQuantity: () => void;
  handleDecreaseQuantity: () => void;
}

const Quantity = ({
  quantity,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
}: QuantityProps) => {
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
      <button
        onClick={handleDecreaseQuantity}
        style={{
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          border: "none",
          backgroundColor: "#ccc",
          color: "#fff",
          fontSize: "16px",
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginRight: "10px",
        }}
      >
        -
      </button>
      <span style={{ margin: "0 10px", fontSize: "16px" }}>{quantity}</span>
      <button
        onClick={handleIncreaseQuantity}
        style={{
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          border: "none",
          backgroundColor: "#ccc",
          color: "#fff",
          fontSize: "16px",
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: "10px",
        }}
      >
        +
      </button>
    </div>
  );
};

export default Quantity;
