import React, { useState } from 'react'
import Header from '../DefautLayout/UserLayout/Header';
import Footer from '../DefautLayout/UserLayout/Footer';
import Sidebar from './Sidebar'

function OtherLayout({children}) {
    const [isPopUp,setIsPopUp]=useState(false);
    return (
        <div
            style={isPopUp?{backgroundColor :"#e9ecef"}:{}
            }>
            <Header isPopUp={isPopUp} setIsPopUp={setIsPopUp}/>
            <div className='flex'>
                <Sidebar/>
                {children}
            </div>
            <Footer/>
        </div>
    )
}

export default OtherLayout
