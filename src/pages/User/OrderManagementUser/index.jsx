import React, { useState } from "react";
import { Filter, CheckCircle, Truck, Clock, XCircle, Search } from "lucide-react";

const OrderManagementUser = () => {
  const [statusFilter, setStatusFilter] = useState("Tất cả");
  const [searchTerm, setSearchTerm] = useState("");

  const orders = [
    {
      id: "DH001",
      date: "01/05/2025",
      status: "Chờ xử lý",
      products: "Áo sơ mi, Quần jeans",
      total: 450000,
    },
    {
      id: "DH002",
      date: "02/05/2025",
      status: "Đang giao",
      products: "Giày thể thao",
      total: 800000,
    },
    {
      id: "DH003",
      date: "03/05/2025",
      status: "Đã hoàn thành",
      products: "Mũ lưỡi trai",
      total: 150000,
    },
    {
      id: "DH004",
      date: "04/05/2025",
      status: "Đã huỷ",
      products: "Balo laptop",
      total: 320000,
    },
  ];

  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Chờ xử lý":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "Đang giao":
        return <Truck className="w-4 h-4 text-blue-500" />;
      case "Đã hoàn thành":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "Đã huỷ":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Chờ xử lý":
        return "bg-yellow-100 text-yellow-800";
      case "Đang giao":
        return "bg-blue-100 text-blue-800";
      case "Đã hoàn thành":
        return "bg-green-100 text-green-800";
      case "Đã huỷ":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredOrders = orders
    .filter((order) =>
      statusFilter === "Tất cả" ? true : order.status === statusFilter
    )
    .filter((order) =>
      searchTerm.trim() === ""
        ? true
        : order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.products.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-white rounded-lg ">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">QUẢN LÝ ĐƠN HÀNG</h1>

      <div className="flex flex-col lg:flex-row justify-between gap-4 mb-6">
        {/* Tìm kiếm */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="w-full lg:w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Tìm theo mã đơn hoặc sản phẩm"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        {/* Bộ lọc */}
        <div className="flex items-center">
          <Filter className="w-5 h-5 text-gray-500 mr-2" />
          <label className="mr-2 text-gray-700 font-medium whitespace-nowrap">Trạng thái:</label>
          <select
            value={statusFilter}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Tất cả">Tất cả</option>
            <option value="Chờ xử lý">Chờ xử lý</option>
            <option value="Đang giao">Đang giao</option>
            <option value="Đã hoàn thành">Đã hoàn thành</option>
            <option value="Đã huỷ">Đã huỷ</option>
          </select>
        </div>
      </div>

      {/* Status Pills */}
      <div className="hidden md:flex space-x-2 mb-6 overflow-x-auto pb-2">
        <button
          onClick={() => setStatusFilter("Tất cả")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            statusFilter === "Tất cả"
              ? "bg-gray-800 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Tất cả
        </button>
        <button
          onClick={() => setStatusFilter("Chờ xử lý")}
          className={`px-4 py-2 rounded-full text-sm font-medium flex items-center transition-colors ${
            statusFilter === "Chờ xử lý"
              ? "bg-yellow-500 text-white"
              : "bg-yellow-50 text-yellow-700 hover:bg-yellow-100"
          }`}
        >
          <Clock className="w-4 h-4 mr-1" /> Chờ xử lý
        </button>
        <button
          onClick={() => setStatusFilter("Đang giao")}
          className={`px-4 py-2 rounded-full text-sm font-medium flex items-center transition-colors ${
            statusFilter === "Đang giao"
              ? "bg-blue-500 text-white"
              : "bg-blue-50 text-blue-700 hover:bg-blue-100"
          }`}
        >
          <Truck className="w-4 h-4 mr-1" /> Đang giao
        </button>
        <button
          onClick={() => setStatusFilter("Đã hoàn thành")}
          className={`px-4 py-2 rounded-full text-sm font-medium flex items-center transition-colors ${
            statusFilter === "Đã hoàn thành"
              ? "bg-green-500 text-white"
              : "bg-green-50 text-green-700 hover:bg-green-100"
          }`}
        >
          <CheckCircle className="w-4 h-4 mr-1" /> Đã hoàn thành
        </button>
        <button
          onClick={() => setStatusFilter("Đã huỷ")}
          className={`px-4 py-2 rounded-full text-sm font-medium flex items-center transition-colors ${
            statusFilter === "Đã huỷ"
              ? "bg-red-500 text-white"
              : "bg-red-50 text-red-700 hover:bg-red-100"
          }`}
        >
          <XCircle className="w-4 h-4 mr-1" /> Đã huỷ
        </button>
      </div>

      {/* Bảng đơn hàng - Desktop */}
      <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mã đơn hàng
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ngày đặt
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sản phẩm
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tổng tiền
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center text-gray-500 text-sm">
                  Không tìm thấy đơn hàng nào
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-blue-600">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="ml-1">{order.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate">
                    {order.products}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right font-medium">
                    {order.total.toLocaleString("vi-VN")}₫
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Danh sách đơn hàng - Mobile */}
      <div className="md:hidden space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500">Không tìm thấy đơn hàng nào</p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-medium text-blue-600">{order.id}</span>
                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(order.status)}`}>
                  {getStatusIcon(order.status)}
                  <span className="ml-1">{order.status}</span>
                </div>
              </div>
              <div className="text-sm text-gray-700 mb-1">
                <span className="font-medium">Ngày: </span>
                {order.date}
              </div>
              <div className="text-sm text-gray-700 mb-1">
                <span className="font-medium">Sản phẩm: </span>
                {order.products}
              </div>
              <div className="text-sm text-gray-700 text-right font-medium mt-2">
                <span className="font-medium">Tổng tiền: </span>
                {order.total.toLocaleString("vi-VN")}₫
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderManagementUser;