// pages/CartShopping.jsx
import React, { useState } from "react";
import Image from "../../../assets/images/1168.png";
import CartItemList from "./CartItemList";
import CartSummary from "./CartSummary";
import CheckoutSteps from "./CheckoutSteps";
import { motion } from "framer-motion";
const products = [
  {
    id: 1,
    name: "Sapline Gile - Áo Croptop Tuytsi",
    color: "Kẻ Trắng ngà",
    size: "M",
    price: 1390000,
    quantity: 1,
    image: Image
  },
  {
    id: 2,
    name: "Sapline Gile - Áo Croptop Tuytsi",
    color: "Kẻ Trắng ngà",
    size: "M",
    price: 1390000,
    quantity: 1,
    image: Image
  },
  {
    id: 3,
    name: "Sapline Gile - Áo Croptop Tuytsi",
    color: "Kẻ Trắng ngà",
    size: "M",
    price: 1390000,
    quantity: 1,
    image: Image
  }
];
// const products
const handleOnclickPlus=()=>{

}
const handleOnclickSubtract=()=>{
  
}
function CartShopping() {
  return (
    <div className="mx-auto my-10">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="">
          <CheckoutSteps/>
          <CartItemList products={products} handleOnclickPlus={handleOnclickPlus}/>
        </div>
        <CartSummary products={products} handleOnclickSubtract={handleOnclickSubtract}/>
      </div>
    </div>
  );
}

export default CartShopping;
