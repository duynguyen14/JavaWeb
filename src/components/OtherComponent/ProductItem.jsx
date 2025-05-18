import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
function ProductItem({ name, price, images,soldCount }) {
  const [isHover, setIsHover] = useState(false);

  const toLocalePrice = (value) => {
    return value.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
  };

  return (
    <div className=''>
      {/* Image + hover effect */}
      <div
        className='overflow-hidden relative rounded-md cursor-pointer'
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        {/* NEW badge */}
        {/* Product image */}
        <motion.img
          key={isHover ? "hover" : "normal"}
          src={isHover ? `http://localhost:8080/images/${images[0]}.png` : `http://localhost:8080/images/${images[1]}.png`}
          alt={name}
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{ opacity: 1, scale: 1.02 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="rounded-xs w-full object-cover  md:h-[350px]"
        />

        {/* Add to cart button */}
        {/* <motion.div
          className='absolute bottom-[10%] right-[5%] w-[90%]'
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isHover ? 1 : 0, y: isHover ? 0 : 50 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          <button className='text-xs xl:text-base w-full bg-white rounded-3xl py-2 px-2 lg:px-3 lg:py-3 cursor-pointer hover:bg-black hover:text-white transition-all duration-500 whitespace-nowrap'>
            Thêm vào giỏ hàng
          </button>
        </motion.div> */}

        {/* Action icons */}
        <motion.div
          className='absolute top-[5%] right-[5%] text-base md:text-xl xl:text-xl group'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isHover ? 1 : 0, y: isHover ? 0 : -20 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <p className='my-2 xl:my-5 p-1 xl:px-3 xl:py-3 bg-white rounded-full hover:bg-black hover:text-white transition-all duration-500'>
            <MdOutlineRemoveRedEye />
          </p>
          <p className='my-2 xl:my-5 p-1 xl:px-3 xl:py-3 bg-white rounded-full hover:bg-pink-400 hover:text-white transition-all duration-500'>
            <FaRegHeart />
          </p>
        </motion.div>
      </div>

      {/* Product name and price */}
      <div className='text-sm md:text-base mx-1'>
        <p className='my-3 text-justify h-[55px]'>{name.length > 60 ? name.slice(0, 30) + '...' : name}</p>
        <div className='flex justify-between'>
          <div>
            <p className='font-semibold'>{toLocalePrice(price)}</p>
            <p className='font-base text-gray-400 pt-2'>Đã bán {soldCount}</p>
          </div>
          <div className='text-lg p-2  h-10 btn-secondary'>
            <FiShoppingBag/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;