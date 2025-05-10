import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function NavPopups({ categoris, product, setIsNav }) {
  const navigate = useNavigate();

  const handleClick = (text) => {
    setIsNav(null);
    navigate(`/cartShopping?search=${encodeURIComponent(text)}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className='w-[1450px] h-full bg-white font-Montserrat rounded-3xl shadow-2xl border border-gray-200 flex overflow-hidden'
    >
      {/* Danh mục bên trái */}
      <div className='basis-2/3 px-8 py-6 overflow-y-auto'>
        <div className='grid grid-cols-2 lg:grid-cols-3 gap-6'>
          {categoris?.map((cat, i) => (
            <div key={i}>
              <h3 className='text-xl font-bold uppercase text-gray-800 mb-2'>
                {cat.name}
              </h3>
              <ul className='space-y-2'>
                {cat.detail?.map((detail, j) => (
                  <li key={j}>
                    <button
                      onClick={() => handleClick(detail)}
                      className='text-lg text-gray-600 hover:text-red-500 hover:underline transition cursor-pointer'
                    >
                      {detail}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Sản phẩm nổi bật bên phải */}
      <div className='basis-1/3 bg-gray-50 px-6 py-6 border-l border-gray-200 flex flex-col justify-between'>
        <div>
          <h2 className='text-lg font-semibold uppercase text-gray-700 mb-4'>
            Top bán chạy
          </h2>
          {product ? (
            <div
              onClick={() => handleClick(product.name)}
              className='cursor-pointer hover:bg-white hover:shadow-md rounded-xl p-3 transition'
            >
              <img
                src={product.image}
                alt={product.name}
                className='rounded-xl object-cover w-[300px] h-[400px] mb-3 transition-transform duration-300 hover:scale-105'
              />
              <p className='font-medium text-gray-800 line-clamp-2'>
                {product.name}
              </p>
              <p className='text-red-500 font-bold mt-2 text-lg'>
                {product.price.toLocaleString()}₫
              </p>
            </div>
          ) : (
            <p className='text-sm text-gray-500'>Không có sản phẩm nổi bật.</p>
          )}
        </div>
        {/* <p className='text-xs text-gray-400 text-right mt-4'>© 2025 YourShop</p> */}
      </div>
    </motion.div>
  );
}

export default NavPopups;
