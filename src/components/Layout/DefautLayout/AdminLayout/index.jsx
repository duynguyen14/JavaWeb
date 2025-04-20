import React from 'react'
import Header from './Header'
import Footer from './Footer'

function AdminLayout({children}) {
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

export default AdminLayout
