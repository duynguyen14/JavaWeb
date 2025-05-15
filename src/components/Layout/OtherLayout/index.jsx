import React, { useState } from 'react'
import Header from '../DefautLayout/UserLayout/Header';
import Footer from '../DefautLayout/UserLayout/Footer';
import Sidebar from './Sidebar'
function OtherLayout({children}) {
    const [isPopUp,setIsPopUp]=useState(false);
    return (
        <div
        className='font-Montserrat'
            style={isPopUp?{backgroundColor :"#e9ecef"}:{}
            }>
            <Header isPopUp={isPopUp} setIsPopUp={setIsPopUp}/>
            <div className='flex mx-2 xl:mx-20 border-t-[1px] border-gray-300'>
                <div className='hidden lg:block'>
                    <Sidebar/>
                </div>
                {children}
            </div>
            <Footer/>
        </div>
    )
}
export default OtherLayout;
