import React from 'react'
import { motion } from 'framer-motion'
import { HiOutlineX } from "react-icons/hi";
import { Link, useNavigate } from 'react-router-dom';
function NavPopups({categoris ,product,setIsNav}) {
    console.log(categoris)
    const navigate=useNavigate()
    const handleOnclick=()=>{
        setIsNav(null)
        navigate("/cartShopping")
    }
  return (
    <motion.div 
        className='w-full h-full bg-white font-kumbh py-5 flex border border-gray-200 rounded-3xl px-5 shadow-2xl'
           
    >   
        <div className='font-medium  grid grid-cols-3 basis-[70%]'>
            {categoris&&categoris.map((item,index)=>{
                return(
                    <div key={index}
                        className='hover:cursor-pointer'
                    >
                        <p className='py-3 uppercase font-semibold'>
                            {item.name}
                        </p>
                        {
                            item.detail.length>0&&
                            (
                                <div className='text-lg font-base'>
                                    {
                                        item.detail.map((item,ind)=>{
                                            return(
                                                <p  key={ind} className='py-1 '>
                                                    <p className='top-menu-item w-[34%]'
                                                        onClick={()=>handleOnclick()}
                                                    >
                                                        {item}
                                                    </p>

                                                </p>
                                            )
                                        })
                                    }
                                </div>
                            )
                        }
                    </div>
                )
            })}
        </div>
        <div className='basis-[30%] '>
            <p className='w-full my-4 uppercase'>
                Top bán chạy
            </p>
            <div className='w-[70%] items-center cursor-pointer'>
                <img src={product.image} alt="" className='rounded-2xl' />
                <p className='py-3'>
                    {product.name}
                </p>
                <p className='my-icon'>
                    {product.price}
                </p>
            </div>
        </div>
    </motion.div>
  )
}

export default NavPopups
