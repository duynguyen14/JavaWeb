import { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export default function ProductShowcase() {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  
  const sections = [
    {
      title: "CÁC SẢN PHẨM KHÁC CỦA SHOP",
      viewAll: "Xem Tất Cả",
      products: [
        {
          image: "/api/placeholder/200/250",
          brand: "Lovito",
          discount: "-21%",
          name: "Váy xếp nếp xếp tầng",
          tags: ["XỬ LÝ BỞI SHOPEE"],
          price: "197.640",
          originalPrice: "",
          rating: "4.8",
          sold: "Đã bán 8k+",
          dealTag: "10% Giảm"
        },
        {
          image: "/api/placeholder/200/250",
          brand: "Lovito",
          discount: "-35%",
          name: "váy midi LOVITO ren nữ",
          tags: ["XỬ LÝ BỞI SHOPEE", "Chân"],
          price: "260.280",
          originalPrice: "",
          rating: "4.9",
          sold: "Đã bán 2k+",
          dealTag: "Giảm ₫100k"
        },
        {
          image: "/api/placeholder/200/250",
          brand: "Lovito",
          discount: "-39%",
          name: "Áo sơ nữ kiểu mi kẻ sọc",
          tags: ["XỬ LÝ BỞI SHOPEE"],
          price: "78.840",
          originalPrice: "",
          rating: "",
          sold: "Đã bán 26k+",
          dealTag: "10% Giảm",
          voucherTag: "Rẻ Vô Địch"
        },
        {
          image: "/api/placeholder/200/250",
          brand: "Lovito",
          discount: "-22%",
          name: "váy Lovito cơ bản nữ",
          tags: ["XỬ LÝ BỞI SHOPEE", "Chân"],
          price: "185.760",
          originalPrice: "",
          rating: "",
          sold: "Đã bán 1k+",
          dealTag: "10% Giảm",
          voucherTag: "Rẻ Vô Địch"
        },
        {
          image: "/api/placeholder/200/250",
          brand: "Lovito",
          discount: "-11%",
          name: "Thắt lưng Lovito không lỗ",
          tags: ["XỬ LÝ BỞI SHOPEE", "Thắt"],
          price: "46.200",
          originalPrice: "",
          rating: "4.9",
          sold: "Đã bán 55.3k",
          dealTag: ""
        },
        {
          image: "/api/placeholder/200/250",
          brand: "Lovito",
          discount: "-31%",
          name: "váy Lovito dáng chữ A",
          tags: ["XỬ LÝ BỞI SHOPEE", "Chân"],
          price: "169.560",
          originalPrice: "",
          rating: "",
          sold: "Đã bán 2k+",
          dealTag: "10% Giảm",
          voucherTag: "Rẻ Vô Địch"
        }
      ]
    },
    {
      title: "CÓ THỂ BẠN CŨNG THÍCH",
      viewAll: "",
      products: [
        {
          image: "/api/placeholder/200/250",
          brand: "Gentle",
          discount: "-10%",
          name: "Series Đon Hàng Mới",
          tags: ["Yêu thích"],
          price: "118.775",
          originalPrice: "",
          rating: "4.8",
          sold: "",
          dealTag: "",
voucherTag: "Rẻ Vô Địch"
        },
        {
          image: "/api/placeholder/200/250",
          brand: "",
          discount: "-24%",
          name: "Chân váy nhún hack eo chất đũi",
          tags: ["Yêu thích"],
          price: "288.000",
          originalPrice: "",
          rating: "4.9",
          sold: "",
          dealTag: "",
          voucherTag: "Rẻ Vô Địch"
        },
        {
          image: "/api/placeholder/200/250",
          brand: "",
          discount: "-9%",
          name: "Áo Didi Top ( chất vải linen)",
          tags: [],
          price: "269.000",
          originalPrice: "",
          rating: "5.0",
          sold: "",
          dealTag: ""
        },
        {
          image: "/api/placeholder/200/250",
          brand: "",
          discount: "-23%",
          name: "Chân váy midi chữ A 2 lớp",
          tags: ["Yêu thích+"],
          price: "248.000",
          originalPrice: "",
          rating: "",
          sold: "",
          dealTag: "10% Giảm",
          voucherTag: "Rẻ Vô Địch"
        },
        {
          image: "/api/placeholder/200/250",
          brand: "",
          discount: "-32%",
          name: "Chân Váy Nữ Chân Váy Dáng Dài Kẻ Caro",
          tags: [],
          price: "136.000",
          originalPrice: "",
          rating: "",
          sold: "",
          dealTag: "Giảm ₫10k",
          voucherTag: "Rẻ Vô Địch"
        },
        {
          image: "/api/placeholder/200/250",
          brand: "",
          discount: "",
          name: "DOB - Áo kiểu sơ mi xếp đắp li Hani",
          tags: [],
          price: "340.000",
          originalPrice: "",
          rating: "5.0",
          sold: "",
          dealTag: ""
        }
      ]
    }
  ];

  const currentSection = sections[currentSectionIndex];

  const nextSection = () => {
    setCurrentSectionIndex((prevIndex) => (prevIndex + 1) % sections.length);
  };

  const prevSection = () => {
    setCurrentSectionIndex((prevIndex) => (prevIndex - 1 + sections.length) % sections.length);
  };

  return (
    <div className=" p-4 font-sans">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-600">{currentSection.title}</h2>
          {currentSection.viewAll && (
            <a href="#" className="text-red-600 flex items-center text-sm">
              {currentSection.viewAll} <ChevronRight className="w-4 h-4" />
            </a>
          )}
        </div>
        <div className="relative">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {currentSection.products.map((product, index) => (
              <div key={index} className="border border-gray-200 rounded bg-white overflow-hidden">
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  {product.discount && (
                    <div className="absolute top-0 left-0 bg-red-500 text-white text-xs px-2 py-1">
                      {product.discount}
                    </div>
                  )}
                  <div className="absolute top-0 left-0 w-full">
                    <div className="bg-white/80 text-xs px-1 py-0.5 m-1 inline-block rounded">
                      {product.brand}
                    </div>
                  </div>
                </div>
                
                <div className="p-2">
                  <div className="flex flex-wrap gap-1 mb-1">
                    {product.tags && product.tags.map((tag, idx) => (
                      <span 
                        key={idx}
                        className={`text-xs px-1 py-0.5 rounded ${
                          tag.includes("XỬ LÝ") ? "bg-red-500 text-white" : 
                          tag.includes("Yêu thích") ? "bg-red-500 text-white" : 
                          "bg-gray-200"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="text-xs mb-1 line-clamp-2 h-8">{product.name}</h3>
                  
                  <div className="flex flex-wrap gap-1 mb-1">
                    {product.voucherTag && (
                      <span className="text-xs border border-red-500 text-red-500 px-1 py-0.5 rounded">
                        {product.voucherTag}
                      </span>
                    )}
                    {product.dealTag && (
                      <span className="text-xs bg-red-100 text-red-500 px-1 py-0.5 rounded">
                        {product.dealTag}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-1">
                    {product.rating && (
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="text-xs">{product.rating}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-1 flex justify-between items-end">
                    <div className="flex items-baseline">
                      <span className="text-sm text-red-500">₫</span>
                      <span className="text-red-500 font-medium">{product.price}</span>
                    </div>
                    {product.sold && (
                      <span className="text-xs text-gray-500">{product.sold}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button 
            onClick={prevSection}
            className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 bg-white/80 rounded-full p-1 shadow"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button 
            onClick={nextSection}
            className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 bg-white/80 rounded-full p-1 shadow"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex justify-center mt-4 gap-2">
          {sections.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSectionIndex(idx)}
              className={`w-2 h-2 rounded-full ${
                currentSectionIndex === idx ? "bg-red-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}