import React from "react";

function CartSummary({ products }) {
  const total = products.reduce((acc, p) => acc + p.price * p.quantity, 0);

  return (
    <div className=" h-full w-[100%] lg:max-w-[400px] md:w-full p-6 rounded-2xl bg-primary  transition-all duration-300 mx-auto mb-10">
      <h3 className="font-bold text-xl mb-5 text-gray-800">🛒 Tổng tiền giỏ hàng</h3>
      <ul className="text-sm mb-5 space-y-2 text-gray-700">
        <li className="flex justify-between  pb-3">
          <span>Tổng sản phẩm</span>
          <span className="font-medium">{products.length}</span>
        </li>
        <li className="flex justify-between  pb-3">
          <span>Tổng tiền hàng</span>
          <span className="font-medium text-blue-600">
            {total.toLocaleString("vi-VN")}đ
          </span>
        </li>
        <li className="flex justify-between font-semibold text-black  pb-1 ">
          <span>Thành tiền</span>
          <span className="text-base">{total.toLocaleString("vi-VN")}đ</span>
        </li>

      </ul>

      <p className="text-red-600 text-xs mb-4 italic">
        ⚠️ Các sản phẩm giảm giá trên 50% không hỗ trợ đổi trả.
      </p>

      <button className="w-full btn-primary py-3 ">
        ĐẶT HÀNG NGAY
      </button>
    </div>
  );
}

export default CartSummary;
