// pages/CartShopping.jsx
import React, { useEffect, useState } from "react";
import Image from "../../../assets/images/1168.png";
import CartItemList from "./CartItemList";
import CartSummary from "./CartSummary";
import CheckoutSteps from "./CheckoutSteps";
// import { motion } from "framer-motion";
// import { Toaster, toast } from 'react-hot-toast';
import {request} from "../../../untils/request.js"
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
function CartShopping() {
  const location = useLocation();
  const data = location.state?.products || [];
  const [products,setProduct]=useState(data);
  const token= localStorage.getItem("token")
  console.log("token : ",token);
  const navigate =useNavigate();
  const handleOnclickPlus=(item)=>{
   const updateProducts= products.map((product,index)=>{
    return product.productId === item.productId ? {...product, quantity: product.quantity+1}: product
   })
   setProduct(updateProducts);
   console.log("product",products);
  }
  const handleOnclickSubtract=(item)=>{
    if(item.quantity==1){
      if(window.confirm("Bạn chắc chắn muốn xoá sản phẩm này khỏi giỏ hàng")){
         const updateProducts= products.filter(product=>product.productId!=item.productId);
         setProduct(updateProducts)
        //  toast("Xoá sản phẩm thành công!", {
        //   theme: "colored",
        //   type: "success",
        //   position: "bottom-right",
        // });
        alert("Xoá sản phẩm khỏi giỏ hàng thành công!")
        return;
      }
    }
    const updateProducts= products.map((product,index)=>{
      return product.productId === item.productId ? {...product, quantity: product.quantity-1}: product
     })
     setProduct(updateProducts);
     console.log("product",products);
  }
  const handeleOnclickDelete=(item)=>{
    if(!window.confirm("Bạn chắc chắn muốn xoá sản phẩm này khỏi giỏ hàng")){
      return;
    }
    const updateProducts= products.filter(product=>product.productId!=item.productId);
    alert("xoá sản phẩm thành công")
    setProduct(updateProducts);
  }
  // useEffect(()=>{
  //   const fetch=async()=>{
  //     try{
  //       const response =await request.get("admin/demo",
  //         {
  //           headers: {
  //             Authorization :`Bearer ${token}`,
  //             "Content-Type": "application/json"
  //           }
  //         }
  //       )
  //       console.log(response.data)
  //     }
  //     catch(e){
  //       console.log("Lỗi ",e.response.data)
  //     }
  //   }
  //   fetch();
  // },[])
  const handleOnclickOrder=()=>{
    navigate("/order", { state: { products } })
  }
  return (
    <div className="mx-auto py-10 border-gray-300 border-y-[1px]">
      {/* <ToastContainer /> */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="">
          <CheckoutSteps currentStep={1}/>
          <CartItemList products={products} handleOnclickSubtract={handleOnclickSubtract} handleOnclickPlus={handleOnclickPlus} setProduct={setProduct} handeleOnclickDelete={handeleOnclickDelete}/>
        </div>
        <CartSummary products={products} setProduct={setProduct} handleOnclickOrder={handleOnclickOrder}/>
      </div>
    </div>
  );
}

export default CartShopping;
