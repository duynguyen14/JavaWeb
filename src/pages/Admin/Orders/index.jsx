import React, { useState } from "react";
import { Eye, Printer, ChevronUp, Check, X, Truck, FileText } from "lucide-react";

// Mock data
const mockOrders = [
  {
    BillId: 1001,
    UserName: "Nguyễn Văn A",
    Status: "Đang xử lý",
    Time: "2024-06-01 09:30",
    Products: [
      { Name: "Áo sơ mi trắng", Quantity: 2, Price: 350000 },
      { Name: "Quần jean xanh", Quantity: 1, Price: 450000 },
    ],
    Address: "Hà Nội",
    Total: 1150000,
  },
  {
    BillId: 1002,
    UserName: "Trần Thị B",
    Status: "Giao hàng",
    Time: "2024-06-02 14:10",
    Products: [
      { Name: "Váy hoa", Quantity: 1, Price: 500000 },
    ],
    Address: "Hồ Chí Minh",
    Total: 500000,
  },
];

const statusSteps = ["Đang xử lý", "Giao hàng", "Hoàn tất", "Đã hủy"];

function formatPrice(price) {
  return price.toLocaleString("vi-VN") + " đ";
}

function OrderManagement() {
  const [orders, setOrders] = useState(mockOrders);
  const [expanded, setExpanded] = useState(null);
  const [message, setMessage] = useState("");

  // Cập nhật trạng thái đơn hàng
  const handleNextStatus = (order) => {
    const idx = statusSteps.indexOf(order.Status);
    if (idx < statusSteps.length - 2) { // Không chuyển tiếp nếu đã Hoàn tất hoặc Đã hủy
      const newStatus = statusSteps[idx + 1];
      setOrders(orders.map(o =>
        o.BillId === order.BillId ? { ...o, Status: newStatus } : o
      ));
      setMessage(`Đã cập nhật trạng thái đơn #${order.BillId} sang "${newStatus}"`);
      // TODO: Gửi thông báo cho khách hàng ở đây
    }
  };

  // In hóa đơn (demo)
  const handlePrint = (order) => {
    window.print();
    setMessage(`Đã gửi lệnh in hóa đơn cho đơn #${order.BillId}`);
  };

  // Xem chi tiết đơn hàng
  const toggleExpand = (billId) => {
    setExpanded(expanded === billId ? null : billId);
  };

  // Hủy đơn hàng
  const handleCancelOrder = (order) => {
    if (window.confirm(`Bạn có chắc chắn muốn hủy đơn #${order.BillId}?`)) {
      setOrders(orders.map(o =>
        o.BillId === order.BillId ? { ...o, Status: "Đã hủy" } : o
      ));
      setMessage(`Đã hủy đơn hàng #${order.BillId}`);
      // TODO: Gửi thông báo cho khách hàng ở đây
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 py-8 px-2">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h2 className="text-3xl font-bold text-indigo-700 flex items-center gap-2">
            <Truck size={28} className="text-indigo-500" /> Quản lý đơn hàng
          </h2>
        </div>
        {message && (
          <div className="mb-4 px-4 py-2 rounded-lg bg-green-50 text-green-700 border border-green-200 flex items-center justify-between text-base shadow">
            <span>{message}</span>
            <button onClick={() => setMessage("")} className="ml-2 text-green-700 hover:text-green-900">
              <X size={18} />
            </button>
          </div>
        )}
        <div className="overflow-x-auto bg-white shadow-2xl rounded-2xl">
          <table className="min-w-full text-base text-left">
            <thead className="bg-indigo-100 text-indigo-700">
              <tr>
                <th className="p-4 font-semibold">Mã đơn</th>
                <th className="p-4 font-semibold">Khách hàng</th>
                <th className="p-4 font-semibold">Trạng thái</th>
                <th className="p-4 font-semibold">Ngày đặt</th>
                <th className="p-4 font-semibold">Tổng tiền</th>
                <th className="p-4 text-center font-semibold">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <React.Fragment key={order.BillId}>
                  <tr className="border-t hover:bg-indigo-50 transition">
                    <td className="p-4 font-semibold text-indigo-700">#{order.BillId}</td>
                    <td className="p-4">{order.UserName}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold shadow
                        ${order.Status === "Hoàn tất"
                          ? "bg-green-100 text-green-700"
                          : order.Status === "Giao hàng"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.Status === "Đã hủy"
                          ? "bg-red-100 text-red-700"
                          : "bg-blue-100 text-blue-700"
                        }`}>
                        {order.Status}
                      </span>
                    </td>
                    <td className="p-4">{order.Time}</td>
                    <td className="p-4 font-semibold">{formatPrice(order.Total)}</td>
                    <td className="p-4 flex justify-center space-x-2">
                      <button
                        className="text-indigo-600 hover:text-indigo-800 p-2 rounded-full hover:bg-indigo-100 transition"
                        title="Xem chi tiết"
                        onClick={() => toggleExpand(order.BillId)}
                      >
                        {expanded === order.BillId ? <ChevronUp size={20} /> : <Eye size={20} />}
                      </button>
                      <button
                        className="text-green-600 hover:text-green-800 p-2 rounded-full hover:bg-green-100 transition"
                        title="In hóa đơn"
                        onClick={() => handlePrint(order)}
                      >
                        <FileText size={20} />
                      </button>
                      {order.Status !== "Hoàn tất" && order.Status !== "Đã hủy" && (
                        <>
                          <button
                            className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-100 transition"
                            title="Cập nhật trạng thái"
                            onClick={() => handleNextStatus(order)}
                          >
                            <Check size={20} />
                          </button>
                          <button
                            className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-100 transition"
                            title="Hủy đơn hàng"
                            onClick={() => handleCancelOrder(order)}
                          >
                            <X size={20} />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                  {/* Chi tiết đơn hàng */}
                  {expanded === order.BillId && (
                    <tr>
                      <td colSpan={6} className="bg-indigo-50 p-6">
                        <div className="mb-2 font-semibold text-indigo-700 text-lg">Sản phẩm trong đơn</div>
                        <table className="min-w-full text-sm mb-2 bg-white rounded-xl shadow">
                          <thead>
                            <tr>
                              <th className="p-2">Tên sản phẩm</th>
                              <th className="p-2">Số lượng</th>
                              <th className="p-2">Đơn giá</th>
                              <th className="p-2">Thành tiền</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.Products.map((prod, idx) => (
                              <tr key={idx}>
                                <td className="p-2">{prod.Name}</td>
                                <td className="p-2">{prod.Quantity}</td>
                                <td className="p-2">{formatPrice(prod.Price)}</td>
                                <td className="p-2">{formatPrice(prod.Price * prod.Quantity)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div className="flex flex-col md:flex-row gap-4 mt-4">
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">Địa chỉ giao hàng:</span> {order.Address}
                          </div>
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">Tổng tiền:</span> {formatPrice(order.Total)}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center p-6 text-gray-500">Không có đơn hàng nào.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default OrderManagement;
