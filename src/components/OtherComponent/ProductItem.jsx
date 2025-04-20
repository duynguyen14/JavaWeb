import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";

function ProductItem({ name, price, images }) {
  const [isHover, setIsHover] = useState(false);

  return (
    <div className=''>
      {/* image + hover effect */}
      <div
        className='overflow-hidden relative rounded-md cursor-pointer'
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        {/* product image */}
        <motion.img
          key={isHover ? "hover" : "normal"}
          src={isHover ? images[0] : images[1]}
          alt={name}
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{ opacity: 1, scale: 1.02 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="rounded-md w-full h-auto object-cover"
        />

        {/* add to cart button */}
        <motion.div
          className='absolute bottom-[10%] right-[5%] w-[90%]'
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isHover ? 1 : 0, y: isHover ? 0 : 50 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          <button className=' text-xs xl:text-xl w-full bg-white rounded-3xl py-2  px-2 lg:px-5 lg:py-3 cursor-pointer hover:bg-black hover:text-white transition-all duration-500 whitespace-nowrap'>
            Thêm vào giỏ hàng
          </button>
        </motion.div>

        {/* action icons */}
        <motion.div
          className='absolute top-[5%] right-[5%] text-base md:text-xl xl:text-3xl'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isHover ? 1 : 0, y: isHover ? 0 : -20 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <p className=' my-2 xl:my-5 p-1 xl:px-3 xl:py-3 bg-white rounded-full hover:bg-black hover:text-white transition-all duration-500'>
            <MdOutlineRemoveRedEye />
          </p>
          <p className='my-2 xl:my-5  p-1 xl:px-3 xl:py-3 bg-white rounded-full hover:bg-pink-400 hover:text-white transition-all duration-500'>
            <FaRegHeart />
          </p>
        </motion.div>
      </div>

      {/* name and price */}
      <div className='text-sm md:text-base lg:text-xl mx-3'>
        <p className='my-3 md:my-5'>{name}</p>
        <p className='font-semibold'>{price}</p>
      </div>
    </div>
  );
}

export default ProductItem;
