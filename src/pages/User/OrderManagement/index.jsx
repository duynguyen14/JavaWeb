import React, { useState } from "react";

const OrderManagement = () => {
  const [statusFilter, setStatusFilter] = useState("Tất cả");

  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value);
    // Gọi API hoặc lọc dữ liệu tại đây nếu cần
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-0">QUẢN LÝ ĐƠN HÀNG</h1>

      <div className="flex justify-end mb-7 ">
        <label className="mr-2 text-lg font-medium ">Trạng thái đơn hàng:</label>
        <select
          value={statusFilter}
          onChange={handleFilterChange}
          className="border rounded px-3 py-1"
        >
          <option value="Tất cả">Tất cả</option>
          <option value="Chờ xử lý">Chờ xử lý</option>
          <option value="Đang giao">Đang giao</option>
          <option value="Đã hoàn thành">Đã hoàn thành</option>
          <option value="Đã huỷ">Đã huỷ</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-270 border-t">
          <thead>
            <tr className="text-left text-gray-700 uppercase text-sm border-b">
              <th className="px-4 py-2 font-semibold">Mã đơn hàng</th>
              <th className="px-4 py-2 font-semibold">Ngày</th>
              <th className="px-4 py-2 font-semibold">Trạng thái</th>
              <th className="px-4 py-2 font-semibold">Sản phẩm</th>
              <th className="px-4 py-2 font-semibold text-right">Tổng tiền</th>
            </tr>
          </thead>
          <tbody>
            {/* Nếu không có đơn hàng, hiển thị trống */}
            <tr>
              <td colSpan="5" className="text-center py-8 text-gray-400">
                Không có đơn hàng.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default OrderManagement;