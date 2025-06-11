import React, { useEffect, useState } from 'react';
import { Heart, Share, Truck, HelpCircle, Eye, Minus, Plus } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { request } from '../../../untils/request';
import ProductReviews from './ProductReviews';
import ProductShowcase from './ProductShowcase';
function Product() {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const {id}=useParams();
  // const [product,setProduct]=useState(null);
  const [product,setProduct]=useState({
    quantity: 1,
    productSizeDTOS:[],
    price: 1,
    soldCount: 10,
    name:"",
    categoryName: "",
    images: [],
  });
  const [imageIndex,setImageIndex]=useState(0);
  const token =localStorage.getItem("token")
  const navigate =useNavigate();
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  const toLocalePrice = (value) => {
    return value.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
  };
  useEffect(()=>{
    const fetch =async()=>{
      try{
        const response =await request.get(`product/${id}`)

        console.log(response.data);
        setProduct(response.data.result)
      }
      catch(e){
        console.log("loi "+e.data)
      }
    }
    fetch();
  },[])
  const handleOnclickAddCart=async()=>{
    if(selectedSize==null){
      alert("Bạn chưa chọn size ")
      return;
    }
    if(!window.confirm("Bạn xác nhận thêm sản phẩm này vào giỏ")){
      return;
    }
    try{
      const response = await request.post("/cart",{
                productId :product.id,
                quantity: quantity,
                sizeName: selectedSize
            },
            {
              headers:{
                Authorization: `Bearer ${token}`
            }
            }
          )
          console.log(response.data)
          if(response.data.code==1000){
            alert("thêm sản phẩm vào giỏ hàng thành công")
          }
    }
    catch(e){
      if(e.response.data.code==2000){
        alert("Phiên của bạn đã hết hạn vui lòng đăng nhập lại")
        navigate("/login")
      }
      console.log("Loi ",e)
    }
  }
  return (
    product&&
    <div>

    <div className="mx-auto p-4 flex flex-col md:flex-row gap-8 border-y-[1px] border-gray-300 py-10">
      {/* Product Images Section */}
      <div className="flex flex-col md:flex-row gap-4 w-full md:w-1/2">
        <div className="flex flex-row md:flex-col gap-2">
          {/* Thumbnail Images */}
          {product.images.map((item,index) => (
            <div key={index} className="w-16 h-20 border rounded overflow-hidden"
            onClick={()=>setImageIndex(index)}
            >
              <img 
                src={`http://localhost:8080/images/${item}.png`} 
                alt={`Product thumbnail ${index}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        
        {/* Main Product Image */}
        <div className="flex-1">
          <img 
            src={`http://localhost:8080/images/${product.images[imageIndex]}.png`}
            alt="Stretch Strap Top main view"
            className="w-full h-full object-cover rounded"
          />
        </div>
      </div>

      {/* Product Details Section */}
      <div className="w-full md:w-1/2">
        <div className="text-sm text-gray-500 uppercase mb-2">{product.categoryName}</div>
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        
        {/* Ratings */}
        <div className="flex items-center mb-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className="text-yellow-500">★</span>
            ))}
          </div>
          <span className="ml-2 text-sm">(134 đánh giá)</span>
          <span className="ml-4 text-sm">đã bán {product.soldCount}</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl font-bold">{toLocalePrice(product.price)}</span>
        </div>
        Live Viewers
        <div className="flex items-center gap-2 mb-6 text-sm">
          <Eye size={16} />
          <span>28 người đang xem</span>
        </div>
        {/* Size */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <div>Size: <span className="font-medium">{selectedSize}</span></div>
            <button className="text-sm underline">Loại Size</button>
          </div>
          <div className="flex gap-2">
            {product.productSizeDTOS.map((size,index) => (
              <button 
                key={index} 
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  selectedSize === size 
                    ? 'bg-black text-white' 
                    : 'bg-white border text-black'
                }`}
                onClick={() => setSelectedSize(size.sizeName)}
              >
                {size.sizeName}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div className="mb-6 md:flex items-center">
          <div className="mb-2 mr-2">Số Lượng: </div>
          <div className="flex items-center">
            <button 
              className="w-10 h-10 border rounded-l flex items-center justify-center cursor-pointer"
              onClick={decrementQuantity}
            >
              <Minus size={16} />
            </button>
            <div className="w-12 h-10 border-t border-b flex items-center justify-center">
              {quantity}
            </div>
            <button 
              className="w-10 h-10 border rounded-r flex items-center justify-center cursor-pointer"
              onClick={incrementQuantity}
            >
              <Plus size={16} />
            </button>
          </div>
          <div className='pt-3 md:px-5 md:py-0'>
            <p>
              {product.quantity} sản phẩm có sẵn
            </p>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="grid  grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <button className="bg-red-500 text-white hover:bg-red-600 py-3 px-4 rounded-bl-2xl rounded-tr-2xl flex items-center justify-center cursor-pointer"
            onClick={()=>handleOnclickAddCart()}
          >
            Thêm Vào Giỏ Hàng - {toLocalePrice(product.price)}
          </button>
          <button className="bg-gray-800 text-white hover:bg-black py-3 px-4 rounded-bl-2xl rounded-tr-2xl cursor-pointer">
            Mua Ngay
          </button>
        </div>

        {/* Extra Actions */}
        <div className="flex items-center justify-between py-4 border-t">
          <div className="flex items-center gap-2">
            <Truck size={20} />
            <span>Vận chuyển & Trả hàng</span>
          </div>
          <div className="flex items-center gap-2">
          <HelpCircle size={20} />
            <span>Câu hỏi</span>
          </div>
          <div className="flex items-center gap-2">
            <Share size={20} />
            <span>Share</span>
          </div>
        </div>
      </div>

    </div>
      <ProductReviews/>
      <ProductShowcase/>
    </div>
  );
}
export default Product;