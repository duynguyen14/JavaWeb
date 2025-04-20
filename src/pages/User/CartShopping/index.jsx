import React from 'react'
import StepProgress from './StepProgress'
import Image1 from "../../../assets/images/1168.png"
import CartTable from './CartTable'
import OrderSummary from './OrderSummary'

function CartShopping() {
  const products = [
    {
      name: "Túi Xách Nhỏ In Hoạ Tiết Chuyển Màu",
      price: 699000,
      image: Image1,
      quantity: 1,
      size :"XL",
    },
    // ... các sản phẩm khác
  ]

  const formatPrice = (price) =>
    price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })

  return (
    <div className="mx-5 xl:mx-20 xl:flex font-kumbh">
      <div className="basis-[75%]">
        {/* <StepProgress currentStep={0} /> */}
        <CartTable products={products} formatPrice={formatPrice} />
      </div>

      <div className="basis-[25%] p-3 mt-5 xl:mt-0">
        <OrderSummary products={products} formatPrice={formatPrice} />
      </div>
    </div>
  )
}

export default CartShopping
