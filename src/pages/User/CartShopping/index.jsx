// pages/CartShopping.jsx
import React, { useEffect, useState } from "react";
import Image from "../../../assets/images/1168.png";
import CartItemList from "./CartItemList";
import CartSummary from "./CartSummary";
import CheckoutSteps from "./CheckoutSteps";
// import { motion } from "framer-motion";
// import { Toaster, toast } from 'react-hot-toast';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {request} from "../../../untils/request.js"
const data = [
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

function CartShopping() {
  const [products,setProduct]=useState(data);
  const token= localStorage.getItem("token")
  console.log("token : ",token);
  const handleOnclickPlus=(item)=>{
   const updateProducts= products.map((product,index)=>{
    return product.id === item.id ? {...product, quantity: product.quantity+1}: product
   })
   setProduct(updateProducts);
   console.log("product",products);
  }
  const handleOnclickSubtract=(item)=>{
    if(item.quantity==1){
      if(window.confirm("Bạn chắc chắn muốn xoá sản phẩm này khỏi giỏ hàng")){
         const updateProducts= products.filter(product=>product.id!=item.id);
         setProduct(updateProducts)
         toast("Xoá sản phẩm thành công!", {
          theme: "colored",
          type: "success",
          position: "bottom-right",
        });
        return;
      }
    }
    const updateProducts= products.map((product,index)=>{
      return product.id === item.id ? {...product, quantity: product.quantity-1}: product
     })
     setProduct(updateProducts);
     console.log("product",products);
  }
  const handeleOnclickDelete=(item)=>{
    if(!window.confirm("Bạn chắc chắn muốn xoá sản phẩm này khỏi giỏ hàng")){
      return;
    }
    const updateProducts= products.filter(product=>product.id!=item.id);
    toast("Xoá sản phẩm thành công!", {
      theme: "colored",
      type: "success",
      position: "bottom-right",

    });
    setProduct(updateProducts);
  }
  useEffect(()=>{
    const fetch=async()=>{
      try{
        const response =await request.get("admin/demo",
          {
            headers: {
              Authorization :`Bearer ${token}`,
              "Content-Type": "application/json"
            }
          }
        )
        console.log(response.data)
      }
      catch(e){
        console.log("Lỗi ",e.response.data)
      }
    }
    fetch();
  },[])
  return (
    <div className="mx-auto py-10 border-gray-300 border-y-[1px]">
      <ToastContainer />
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="">
          <CheckoutSteps/>
          <CartItemList products={products} handleOnclickSubtract={handleOnclickSubtract} handleOnclickPlus={handleOnclickPlus} setProduct={setProduct} handeleOnclickDelete={handeleOnclickDelete}/>
        </div>
        <CartSummary products={products} setProduct={setProduct}/>
      </div>
    </div>
  );
}

export default CartShopping;
