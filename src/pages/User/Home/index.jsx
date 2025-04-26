import React from 'react'
import Banner from './Banner';
import NewProduct from './NewProduct';
import ProductHot from './ProductHot';
import Collections from './Collections';
import { motion } from 'framer-motion';
function Home() {
  return (
    <div className=" lg:my-5 font-Montserrat">
      <Banner />
      <motion.div
      >
        <div className='my-5 lg:my-10'>
          <NewProduct />
        </div>
        <div className='my-5 lg:my-10'>
          <ProductHot />
        </div>
        <div className='my-5 lg:my-10'>
          <Collections />
        </div>
        {/* <div className="relative w-64 h-24 border border-gray-300 overflow-hidden rounded-lg">
      <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-500 animate-fill"></div>
      <div className="relative z-10 text-center leading-[6rem] text-white font-semibold">
        Đổ màu đỏ
      </div>
    </div> */}
      </motion.div>
    </div>
  )
}

export default Home
