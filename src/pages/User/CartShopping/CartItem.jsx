// components/CartItem.jsx
import React from 'react'
import { TiDeleteOutline } from "react-icons/ti";

import { TiPlus } from "react-icons/ti";
import { GrFormSubtract } from "react-icons/gr";
const CartItem = ({ product, formatPrice }) => {
  return (
    <tr className="border-t-[1px] border-gray-200">
      <td className="py-4 px-4 flex items-center gap-3">
        <img
          src={product.image}
          alt={product.name}
          className="w-[150px] h-[215px] object-cover rounded-2xl"
        />
        <div className='font-medium text-lg '>
          <p>
            {product.name}
          </p>
          <p>
           Size: {product.size}
          </p>
        </div>
      </td>
      <td className="py-4 px-4 text-xl text-gray-700 ">
        {formatPrice(product.price)}
      </td>
      <td className="py-4 px-4 text-xl text-gray-700">
        <div className='flex justify-around items-center'>
          <p className='cursor-pointer'>
            <TiPlus/>
          </p>
          <p>
            {product.quantity}
          </p>
          <p className='cursor-pointer'>
            <GrFormSubtract/>
          </p>
        </div>
      </td>
      <td className="py-4 px-4 font-semibold text-black text-xl">
        {formatPrice(product.quantity * product.price)}
      </td>
      <td>
        <p className='text-3xl text-red-500 cursor-pointer hover:scale-125 transition-all duration-500'>
          <TiDeleteOutline/>
        </p>
      </td>
    </tr>
  )
}

export default CartItem
