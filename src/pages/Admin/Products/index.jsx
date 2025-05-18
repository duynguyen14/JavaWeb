import React, { useState } from "react";
import { Plus, Pencil, Trash2, X, Image as ImageIcon, Layers, Filter, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// Mock data for demo
const mockCategories = [
  { CategoryId: 1, Name: "Áo" },
  { CategoryId: 2, Name: "Quần" },
  { CategoryId: 3, Name: "Giày" },
];

const mockSizes = [
  { SizeId: 1, SizeName: "S" },
  { SizeId: 2, SizeName: "M" },
  { SizeId: 3, SizeName: "L" },
  { SizeId: 4, SizeName: "XL" },
];

const mockProducts = [
  {
    ProductId: 1,
    Name: "Áo sơ mi trắng",
    Price: 350000,
    Quantity: 10,
    Description: "Áo sơ mi vải cotton cao cấp",
    CategoryId: 1,
    Images: [
      { ImageId: 1, Image: "https://via.placeholder.com/80x80?text=Áo+1" }
    ],
    Sizes: [1, 2, 3],
    Status: "Còn hàng"
  },
  {
    ProductId: 2,
    Name: "Quần jean xanh",
    Price: 450000,
    Quantity: 0,
    Description: "Quần jean co giãn",
    CategoryId: 2,
    Images: [
      { ImageId: 2, Image: "https://via.placeholder.com/80x80?text=Quần+1" }
    ],
    Sizes: [2, 3, 4],
    Status: "Hết hàng"
  },
];

function formatPrice(price) {
  return price.toLocaleString("vi-VN") + " đ";
}

function ProductManagement() {
  // State
  const [products, setProducts] = useState(mockProducts);
  const [categories] = useState(mockCategories);
  const [sizes] = useState(mockSizes);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({
    category: "",
    status: "",
    priceMin: "",
    priceMax: "",
  });
  const [showFilter, setShowFilter] = useState(false);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add"); // add | edit
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Product form state
  const [form, setForm] = useState({
    Name: "",
    Price: "",
    Quantity: "",
    Description: "",
    CategoryId: "",
    Images: [],
    Sizes: [],
    Status: "Còn hàng"
  });

  // Image management
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  // Size management
  const handleSizeToggle = (sizeId) => {
    setForm((prev) => ({
      ...prev,
      Sizes: prev.Sizes.includes(sizeId)
        ? prev.Sizes.filter((id) => id !== sizeId)
        : [...prev.Sizes, sizeId],
    }));
  };

  // Filtered products
  const filteredProducts = products.filter((p) => {
    const matchName = p.Name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = filter.category ? p.CategoryId === Number(filter.category) : true;
    const matchStatus = filter.status ? p.Status === filter.status : true;
    const matchPriceMin = filter.priceMin ? p.Price >= Number(filter.priceMin) : true;
    const matchPriceMax = filter.priceMax ? p.Price <= Number(filter.priceMax) : true;
    return matchName && matchCategory && matchStatus && matchPriceMin && matchPriceMax;
  });

  // Open modal for add/edit
  const openModal = (type, product = null) => {
    setModalType(type);
    setShowModal(true);
    if (type === "edit" && product) {
      setSelectedProduct(product);
      setForm({
        Name: product.Name,
        Price: product.Price,
        Quantity: product.Quantity,
        Description: product.Description,
        CategoryId: product.CategoryId,
        Images: product.Images || [],
        Sizes: product.Sizes || [],
        Status: product.Status || "Còn hàng"
      });
      setImagePreviews(product.Images.map(img => img.Image));
      setImageFiles([]);
    } else {
      setSelectedProduct(null);
      setForm({
        Name: "",
        Price: "",
        Quantity: "",
        Description: "",
        CategoryId: "",
        Images: [],
        Sizes: [],
        Status: "Còn hàng"
      });
      setImageFiles([]);
      setImagePreviews([]);
    }
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
    setForm({
      Name: "",
      Price: "",
      Quantity: "",
      Description: "",
      CategoryId: "",
      Images: [],
      Sizes: [],
      Status: "Còn hàng"
    });
    setImageFiles([]);
    setImagePreviews([]);
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
    setImagePreviews(files.map(file => URL.createObjectURL(file)));
  };

  // Remove image preview
  const handleRemoveImage = (idx) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== idx));
    setImagePreviews((prev) => prev.filter((_, i) => i !== idx));
  };

  // Add or update product
  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      ProductId: modalType === "add"
        ? (products.length ? Math.max(...products.map(p => p.ProductId)) + 1 : 1)
        : selectedProduct.ProductId,
      Name: form.Name,
      Price: Number(form.Price),
      Quantity: Number(form.Quantity),
      Description: form.Description,
      CategoryId: Number(form.CategoryId),
      Images: imagePreviews.map((img, idx) => ({
        ImageId: idx + 1,
        Image: img,
      })),
      Sizes: form.Sizes,
      Status: form.Quantity > 0 ? "Còn hàng" : "Hết hàng"
    };
    if(!newProduct.Description || !newProduct.CategoryId || !newProduct.Name || !newProduct.Price || !newProduct.Quantity){
      alert("vui lòng điền đầy đủ thông tin")
      return;
    }
    if (modalType === "add") {
      setProducts([newProduct, ...products]);
      alert("thêm sản phẩm thành công")
    } else {
      setProducts(products.map(p => p.ProductId === selectedProduct.ProductId ? newProduct : p));
      alert("cập nhật thông tin sản phẩm thành công")
    }
    closeModal();
  };

  // Delete product
  const handleDelete = (productId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      setProducts(products.filter(p => p.ProductId !== productId));
    }
  };

  // Popup state
  const [showImagePopup, setShowImagePopup] = useState(false);
  const [popupImages, setPopupImages] = useState([]);
  const [popupIndex, setPopupIndex] = useState(0);

  // Open image popup
  const handleOpenImagePopup = (images, idx = 0) => {
    setPopupImages(images);
    setPopupIndex(idx);
    setShowImagePopup(true);
  };

  // Close image popup
  const handleCloseImagePopup = () => {
    setShowImagePopup(false);
    setPopupImages([]);
    setPopupIndex(0);
  };

  // Next/Prev image in popup
  const handlePrevImage = () => {
    setPopupIndex((prev) => (prev === 0 ? popupImages.length - 1 : prev - 1));
  };
  const handleNextImage = () => {
    setPopupIndex((prev) => (prev === popupImages.length - 1 ? 0 : prev + 1));
  };

  // Slide state for product detail
  const [showDetail, setShowDetail] = useState(false);
  const [detailProduct, setDetailProduct] = useState(null);
  const [detailImageIdx, setDetailImageIdx] = useState(0);
  const [expandedRow, setExpandedRow] = useState(null);

  // Open product detail slide
  const handleOpenDetail = (product) => {
    setDetailProduct(product);
    setDetailImageIdx(0);
    setShowDetail(true);
  };

  // Close product detail slide
  const handleCloseDetail = () => {
    setShowDetail(false);
    setDetailProduct(null);
    setDetailImageIdx(0);
  };

  // Next/Prev image in detail slide
  const handleDetailPrevImage = () => {
    if (!detailProduct?.Images?.length) return;
    setDetailImageIdx((prev) =>
      prev === 0 ? detailProduct.Images.length - 1 : prev - 1
    );
  };
  const handleDetailNextImage = () => {
    if (!detailProduct?.Images?.length) return;
    setDetailImageIdx((prev) =>
      prev === detailProduct.Images.length - 1 ? 0 : prev + 1
    );
  };

  // Render
  return (
    <div>
      <ToastContainer 
        position="top-right"
        autoClose={10000} // tự động đóng sau 3 giây
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold">Quản lý sản phẩm</h2>
        <button
          className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          onClick={() => openModal("add")}
        >
          <Plus size={18} className="mr-2" /> Thêm sản phẩm
        </button>
      </div>

      {/* Filter/Search */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Tìm kiếm theo tên sản phẩm..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-indigo-50"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Filter size={18} />
          </span>
        </div>
        <button
          className="flex items-center gap-1 px-3 py-2 rounded-lg border border-indigo-200 text-indigo-700 hover:bg-indigo-50 transition"
          onClick={() => setShowFilter(v => !v)}
        >
          <Layers size={16} />
          Bộ lọc nâng cao
          {showFilter ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>
      {showFilter && (
        <div className="bg-indigo-50 rounded-lg p-4 mb-4 flex flex-wrap gap-4 items-center">
          <div>
            <label className="block text-xs font-medium mb-1">Danh mục</label>
            <select
              value={filter.category}
              onChange={e => setFilter(f => ({ ...f, category: e.target.value }))}
              className="border rounded px-2 py-1"
            >
              <option value="">Tất cả</option>
              {categories.map(c => (
                <option key={c.CategoryId} value={c.CategoryId}>{c.Name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Trạng thái</label>
            <select
              value={filter.status}
              onChange={e => setFilter(f => ({ ...f, status: e.target.value }))}
              className="border rounded px-2 py-1"
            >
              <option value="">Tất cả</option>
              <option value="Còn hàng">Còn hàng</option>
              <option value="Hết hàng">Hết hàng</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Giá từ</label>
            <input
              type="number"
              value={filter.priceMin}
              onChange={e => setFilter(f => ({ ...f, priceMin: e.target.value }))}
              className="border rounded px-2 py-1 w-24"
              min={0}
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Đến</label>
            <input
              type="number"
              value={filter.priceMax}
              onChange={e => setFilter(f => ({ ...f, priceMax: e.target.value }))}
              className="border rounded px-2 py-1 w-24"
              min={0}
            />
          </div>
        </div>
      )}

      {/* Product Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-indigo-50 text-indigo-700">
            <tr>
              <th className="p-3 font-semibold">Ảnh</th>
              <th className="p-3 font-semibold">Tên sản phẩm</th>
              <th className="p-3 font-semibold">Giá</th>
              <th className="p-3 font-semibold">Số lượng</th>
              <th className="p-3 font-semibold">Danh mục</th>
              <th className="p-3 font-semibold">Trạng thái</th>
              <th className="p-3 font-semibold">Size</th>
              <th className="p-3 text-center font-semibold">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <React.Fragment key={product.ProductId}>
                <tr
                  className={`border-t hover:bg-indigo-50 transition cursor-pointer`}
                  onClick={() => setExpandedRow(expandedRow === product.ProductId ? null : product.ProductId)}
                >
                  <td className="p-3">
                    {product.Images && product.Images.length > 0 ? (
                      <img
                        src={product.Images[0].Image}
                        alt={product.Name}
                        className="w-16 h-16 object-cover rounded shadow"
                        title="Xem chi tiết sản phẩm"
                      />
                    ) : (
                      <span className="text-gray-400"><ImageIcon size={32} /></span>
                    )}
                  </td>
                  <td className="p-3">{product.Name}</td>
                  <td className="p-3">{formatPrice(product.Price)}</td>
                  <td className="p-3">{product.Quantity}</td>
                  <td className="p-3">{categories.find(c => c.CategoryId === product.CategoryId)?.Name || ""}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold
                      ${product.Status === "Còn hàng" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {product.Status}
                    </span>
                  </td>
                  <td className="p-3">
                    {product.Sizes && product.Sizes.length > 0
                      ? product.Sizes.map(sid => mockSizes.find(s => s.SizeId === sid)?.SizeName).join(", ")
                      : <span className="text-gray-400">-</span>
                    }
                  </td>
                  <td className="p-3 flex justify-center space-x-2">
                    <button
                      className="text-indigo-600 hover:text-indigo-800 p-2 rounded-full hover:bg-indigo-100 transition"
                      title="Sửa"
                      onClick={e => { e.stopPropagation(); openModal("edit", product); }}
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-100 transition"
                      title="Xóa"
                      onClick={e => { e.stopPropagation(); handleDelete(product.ProductId); }}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
                {expandedRow === product.ProductId && (
                  <tr>
                    <td colSpan={8} className="bg-indigo-50 p-6 animate-fade-in">
                      <div>
                        <span className="font-medium">Mô tả: </span>
                        <span>{product.Description || <span className="italic text-gray-400">Không có mô tả</span>}</span>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center p-4 text-gray-500">Không tìm thấy sản phẩm.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Thêm/Sửa sản phẩm */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-10 backdrop-blur-[2px] transition-all">
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
              {modalType === "add" ? "Thêm sản phẩm" : "Chỉnh sửa sản phẩm"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Tên sản phẩm</label>
                  <input
                    type="text"
                    // required
                    value={form.Name}
                    onChange={e => setForm(f => ({ ...f, Name: e.target.value }))}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 bg-indigo-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Giá</label>
                  <input
                    type="number"
                    // required
                    min={0}
                    value={form.Price}
                    onChange={e => setForm(f => ({ ...f, Price: e.target.value }))}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 bg-indigo-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Số lượng</label>
                  <input
                    type="number"
                    // required
                    min={0}
                    value={form.Quantity}
                    onChange={e => setForm(f => ({ ...f, Quantity: e.target.value }))}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 bg-indigo-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Danh mục</label>
                  <select
                    // required
                    value={form.CategoryId}
                    onChange={e => setForm(f => ({ ...f, CategoryId: e.target.value }))}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 bg-indigo-50"
                  >
                    <option value="">Chọn danh mục</option>
                    {categories.map(c => (
                      <option key={c.CategoryId} value={c.CategoryId}>{c.Name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Mô tả</label>
                <textarea
                  value={form.Description}
                  onChange={e => setForm(f => ({ ...f, Description: e.target.value }))}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 bg-indigo-50"
                  rows={2}
                />
              </div>
              {/* Image management */}
              <div>
                <label className="block text-sm font-medium mb-1">Ảnh sản phẩm</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="mb-2"
                />
                <div className="flex flex-wrap gap-2">
                  {imagePreviews.map((img, idx) => (
                    <div key={idx} className="relative">
                      <img src={img} alt="preview" className="w-16 h-16 object-cover rounded border" />
                      <button
                        type="button"
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                        onClick={() => handleRemoveImage(idx)}
                        title="Xóa ảnh"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              {/* Size management */}
              <div>
                <label className="block text-sm font-medium mb-1">Size</label>
                <div className="flex flex-wrap gap-2">
                  {sizes.map(size => (
                    <label key={size.SizeId} className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.Sizes.includes(size.SizeId)}
                        onChange={() => handleSizeToggle(size.SizeId)}
                        className="accent-indigo-600"
                      />
                      <span className="text-sm">{size.SizeName}</span>
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

      {showDetail && detailProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-60 transition-all">
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-0 flex flex-col md:flex-row overflow-hidden">
            {/* Ảnh slide */}
            <div className="flex flex-col items-center justify-center bg-indigo-50 p-6 md:w-1/2 min-h-[340px]">
              <div className="flex items-center gap-3">
                <button
                  className="p-2 rounded-full bg-gray-100 hover:bg-indigo-100 text-indigo-600 transition"
                  onClick={handleDetailPrevImage}
                  aria-label="Trước"
                >
                  <ChevronLeft size={28} />
                </button>
                <img
                  src={detailProduct.Images[detailImageIdx]?.Image}
                  alt="Ảnh sản phẩm"
                  className="max-h-[260px] max-w-[220px] rounded-lg shadow border bg-white"
                  style={{ objectFit: "contain" }}
                />
                <button
                  className="p-2 rounded-full bg-gray-100 hover:bg-indigo-100 text-indigo-600 transition"
                  onClick={handleDetailNextImage}
                  aria-label="Sau"
                >
                  <ChevronRight size={28} />
                </button>
              </div>
              <div className="flex gap-2 mt-3">
                {detailProduct.Images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img.Image}
                    alt="thumb"
                    className={`w-10 h-10 object-cover rounded border cursor-pointer ${idx === detailImageIdx ? "ring-2 ring-indigo-500" : ""}`}
                    onClick={() => setDetailImageIdx(idx)}
                  />
                ))}
              </div>
            </div>
            {/* Thông tin sản phẩm */}
            <div className="flex-1 p-6 flex flex-col justify-between">
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
                onClick={handleCloseDetail}
                aria-label="Đóng"
              >
                <X size={24} />
              </button>
              <div>
                <h3 className="text-2xl font-bold text-indigo-700 mb-2">{detailProduct.Name}</h3>
                <div className="mb-2 text-lg font-semibold text-indigo-600">{formatPrice(detailProduct.Price)}</div>
                <div className="mb-2">
                  <span className="font-medium">Danh mục: </span>
                  {categories.find(c => c.CategoryId === detailProduct.CategoryId)?.Name || ""}
                </div>
                <div className="mb-2">
                  <span className="font-medium">Số lượng: </span>
                  {detailProduct.Quantity}
                </div>
                <div className="mb-2">
                  <span className="font-medium">Trạng thái: </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold
                    ${detailProduct.Status === "Còn hàng" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {detailProduct.Status}
                  </span>
                </div>
                <div className="mb-2">
                  <span className="font-medium">Size: </span>
                  {detailProduct.Sizes && detailProduct.Sizes.length > 0
                    ? detailProduct.Sizes.map(sid => sizes.find(s => s.SizeId === sid)?.SizeName).join(", ")
                    : <span className="text-gray-400">-</span>
                  }
                </div>
                <div className="mb-2">
                  <span className="font-medium">Mô tả: </span>
                  <span>{detailProduct.Description}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Popup xem nhiều ảnh */}
      {showImagePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-60 transition-all">
          <div className="relative bg-white rounded-xl shadow-2xl p-4 flex flex-col items-center max-w-lg w-full">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
              onClick={handleCloseImagePopup}
              aria-label="Đóng"
            >
              <X size={24} />
            </button>
            <div className="flex items-center gap-4 mt-6 mb-2">
              <button
                className="p-2 rounded-full bg-gray-100 hover:bg-indigo-100 text-indigo-600 transition"
                onClick={handlePrevImage}
                aria-label="Trước"
              >
                <ChevronLeft size={28} />
              </button>
              <img
                src={popupImages[popupIndex]}
                alt="Ảnh sản phẩm"
                className="max-h-[350px] max-w-[350px] rounded-lg shadow border"
                style={{ objectFit: "contain" }}
              />
              <button
                className="p-2 rounded-full bg-gray-100 hover:bg-indigo-100 text-indigo-600 transition"
                onClick={handleNextImage}
                aria-label="Sau"
              >
                <ChevronRight size={28} />
              </button>
            </div>
            <div className="flex gap-2 mt-2">
              {popupImages.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt="thumb"
                  className={`w-12 h-12 object-cover rounded border cursor-pointer ${idx === popupIndex ? "ring-2 ring-indigo-500" : ""}`}
                  onClick={() => setPopupIndex(idx)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductManagement;
