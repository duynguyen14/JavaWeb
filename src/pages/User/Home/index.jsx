import React, { useEffect, useState } from 'react'
import Banner from './Banner';
import NewProduct from './NewProduct';
import ProductHot from './ProductHot';
import Collections from './Collections';
import { motion } from 'framer-motion';

import { request } from '../../../untils/request';
function Home() {

  const [newProduct,setNewProduct] =useState([]);
  const[saleProduct,setSaleProduct] =useState([])

  const handleOnclickLove=()=>{
      
  }
  useEffect(()=>{
    const fetch=async()=>{
      try{
        const response =await request.get("products/home")
        console.log(response.data)
        if(response.data.code ===1000){
          setNewProduct(response.data.result.productsNew);
          setSaleProduct(response.data.result.productsSale)
        }
      }
      catch(e){
        console.log("Lỗi "+e)
      }
    }
    fetch();
  },[])


  return (
    <div className=" lg:my-5 font-Montserrat">
      <Banner />
      <motion.div
      >
        <div className='my-5 lg:my-10'>
          <NewProduct newProduct={newProduct}/>
        </div>
        <div className='my-5 lg:my-10'>
          <ProductHot saleProduct={saleProduct}/>
        </div>
        <div className='my-5 lg:my-10'>
          <Collections />
        </div>
      </motion.div>
    </div>
  )
}

export default Home
