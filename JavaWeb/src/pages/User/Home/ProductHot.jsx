import React from 'react'
import Image1 from "../../../assets/images/1169.png"
import Image2 from "../../../assets/images/1168.png"
import { motion } from 'framer-motion'
import ProductItem from '../../../components/OtherComponent/ProductItem'
function ProductHot() {
    const product=[
        {
          name:"Túi Xách Nhỏ In Hoạ Tiết Chuyển Màu",
          price:"699 000",
          images:[Image1,Image2]
        },
        {
          name:"Túi Xách Nhỏ In Hoạ Tiết Chuyển Màu",
          price:"699 000",
          images:[Image1,Image2]
        },{
          name:"Túi Xách Nhỏ In Hoạ Tiết Chuyển Màu",
          price:"699 000",
          images:[Image1,Image2]
        },{
          name:"Túi Xách Nhỏ In Hoạ Tiết Chuyển Màu",
          price:"699 000",
          images:[Image1,Image2]
        },{
            name:"Túi Xách Nhỏ In Hoạ Tiết Chuyển Màu",
            price:"699 000",
            images:[Image1,Image2]
          },
    ]
    return (
        <motion.div
            initial={{opacity:0 ,y:100}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 1.2}}
            viewport={{ once: true }}
        >
             <p className='text-lg  md:text-xl lg:text-4xl font-semibold text-center mb-2 md:mb-4 cursor-pointer'>
                Best Seller
            </p>
            <p className='text-sm md:text-xl lg:text-xl font-light text-center mb-10'>
                Lựa chọn phong cách phù hợp với bạn !
            </p>
            <div className='grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-x-6 md:gap-x-10 gap-y-10 mb-12'>
                {
                    product.map((item,index)=>{
                        return(
                            <motion.div key={index} 
                                        initial={{opacity:0 ,y: (index+1)*50}}
                                        whileInView={{opacity: 1, y: 0}}
                                        transition={{duration: 1.2}}
                                        viewport={{ once: true }}
                            >
                                <ProductItem name={item.name} price={item.price} images={item.images}/>

                            </motion.div>
                        )
                    })
                }
            </div>
            <div className='flex justify-center w-full'>
                <button className='btn-primary px-3 py-2 md:px-4 md:py-3 lg:px-8 lg:py-4'>
                    Xem tất cả
                </button>
            </div>
        </motion.div>
  )
}
export default ProductHot