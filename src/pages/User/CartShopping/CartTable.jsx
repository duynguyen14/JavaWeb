// components/CartTable.jsx
import React from 'react'
import CartItem from './CartItem'

const CartTable = ({ products, formatPrice }) => {
  const titles = ["Sản phẩm", "Giá", "Số lượng", "Tổng tiền",""]

  return (
    <div className="my-5">
      <table className="w-full table-auto border border-gray-200 rounded-xl overflow-hidden">
        <thead className="text-gray-700">
          <tr>
            {titles.map((item, index) => (
              <th key={index} className="py-3 px-4 text-left text-2xl font-semibold">
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => (
            <CartItem key={index} product={item} formatPrice={formatPrice} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CartTable
