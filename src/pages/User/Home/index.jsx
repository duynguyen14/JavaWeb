import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import NewProduct from "./NewProduct";
import ProductHot from "./ProductHot";
import Collections from "./Collections";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

import { request } from "../../../untils/request";
function Home() {
  const location = useLocation();
  const [newProduct, setNewProduct] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  useEffect(() => {
    if (location.state?.successLogin) {
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await request.get("products");
        console.log(response.data);
        if (response.data.code === 1000) {
          setNewProduct(response.data.result);
        }
      } catch (e) {
        console.log("Lỗi " + e);
      }
    };
    fetch();
  }, []);

  return (
    <div className=" lg:my-5 font-Montserrat">
      {showSuccess && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-green-300 text-white px-6 py-3 rounded-lg shadow-2xl z-50 transition-all duration-500 animate-fade-in">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span className="font-semibold text-lg">Đăng nhập thành công!</span>
        </div>
      )}
      <Banner />
      <motion.div>
        <div className="my-5 lg:my-10">
          <NewProduct newProduct={newProduct} />
        </div>
        <div className="my-5 lg:my-10">
          <ProductHot />
        </div>
        <div className="my-5 lg:my-10">
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
  );
}

export default Home;
