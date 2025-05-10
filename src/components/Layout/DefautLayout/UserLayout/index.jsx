import React, { useState } from 'react'
import Header from './Header'
import Footer from './Footer'

function UserLayout({children}) {
  const [isPopUp,setIsPopUp]=useState(false);
  return (
    <div className='font-Montserrat'
    style={isPopUp?{backgroundColor :"#e9ecef"}:{}
    }>
    <Header isPopUp={isPopUp} setIsPopUp={setIsPopUp}/>
    <div className='mx-2 xl:mx-20'>
        {children}
    </div>
    <Footer/>     
    </div>
  )
}

export default UserLayout
