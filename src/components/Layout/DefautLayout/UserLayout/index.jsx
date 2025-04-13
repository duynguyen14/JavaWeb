import React, { useState } from 'react'
import Header from './Header'
import Footer from './Footer'

function UserLayout({children}) {
  const [isPopUp,setIsPopUp]=useState(false);
  return (
    <div
    style={isPopUp?{backgroundColor :"#e9ecef"}:{}
    }>
    <Header isPopUp={isPopUp} setIsPopUp={setIsPopUp}/>
    <div>
        {children}
    </div>
    <Footer/>     
    </div>
  )
}

export default UserLayout
