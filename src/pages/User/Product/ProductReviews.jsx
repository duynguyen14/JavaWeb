import { useState } from 'react';
import { Search, ChevronDown, Check } from 'lucide-react';

export default function ProductReviews({reviews}) {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <div className="bg-white p-6 font-sans">
      {
        reviews&& reviews.length>0 ?(
          <div>

            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-3xl font-bold uppercase mb-2">ĐÁNH GIÁ SẢN PHẨM</h2>
              </div>
              <div className="text-center">
                <div className="flex items-center">
                  <span className="text-7xl font-bold mr-4">5</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map(star => (
                      <span key={star} className="text-4xl text-yellow-400">★</span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mt-2">Dựa trên {reviews.length} đánh giá đến từ khách hàng</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Left sidebar */}
              <div className="md:col-span-1">
                <div className="relative mb-4">
                  <input
                    type="text"
                    placeholder="Tìm kiếm đánh giá"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                </div>

                <div className="mb-6">
                  <h3 className="text-gray-500 mb-2">Phân loại xếp hạng</h3>
                  {[5, 4, 3, 2, 1].map(rating => (
                    <div key={rating} className="flex items-center mb-2">
                      <input type="checkbox" className="mr-2 h-4 w-4" />
                      <label className="flex items-center">
                        <span className="mr-1">{rating}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                          ))}
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
                <div className="p-3 bg-blue-50 rounded-md mb-6 flex items-center">
                  <Check className="text-blue-600 mr-2" size={18} />
                  <p className="text-sm">Các review đều đến từ khách hàng đã thực sự mua hàng của Foxyshop</p>
                </div>

                <div className="mb-6">
                  <h3 className="text-gray-500 mb-2">Lọc phản hồi</h3>
                  <div className="mb-2">
                    <input type="checkbox" className="mr-2 h-4 w-4" />
                    <label>Đã phản hồi</label>
                  </div>
                  <div>
                    <input type="checkbox" className="mr-2 h-4 w-4" />
                    <label>Chỉ có hình ảnh</label>
                  </div>
                </div>
              </div>

              {/* Reviews list */}
              <div className="md:col-span-3">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-gray-600">Hiển thị đánh giá</p>
                  <div className="relative">
                    <button className="flex items-center border border-gray-300 rounded-md px-4 py-2">
                      Sắp xếp
                      <ChevronDown className="ml-2" size={18} />
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  {reviews.map(review => (
                    <div key={review.id} className="border-b border-gray-200 pb-6">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium text-lg">{review.userName}</h3>
                        <span className="text-gray-500">{review.date}</span>
                      </div>
                      <div className="flex mb-2">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-xl ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                        ))}
                      </div>
                      <p>{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
        :(
          <div></div>
        )
      }
    </div>
  );
}