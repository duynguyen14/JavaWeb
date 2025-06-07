import React, { useEffect, useState } from 'react'
import ProductItem from "../../../components/OtherComponent/ProductItem.jsx"
import { request } from '../../../untils/request.js';
function WishListProduct() {
  const [products,setProducts]=useState([]);
  const token =localStorage.getItem("token");
  useEffect(()=>{
    const fetch = async()=>{
      try{
        const response =await request.get("favorite/getAll",{
          headers :{
            Authorization :`Bearer ${token}`
          }
        })
        // console.log(response.data);
        setProducts(response.data.result);
      }
      catch(e){
        console.log("error ",e)
      }
    }
    fetch()
  },[])
  const handleOnclickDeleteLove = async (id) => {
      try {
        if (!token) {
          alert("Bạn vui lòng đăng nhập để thực hiện chức năng này!");
          setTimeout(() => {
            navigate("/login");
          }, 500);
          return;
        }
  
        if (!window.confirm("Xác nhận xoá sản phẩm này khỏi danh sách yêu thích")) return;
  
        const response = await request.delete(
          `favorite/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        alert("Xoá sản phẩm khỏi danh sách yêu thích thành công");
        // console.log(response.data);
        setProducts(products.filter(item=> item.id !== id))
      } catch (e) {
        console.log("error", e);
      }
    };
  return (
    <div className='ml-3 mt-10'>
      <div className="mt-5">
        {products && products.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 md:gap-x-10 gap-y-10 mb-12">
            {products.map((product, index) => (
              <div key={index} className="relative">
                <ProductItem
                  discountPercent={product.discountPercent}
                  id={product.id}
                  sizes={product.productSizeDTOS}
                  name={product.name}
                  price={product.price}
                  images={product.images}
                  soldCount={product.soldCount}
                  love={true}
                  handleOnclickDeleteLove={() => handleOnclickDeleteLove(product.id)}
                />
                <div className="absolute top-0 left-0 bg-orange-400 text-white text-xs font-semibold px-2 py-1 rounded-br-md">
                  NEW
                </div>
                {product.discountPercent
                  &&
                  <div className="absolute top-0 left-0 bg-red-700 text-white text-xs font-semibold px-2 py-1 rounded-br-3xl">
                      Best seller
                  </div>
                }
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default WishListProduct
