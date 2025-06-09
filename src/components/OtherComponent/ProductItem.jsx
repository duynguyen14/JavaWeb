import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { request } from '../../untils/request';
function ProductItem({ id, name, price, images, soldCount, sizes, discountPercent }) {
  const [isHover, setIsHover] = useState(false);
  const [showSizes, setShowSizes] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const navigate =useNavigate();
  const token =localStorage.getItem("token");
  const toLocalePrice = (value) => {
    return value.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
  };

  const handleSelectSize = async(size) => {
    if(!window.confirm("Bạn xác nhận thêm sản phẩm này vào giỏ hàng")){
      return;
    }
      console.log(id)
    try{
      // call api
      const response = await request.post("/cart",{
        
          productId :id,
          quantity: 1,
          size: size.sizeName
      },
    {
      headers:{
        Authorization: `Bearer ${token}`
      }
    }
    )
    console.log(response.data)
      setSelectedSize(size);
      setShowSizes(false);
     if(response.data.code==1000){
      alert("Thêm sản phẩm thành công")
     }
    }
    catch(e){
      alert("Lỗi khi thêm sản phẩm vào giỏ")
      if(e.data.code==2000){
        alert("Phiên của bạn đã hết hạn vui lòng đăng nhập lại")
        navigate("/login")
      }
      console.log(e.data);
    }
  };

  return (
    <div className="relative">
      {/* Image + hover effect */}
      <div
        className='overflow-hidden relative rounded-md cursor-pointer'
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <Link to={`product/${id}`}>
          <motion.img
            key={isHover ? "hover" : "normal"}
            src={isHover ? `http://localhost:8080/images/${images[0]}.png` : `http://localhost:8080/images/${images[1]}.png`}
            alt={name}
            initial={{ opacity: 0.8, scale: 1 }}
            animate={{ opacity: 1, scale: 1.02 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="rounded-xs w-full object-cover md:h-[350px]"
          />
        </Link>

        {/* Discount badge */}
        {discountPercent && (
          <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs md:text-sm font-bold px-2 py-1 rounded-bl-md z-10">
            -{discountPercent}%
          </div>
        )}

        {/* Hover buttons */}
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
        <div className='flex justify-between items-center relative'>
          <div>
            <div className='flex'>
              <p className='font-semibold line-through'
                style={discountPercent!=null?{textDecorationLine: "line-through"}:{textDecorationLine: "none"}}
              >{toLocalePrice(price)}</p>
              {
                discountPercent&& <p className='pl-4 font-semibold text-red-500'>
                  {toLocalePrice(price -price*discountPercent/100)}
                </p>
              }
            </div>
            <p className='font-base text-gray-400 pt-2'>Đã bán {soldCount}</p>
            {selectedSize && (
              <p className="text-sm text-green-600 mt-1">
                Size đã chọn: {selectedSize.name || selectedSize.sizeName || selectedSize}
              </p>
            )}
          </div>
          <div
            className='text-lg p-2 h-10 btn-secondary cursor-pointer'
            onClick={() => setShowSizes(!showSizes)}
            title="Chọn size"
          >
            <FiShoppingBag />
          </div>

          {/* Size selector popup */}
          {showSizes && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: -10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="absolute bottom-full right-0 mt-2 bg-white rounded-lg shadow-lg p-4 w-30 z-50"
            >
              <h3 className="text-sm font-semibold mb-2 text-center">Chọn size</h3>
              <ul className="max-h-40 overflow-y-auto text-sm">
                {sizes && sizes.length > 0 ? (
                  sizes.map((size, index) => (
                    <li
                      key={index}
                      className="p-1 cursor-pointer hover:bg-gray-200 rounded text-center"
                      onClick={() => handleSelectSize(size)}
                    >
                      {size.sizeName}
                    </li>
                  ))
                ) : (
                  <p>Không có size nào.</p>
                )}
              </ul>
              <button
                className="mt-2 w-full px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-xs"
                onClick={() => setShowSizes(false)}
              >
                Đóng
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
