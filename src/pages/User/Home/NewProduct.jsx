import { motion } from 'framer-motion'
import React from 'react'
import ProductItem from '../../../components/OtherComponent/ProductItem'
import Image1 from "../../../assets/images/1169.png"
import Image2 from "../../../assets/images/1168.png"
import { Link } from 'react-router-dom'
function NewProduct({newProduct}) {
    // const product=[
    //     {
    //     id:1,
    //       name:"Túi Xách Nhỏ In Hoạ Tiết Chuyển Màu",
    //       price:"699 000",
    //       images:[Image1,Image2]
    //     },
    //     {
    //         id:2,
    //       name:"Túi Xách Nhỏ In Hoạ Tiết Chuyển Màu",
    //       price:"699 000",
    //       images:[Image1,Image2]
    //     },{
    //         id:3,
    //       name:"Túi Xách Nhỏ In Hoạ Tiết Chuyển Màu",
    //       price:"699 000",
    //       images:[Image1,Image2]
    //     },{
    //         id:4,
    //       name:"Túi Xách Nhỏ In Hoạ Tiết Chuyển Màu",
    //       price:"699 000",
    //       images:[Image1,Image2]
    //     },{
    //         id:5,
    //         name:"Túi Xách Nhỏ In Hoạ Tiết Chuyển Màu",
    //         price:"699 000",
    //         images:[Image1,Image2]
    //     },
    // ]
    return (
        <motion.div
            initial={{opacity:0 ,y:100}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 1.2}}
            viewport={{ once: true }}
        >
             <p className='text-lg  md:text-xl lg:text-4xl font-semibold text-center mb-2 md:mb-4 cursor-pointer'>
                New arrival
            </p>
            <p className='text-sm md:text-xl lg:text-xl font-light text-center mb-12'>
                Phong cách mới nâng tầm vẻ ngoài của bạn !
            </p>
            <div className='grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-x-6 md:gap-x-10 gap-y-10 mb-10'>
                {
                    newProduct.map((item,index)=>{
                        return(
                            <motion.div key={index} 
                                        initial={{opacity:0 ,y: (index+1)*20}}
                                        whileInView={{opacity: 1, y: 0}}
                                        transition={{duration: 1.2}}
                                        viewport={{ once: true }}
                            >   

                                <div className='relative'>
                                    <ProductItem discountPercent={item.discountPercent} id={item.id} sizes={item.productSizeDTOS} name={item.name} price={item.price} images={item.images} soldCount={item.soldCount}/>   
                                    <div className="absolute top-0 left-0 bg-orange-400 text-white text-xs font-semibold px-2 py-1 rounded-br-md z-10">
                                            NEW
                                    </div>
                                </div>
 

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

export default NewProduct