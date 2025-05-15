import React from 'react'
import CheckoutSteps from '../CartShopping/CheckoutSteps'
import AddressSection from './AddressSection'
import OrderSummary from './OrderSummary'
import ListProduct from './ListProduct'
function Order() {
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
              <ListProduct/>
            </div>
        </div>
        <div className="lg:basis-[30%]">
          <OrderSummary />
          <button className="w-full btn-secondary text-lg py-3 shadow-md my-5">HOÀN THÀNH</button>
          
        </div>
       
    </div>
  )
}

export default Order
