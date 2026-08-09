import React from "react";
import type { QuantityProps } from "@/app/types/type";
import s from "./quantity.module.scss";

const Quantity = ({
  quantity,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
}: QuantityProps) => {
  return (
    <div className={s.quantityControl}>
      <button
        onClick={handleDecreaseQuantity}
        className={`${s.quantityButton} ${s.quantityButtonMinus}`}
      >
        -
      </button>
      <span className={s.quantityValue}>{quantity}</span>
      <button
        onClick={handleIncreaseQuantity}
        className={`${s.quantityButton} ${s.quantityButtonPlus}`}
      >
        +
      </button>
    </div>
  );
};

export default Quantity;
