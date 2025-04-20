import React, { useState } from 'react'
import { motion } from 'framer-motion';

import { HiChevronDown } from "react-icons/hi2";
import { LuSearch } from "react-icons/lu";
import { FiUser } from "react-icons/fi";
import { LuShoppingBag } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";

import { HiOutlineMenuAlt1 } from "react-icons/hi";
import MenuPopus from '../../../../Popups/MenuPopus';
import SearchPopup from '../../../../Popups/SearchPopup';
import UserPopUp from '../../../../Popups/UserPopUp';

import { Link } from 'react-router-dom';
function Header({setIsPopUp}) {
  const titles=[
    {name: "Nam", link:""},
    {name: "Nữ", link:""},
    {name: "Trẻ em", link:""},
    {name: "Phụ kiện thời trang", link:""},
    {name: "Về chúng tôi", link:""},
  ]

  const [ismenu,setIsmenu]=useState(false);
  const [isSearch,setIsSearch]=useState(false);
  const [isUser,setIsUser]=useState(false);
  const handleOnclickSearch=()=>{
    setIsSearch(!isSearch)
    setIsPopUp(true)
    setIsUser(false)
  }
  const handleOnclickUser=()=>{
    setIsUser(!isUser)
    setIsPopUp(true)
    setIsSearch(false)
  }
  return (
      <div className='relative w-full'>
        <div className='font-kumbh flex justify-between py-5 items-center mx-5 xl:mx-20 relative'>
          <div className='text-xl lg:text-3xl xl:hidden'>
            <HiOutlineMenuAlt1 onClick={()=>setIsmenu(!ismenu)} className='font-semibold'/>
            {
                ismenu&&
                <div className='absolute w-[80%] md:w-[50%] mx-[-20px] top-0 z-10'>
                  <MenuPopus className='w-full relative'ismenu={ismenu} setIsmenu={setIsmenu}/>
                </div>
            }
          </div>
          {/* logo */}
          <div className='absolute left-1/2 transform -translate-x-1/2 text-2xl xl:relative xl:left-0 xl:translate-0 lg:text-3xl font-semibold whitespace-nowrap cursor-pointer uppercase'>
            <Link to={"/"}>
              Foxy Store
            </Link>
          </div>
          {/* menu */}
          <div className='hidden xl:block xl:mx-20'>
            <ul className='lg:flex text-md lg:text-lg font-semibold justify-around'>
              {
                titles.map((item,index)=>{
                  return(
                      <motion.li
                          key={index}
                          className='lg:px-3 flex items-center whitespace-nowrap'
                          whileHover={{color: "#e43131", cursor: "pointer"}}
                          transition={{duration: 0.5}}
                      >
                        <p className='px-1'>
                          {item.name}
                        </p>
                        <HiChevronDown className='text-sm font-bold'/>
                      </motion.li>
                  )
                })
              }
            </ul>
          </div>
          {/* menu icon */}
          <div className='lg:text-2xl grid grid-cols-2 lg:grid-cols-4 gap-x-5 font-semibold'>
            <p className=' my-icon' onClick={()=>handleOnclickSearch()}>
              <LuSearch/>
            </p>
            <p className='hidden lg:block my-icon' onClick={()=>handleOnclickUser()}>
              <FiUser/>
            </p>
            <p className='hidden lg:block my-icon'>
              <FaRegHeart/>
            </p>
            <p className=' my-icon'>
              <LuShoppingBag/>
            </p>

          </div>
        </div>
        {
            isSearch&&
            <div className='absolute left-1/2 transform -translate-x-1/2 w-[95%] lg:w-[90%] rounded-xl border border-white bg-white h-auto z-10 pb-20'
                // style={{overflowY: 'auto',maxHeight: "120vh"}}
            >
              <SearchPopup setIsSearch={setIsSearch} setIsPopUp={setIsPopUp}/>
            </div>
        }
        {
            isUser&&
            <div className='absolute right-10 mt-2 w-[350px] bg-white rounded-2xl shadow-md z-10'>
              <UserPopUp setIsUser={setIsUser} setIsPopUp={setIsPopUp}/>
            </div>
        }
      </div>
  )
}
export default Header