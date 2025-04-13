import React from 'react'
import Banner from './Banner';
import NewProduct from './NewProduct';
import ProductHot from './ProductHot';
function Home() {
  return (
    <div className="mx-5 xl:mx-20 lg:my-10 font-kumbh">
      <Banner/>
      <div className='my-5 lg:my-10'>
        <NewProduct/>
      </div>
      <div className='my-5 lg:my-10'>
        <ProductHot/>
      </div>
    </div>
  )
}

export default Home
