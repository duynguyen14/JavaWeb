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
import NavPopups from '../../../../Popups/NavPopups';
import { div } from 'framer-motion/client';
import Image from "../../../../../assets/images/1168.png";
import CartShoppingPopup from '../../../../Popups/CartShoppingPopup';
import WishlistPopup from '../../../../Popups/WishlistPopup';

function Header({setIsPopUp}) {
  const titles=[
    {name: "Nam", link:""},
    {name: "Nữ", link:""},
    {name: "Trẻ em", link:""},
    {name: "Phụ kiện thời trang", link:""},
    {name: "Về chúng tôi", link:""},
  ]

  const categoris=[
    {name:"Áo",detail:["Áo thun","Áo sơ mi","Áo khoác"]},
    {name:"Quần",detail:["Quần thun","Quần sơ mi","Quần khoác"]},
    {name:"Áo",detail:["Áo thun","Áo sơ mi","Áo khoác"]},
    
  ]
  const product={
    name:"Túi Xách Nhỏ In Hoạ Tiết Chuyển Màu",
    price:"699 000",
    image: Image
  }
  const [ismenu,setIsmenu]=useState(false);
  const [isSearch,setIsSearch]=useState(false);
  const [isUser,setIsUser]=useState(false);
  const [isNav,setIsNav]=useState(null);
  const [isCart,setIsCart]=useState(false);
  const [isLove,setIsLove]=useState(false)
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
    <div className='relative w-full '>
      <div className='font-Montserrat flex justify-between py-5 items-center mx-5 xl:mx-20 relative '>
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
        <ul className='xl:flex text-md lg:text-lg xl:text-xl font-semibold justify-around relative'>
        {
          titles.map((item,index)=>(
            <div
              key={index}
              onMouseEnter={() => setIsNav(index)}
              onMouseLeave={() => setIsNav(null)}
              // className='relative' // phải để relative để popup định vị chuẩn
            >
              <motion.li 
                className='lg:mx-3 flex items-center whitespace-nowrap h-full'
                whileHover={{color: "#e43131", cursor: "pointer"}}
                transition={{duration: 0.5}}
              >
                <p className='px-1'>
                  {item.name}
                </p>
                <HiChevronDown className='text-sm font-bold'/>
              </motion.li>

              {
                isNav === index &&
                <motion.div 
                  className='absolute top-full left-[-53%] w-[1380px] z-20'
                  initial={{opacity:0, y:30}}
                  animate={{opacity: 1, y: 0}}
                  exit={{opacity: 0, y: 30}}
                  transition={{duration: 0.3}}
                >
                  <div className='w-full h-10 opacity-0'>

                  </div>
                  <div className=''>
                    <NavPopups categoris={categoris} product={product} setIsNav={setIsNav}/>
                  </div>
                </motion.div>
              }
            </div>
          ))
        }
      </ul>
      </div>
        {/* menu icon */}
        <div className='lg:text-2xl xl:text-3xl grid grid-cols-2 lg:grid-cols-4 gap-x-5 font-semibold'>
            <p className=' my-icon' onClick={()=>handleOnclickSearch()}>
              <LuSearch/>
            </p>
            <p className='hidden lg:block my-icon' onClick={()=>handleOnclickUser()}>
              <FiUser/>
            </p>
            <p className='hidden lg:block my-icon'
              onClick={()=>setIsLove(true)}
            >
              <FaRegHeart/>
            </p>
            <p className=' my-icon'onClick={()=>setIsCart(!isCart)} >
              {/* <Link to={"/cartShopping"}> */}
                <LuShoppingBag/>  
              {/* </Link> */}
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
      {
        isCart &&
        <div className='w-[300px] md:w-[400px] absolute right-0 top-0 z-10 ' >
          <CartShoppingPopup isCart={isCart} setIsCart={setIsCart}/>
        </div>
      }
      {
        isLove &&
        <div className='w-[350px] md:w-[400px] absolute right-0 top-0 z-10 ' >
          <WishlistPopup isLove={isLove} setIsLove={setIsLove}/>
        </div>
      }
    </div>
  )
}
export default Header
