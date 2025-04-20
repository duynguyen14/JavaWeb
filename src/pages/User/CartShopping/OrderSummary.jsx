// components/OrderSummary.jsx
import React from 'react'

const OrderSummary = ({ products, formatPrice }) => {
  const total = products.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <div className="border border-gray-200 rounded-xl p-5 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Tổng đơn hàng</h2>
      <div className="flex justify-between mb-2">
        <span>Tạm tính:</span>
        <span>{formatPrice(total)}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Phí vận chuyển:</span>
        <span>{formatPrice(0)}</span>
      </div>
      <hr className="my-3" />
      <div className="flex justify-between font-bold text-lg">
        <span>Tổng cộng:</span>
        <span>{formatPrice(total)}</span>
      </div>
      <button className="w-full mt-5 bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">
        Tiến hành đặt hàng
      </button>
    </div>
  )
}

export default OrderSummary
