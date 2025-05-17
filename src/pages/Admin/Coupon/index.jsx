import React, { useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";

// Mock data
const mockCategories = [
  { CategoryId: 1, Name: "Áo" },
  { CategoryId: 2, Name: "Quần" },
  { CategoryId: 3, Name: "Giày" },
];
const mockProducts = [
  { ProductId: 1, Name: "Áo sơ mi trắng" },
  { ProductId: 2, Name: "Quần jean xanh" },
  { ProductId: 3, Name: "Giày thể thao" },
];
const mockCoupons = [
  {
    CouponId: 1,
    Code: "SUMMER20",
    Type: "Phần trăm",
    Value: 20,
    UsageLimit: 100,
    Used: 10,
    Expiry: "2024-07-31",
    Categories: [1, 2],
    Products: [],
  },
  {
    CouponId: 2,
    Code: "GIAY50K",
    Type: "Tiền mặt",
    Value: 50000,
    UsageLimit: 50,
    Used: 5,
    Expiry: "2024-08-15",
    Categories: [],
    Products: [3],
  },
];

function CouponManagement() {
  const [coupons, setCoupons] = useState(mockCoupons);
  const [categories] = useState(mockCategories);
  const [products] = useState(mockProducts);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add"); // add | edit
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [form, setForm] = useState({
    Code: "",
    Type: "Phần trăm",
    Value: "",
    UsageLimit: "",
    Expiry: "",
    Categories: [],
    Products: [],
  });

  // Lọc mã giảm giá
  const filteredCoupons = coupons.filter(
    (c) =>
      c.Code.toLowerCase().includes(search.toLowerCase()) ||
      (c.Type === "Phần trăm"
        ? `${c.Value}%`
        : c.Value.toLocaleString("vi-VN") + " đ"
      ).includes(search)
  );

  // Mở modal
  const openModal = (type, coupon = null) => {
    setModalType(type);
    setShowModal(true);
    if (type === "edit" && coupon) {
      setSelectedCoupon(coupon);
      setForm({
        Code: coupon.Code,
        Type: coupon.Type,
        Value: coupon.Value,
        UsageLimit: coupon.UsageLimit,
        Expiry: coupon.Expiry,
        Categories: coupon.Categories || [],
        Products: coupon.Products || [],
      });
    } else {
      setSelectedCoupon(null);
      setForm({
        Code: "",
        Type: "Phần trăm",
        Value: "",
        UsageLimit: "",
        Expiry: "",
        Categories: [],
        Products: [],
      });
    }
  };

  // Đóng modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedCoupon(null);
    setForm({
      Code: "",
      Type: "Phần trăm",
      Value: "",
      UsageLimit: "",
      Expiry: "",
      Categories: [],
      Products: [],
    });
  };

  // Thêm/sửa mã giảm giá
  const handleSubmit = (e) => {
    e.preventDefault();
    const newCoupon = {
      CouponId:
        modalType === "add"
          ? coupons.length
            ? Math.max(...coupons.map((c) => c.CouponId)) + 1
            : 1
          : selectedCoupon.CouponId,
      Code: form.Code,
      Type: form.Type,
      Value: Number(form.Value),
      UsageLimit: Number(form.UsageLimit),
      Used: modalType === "add" ? 0 : selectedCoupon.Used,
      Expiry: form.Expiry,
      Categories: form.Categories,
      Products: form.Products,
    };
    if (modalType === "add") {
      setCoupons([newCoupon, ...coupons]);
    } else {
      setCoupons(
        coupons.map((c) =>
          c.CouponId === selectedCoupon.CouponId ? newCoupon : c
        )
      );
    }
    closeModal();
  };

  // Xóa mã giảm giá
  const handleDelete = (couponId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa mã này?")) {
      setCoupons(coupons.filter((c) => c.CouponId !== couponId));
    }
  };

  // Toggle chọn category/product
  const handleToggle = (type, id) => {
    setForm((prev) => ({
      ...prev,
      [type]: prev[type].includes(id)
        ? prev[type].filter((x) => x !== id)
        : [...prev[type], id],
    }));
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold">Quản lý mã giảm giá</h2>
        <button
          className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          onClick={() => openModal("add")}
        >
          <Plus size={18} className="mr-2" /> Thêm mã mới
        </button>
      </div>
      <div className="flex items-center mb-4">
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Tìm kiếm mã giảm giá..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-indigo-50"
          />
        </div>
      </div>
      <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-indigo-50 text-indigo-700">
            <tr>
              <th className="p-3 font-semibold">Tên mã</th>
              <th className="p-3 font-semibold">Loại</th>
              <th className="p-3 font-semibold">Giá trị</th>
              <th className="p-3 font-semibold">Số lượt dùng</th>
              <th className="p-3 font-semibold">Ngày hết hạn</th>
              <th className="p-3 font-semibold">Áp dụng</th>
              <th className="p-3 text-center font-semibold">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredCoupons.map((coupon) => (
              <tr key={coupon.CouponId} className="border-t hover:bg-indigo-50 transition">
                <td className="p-3">{coupon.Code}</td>
                <td className="p-3">{coupon.Type}</td>
                <td className="p-3">
                  {coupon.Type === "Phần trăm"
                    ? `${coupon.Value}%`
                    : coupon.Value.toLocaleString("vi-VN") + " đ"}
                </td>
                <td className="p-3">
                  {coupon.Used}/{coupon.UsageLimit}
                </td>
                <td className="p-3">{coupon.Expiry}</td>
                <td className="p-3">
                  {coupon.Categories.length > 0 && (
                    <span>
                      Danh mục:{" "}
                      {coupon.Categories.map(
                        (id) => categories.find((c) => c.CategoryId === id)?.Name
                      ).join(", ")}
                    </span>
                  )}
                  {coupon.Products.length > 0 && (
                    <span>
                      {coupon.Categories.length > 0 && <br />}
                      Sản phẩm:{" "}
                      {coupon.Products.map(
                        (id) => products.find((p) => p.ProductId === id)?.Name
                      ).join(", ")}
                    </span>
                  )}
                  {coupon.Categories.length === 0 && coupon.Products.length === 0 && (
                    <span className="text-gray-400">Tất cả</span>
                  )}
                </td>
                <td className="p-3 flex justify-center space-x-2">
                  <button
                    className="text-indigo-600 hover:text-indigo-800 p-2 rounded-full hover:bg-indigo-100 transition"
                    title="Sửa"
                    onClick={() => openModal("edit", coupon)}
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-100 transition"
                    title="Xóa"
                    onClick={() => handleDelete(coupon.CouponId)}
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {filteredCoupons.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center p-4 text-gray-500">
                  Không tìm thấy mã giảm giá.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Modal Thêm/Sửa mã giảm giá */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10 backdrop-blur-[2px] transition-all">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-6 relative animate-fade-in">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
              onClick={closeModal}
              aria-label="Đóng"
            >
              <X size={22} />
            </button>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              {modalType === "add" ? <Plus size={22} /> : <Pencil size={20} />}
              {modalType === "add" ? "Thêm mã giảm giá" : "Chỉnh sửa mã giảm giá"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Tên mã</label>
                  <input
                    type="text"
                    required
                    value={form.Code}
                    onChange={e => setForm(f => ({ ...f, Code: e.target.value }))}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 bg-indigo-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Loại</label>
                  <select
                    value={form.Type}
                    onChange={e => setForm(f => ({ ...f, Type: e.target.value }))}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 bg-indigo-50"
                  >
                    <option value="Phần trăm">Phần trăm (%)</option>
                    <option value="Tiền mặt">Tiền mặt (VNĐ)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Giá trị</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={form.Value}
                    onChange={e => setForm(f => ({ ...f, Value: e.target.value }))}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 bg-indigo-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Số lượt sử dụng</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={form.UsageLimit}
                    onChange={e => setForm(f => ({ ...f, UsageLimit: e.target.value }))}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 bg-indigo-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Ngày hết hạn</label>
                  <input
                    type="date"
                    required
                    value={form.Expiry}
                    onChange={e => setForm(f => ({ ...f, Expiry: e.target.value }))}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 bg-indigo-50"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Áp dụng cho danh mục</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <label key={cat.CategoryId} className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.Categories.includes(cat.CategoryId)}
                        onChange={() => handleToggle("Categories", cat.CategoryId)}
                        className="accent-indigo-600"
                      />
                      <span className="text-sm">{cat.Name}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Áp dụng cho sản phẩm</label>
                <div className="flex flex-wrap gap-2">
                  {products.map(prod => (
                    <label key={prod.ProductId} className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.Products.includes(prod.ProductId)}
                        onChange={() => handleToggle("Products", prod.ProductId)}
                        className="accent-indigo-600"
                      />
                      <span className="text-sm">{prod.Name}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                  onClick={closeModal}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition font-semibold"
                >
                  {modalType === "add" ? "Thêm" : "Lưu"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CouponManagement;
