import React, { useState } from 'react';
import { Heart, Share, Truck, HelpCircle, Eye, Minus, Plus } from 'lucide-react';
import { useParams } from 'react-router-dom';


function Product() {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('L');
  const [selectedColor, setSelectedColor] = useState('gray');
  const id=useParams();
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 flex flex-col md:flex-row gap-8">
      {/* Product Images Section */}
      <div className="flex flex-col md:flex-row gap-4 w-full md:w-1/2">
        <div className="flex flex-row md:flex-col gap-2">
          {/* Thumbnail Images */}
          {[1, 2, 3, 4, 5].map((index) => (
            <div key={index} className="w-16 h-20 border rounded overflow-hidden">
              <img 
                src="https://down-vn.img.susercontent.com/file/vn-11134258-7ra0g-m8nlbq8ghiysda" 
                alt={`Product thumbnail ${index}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        
        {/* Main Product Image */}
        <div className="flex-1">
          <img 
            src="https://down-vn.img.susercontent.com/file/vn-11134258-7ra0g-m8nlbq8ghiysda" 
            alt="Stretch Strap Top main view"
            className="w-full h-full object-cover rounded"
          />
        </div>
      </div>

      {/* Product Details Section */}
      <div className="w-full md:w-1/2">
        <div className="text-sm text-gray-500 uppercase mb-2">Quần Áo</div>
        <h1 className="text-3xl font-bold mb-2">Áo khoác da cho nam</h1>
        
        {/* Ratings */}
        <div className="flex items-center mb-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className="text-yellow-500">★</span>
            ))}
          </div>
          <span className="ml-2 text-sm">(134 đánh giá)</span>
          <span className="ml-4 text-sm">đã bán 18 </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl font-bold">79,000 VND</span>
          <span className="text-gray-500 line-through">$98.99</span>
          <span className="bg-red-500 text-white px-2 py-1 text-xs rounded">-25%</span>
        </div>

        {/* Sustainability Note */}
        <p className="text-sm text-gray-700 mb-4">
          The garments labelled as Committed are products that have been produced using
          sustainable fibres or processes, reducing their environmental impact.
        </p>

        {/* Live Viewers */}
        <div className="flex items-center gap-2 mb-6 text-sm">
          <Eye size={16} />
          <span>28 người đang xem</span>
        </div>

        {/* Colors */}
        <div className="mb-6">
<div className="mb-2">
            Màu sắc: <span className="font-medium">Xám</span>
          </div>
          <div className="flex gap-2">
            <button className={`w-8 h-8 rounded-full bg-pink-200 ${selectedColor === 'pink' ? 'ring-2 ring-black' : ''}`} onClick={() => setSelectedColor('pink')}></button>
            <button className={`w-8 h-8 rounded-full bg-gray-800 ${selectedColor === 'black' ? 'ring-2 ring-black' : ''}`} onClick={() => setSelectedColor('black')}></button>
            <button className={`w-8 h-8 rounded-full bg-gray-400 ${selectedColor === 'gray' ? 'ring-2 ring-black' : ''}`} onClick={() => setSelectedColor('gray')}></button>
          </div>
        </div>

        {/* Size */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <div>Size: <span className="font-medium">{selectedSize}</span></div>
            <button className="text-sm underline">Loại Size</button>
          </div>
          <div className="flex gap-2">
            {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
              <button 
                key={size} 
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  selectedSize === size 
                    ? 'bg-black text-white' 
                    : 'bg-white border text-black'
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div className="mb-6">
          <div className="mb-2">Số Lượng:</div>
          <div className="flex items-center">
            <button 
              className="w-10 h-10 border rounded-l flex items-center justify-center"
              onClick={decrementQuantity}
            >
              <Minus size={16} />
            </button>
            <div className="w-12 h-10 border-t border-b flex items-center justify-center">
              {quantity}
            </div>
            <button 
              className="w-10 h-10 border rounded-r flex items-center justify-center"
              onClick={incrementQuantity}
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 gap-4 mb-4">
          <button className="bg-black text-white py-3 px-4 rounded flex items-center justify-center">
            Thêm Vào Giỏ Hàng - 79,000 VND
          </button>
          <button className="bg-red-500 text-white py-3 px-4 rounded">
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
  );
}
export default Product;