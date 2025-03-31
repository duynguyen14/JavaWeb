import React from 'react'
import Header from './Header'
import Footer from './Footer'

function UserLayout({children}) {
  return (
    <>
    <Header/>
    <div>
        {children}
    </div>
    <Footer/>    
    </>
  )
}

export default UserLayout
