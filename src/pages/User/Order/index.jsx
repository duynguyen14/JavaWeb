import React from 'react'
import CheckoutSteps from '../CartShopping/CheckoutSteps'
import AddressSection from './AddressSection'
import OrderSummary from './OrderSummary'
import ListProduct from './ListProduct'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
function Order() {
  const location = useLocation();
  const data = location.state?.products || [];
  const [products,setProduct]=useState(data);
  const total=()=>{
    let sum=0
    products.map((product,index)=>{
      sum+= (product.price *product.quantity)
    })
    return sum;
  }
  return (
    <div className="lg:flex border-y-[1px] border-gray-300 py-10">
        <div className='lg:basis-[70%] lg:pr-3'>
            <div>
                <CheckoutSteps currentStep={2}/>
            </div>
            <div>
                <AddressSection/>
            </div>
            <div className='my-5'>
              <ListProduct products={products}/>
            </div>
        </div>
        <div className="lg:basis-[30%]">
          <OrderSummary total={total}/>
          <button className="w-full btn-secondary text-lg py-3 shadow-md my-5">HOÀN THÀNH</button>
          
        </div>
       
    </div>
  )
}

export default Order
