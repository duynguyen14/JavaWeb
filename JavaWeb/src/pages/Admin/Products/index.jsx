import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search, Pencil, Trash2, Plus, X } from "lucide-react";
import { Description } from "@headlessui/react";

function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [newProductImages, setNewProductImages] = useState([]);
  const [editProductImages, setEditProductImages] = useState([]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    images: [],
    categoryName: "",
    description: "",
  });

  const [editingProduct, setEditingProduct] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/products");
      if (res.data.code === 1000) {
        setProducts(res.data.result);
      }
    } catch (error) {
      console.error("Lỗi khi tải sản phẩm:", error);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/v1/products/${id}`);
      setProducts(products.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
  };

  const handleAddProduct = async () => {
    try {
      await axios.post("http://localhost:8080/api/v1/products", newProduct);
      setShowAddForm(false);
      setNewProduct({
        name: "",
        price: "",
        quantity: "",
        images: [],
        description: "",
        categoryName: "",
      });
      fetchProducts();
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
    }
  };

  const handleUpdateProduct = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/v1/products/${editingProduct.id}`,
        editingProduct
      );
      setShowEditForm(false);
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm:", error);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const getPageNumbers = () => {
    const totalNumbers = 5;
    const half = Math.floor(totalNumbers / 2);
    let start = Math.max(currentPage - half, 1);
    let end = start + totalNumbers - 1;
    if (end > totalPages) {
      end = totalPages;
      start = Math.max(end - totalNumbers + 1, 1);
    }
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6 overflow-x-hidden">
      <header className="mb-4 md:mb-6 flex flex-col md:flex-row items-start md:items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Quản lý sản phẩm
        </h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="mt-2 md:mt-0 flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md"
        >
          <Plus size={18} /> Thêm sản phẩm
        </button>
      </header>

      <div className="mb-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-orange-200 focus:outline-none"
          />
        </div>
      </div>

      {/* Bảng sản phẩm */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm text-gray-700">ID</th>
              <th className="px-4 py-2 text-left text-sm text-gray-700">
                Tên sản phẩm
              </th>
              <th className="px-4 py-2 text-left text-sm text-gray-700">Giá</th>
              <th className="px-4 py-2 text-left text-sm text-gray-700">
                Số lượng
              </th>
              <th className="px-4 py-2 text-left text-sm text-gray-700">
                Thể loại{" "}
              </th>
              <th className="px-4 py-2 text-left text-sm text-gray-700">
                Mô tả
              </th>
              <th className="px-4 py-2 text-left text-sm text-gray-700">
                Ảnh{" "}
              </th>
              <th className="px-4 py-2 text-left text-sm text-gray-700">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedProducts.map((product) => (
              <tr key={product.id}>
                <td className="px-4 py-2 text-sm text-gray-800">
                  {product.id}
                </td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  {product.name}
                </td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  {product.price.toLocaleString()}đ
                </td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  {product.quantity}
                </td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  {product.categoryName}
                </td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  {product.description}
                </td>
                <td className="px-4 py-2">
                  <div className="flex space-x-1">
                    {product.images?.slice(0, 3).map((img, idx) => (
                      <img
                        key={idx}
                        src={`http://localhost:8080/images/${img}.png`}
                        alt="img"
                        className="w-10 h-10 object-cover rounded"
                      />
                    ))}
                  </div>
                </td>
                <td className="px-4 py-2 text-sm text-center">
                  <button
                    className="mr-2 text-blue-500 hover:text-blue-600"
                    onClick={() => {
                      setEditingProduct(product);
                      setShowEditForm(true);
                    }}
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {paginatedProducts.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-4 text-sm text-gray-500"
                >
                  Không tìm thấy sản phẩm.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Phân trang */}
      <div className="mt-4 flex justify-center space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded-md text-sm disabled:opacity-50"
        >
          Trang trước
        </button>
        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-1 border rounded-md text-sm ${
              currentPage === page
                ? "bg-orange-500 text-white"
                : "hover:bg-orange-100"
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded-md text-sm disabled:opacity-50"
        >
          Trang sau
        </button>
      </div>

      {/* Form thêm sản phẩm */}
      {showAddForm && (
        <div className="fixed inset-0 bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-2xl relative">
            {/* Nút đóng */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setShowAddForm(false)}
            >
              <X size={24} />
            </button>

            <h3 className="text-2xl font-bold mb-6 text-center">
              Thêm sản phẩm mới
            </h3>

            <div className="space-y-4">
              {/* Các input sản phẩm */}
              <input
                type="text"
                placeholder="Tên sản phẩm"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                className="w-full border px-4 py-3 rounded-lg"
              />
              <input
                type="number"
                placeholder="Giá"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
                className="w-full border px-4 py-3 rounded-lg"
              />
              <input
                type="text"
                placeholder="Mã thể loại"
                value={newProduct.categoryId}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, categoryId: e.target.value })
                }
                className="w-full border px-4 py-3 rounded-lg"
              />
              <input
                type="number"
                placeholder="Số lượng"
                value={newProduct.quantity}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, quantity: e.target.value })
                }
                className="w-full border px-4 py-3 rounded-lg"
              />
              <textarea
                placeholder="Mô tả sản phẩm"
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, description: e.target.value })
                }
                rows={5}
                className="w-full border px-4 py-3 rounded-lg resize-y"
              />

              {/* Trường tải ảnh */}
              <div>
                <label className="font-semibold block mb-2">
                  Hình ảnh sản phẩm
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    const files = Array.from(e.target.files);
                    const imagePreviews = files.map((file) => ({
                      file,
                      url: URL.createObjectURL(file),
                    }));
                    setNewProductImages((prev) => [...prev, ...imagePreviews]);
                  }}
                  className="block w-full text-sm text-gray-500"
                />
                {/* Hiển thị ảnh đã chọn */}
                <div className="mt-4 flex flex-wrap gap-3">
                  {newProductImages.map((img, index) => (
                    <div
                      key={index}
                      className="relative w-24 h-24 rounded overflow-hidden border"
                    >
                      <img
                        src={img.url}
                        alt={`img-${index}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => {
                          setNewProductImages((prev) =>
                            prev.filter((_, i) => i !== index)
                          );
                        }}
                        className="absolute top-1 right-1 bg-white bg-opacity-70 rounded-full p-1 text-red-500 hover:text-red-700"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Nút thêm */}
            <div className="mt-6 text-right">
              <button
                onClick={handleAddProduct}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg"
              >
                Thêm
              </button>
            </div>
          </div>
        </div>
      )}
 {/* Form sửa sản phẩm */}
      {showEditForm && editingProduct && (
  <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-2xl relative">
      {/* Nút đóng */}
      <button
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        onClick={() => {
          setShowEditForm(false);
          setEditingProduct(null);
          setEditProductImages([]);
        }}
      >
        <X size={24} />
      </button>

      <h3 className="text-2xl font-bold mb-6 text-center">Chỉnh sửa sản phẩm</h3>

      <div className="space-y-4">
        {/* Các input */}
        <input
          type="text"
          placeholder="Tên sản phẩm"
          value={editingProduct.name}
          onChange={(e) =>
            setEditingProduct({ ...editingProduct, name: e.target.value })
          }
          className="w-full border px-4 py-3 rounded-lg text-lg"
        />
        <input
          type="number"
          placeholder="Giá"
          value={editingProduct.price}
          onChange={(e) =>
            setEditingProduct({ ...editingProduct, price: e.target.value })
          }
          className="w-full border px-4 py-3 rounded-lg text-lg"
        />
        <input
          type="number"
          placeholder="Số lượng"
          value={editingProduct.quantity}
          onChange={(e) =>
            setEditingProduct({ ...editingProduct, quantity: e.target.value })
          }
          className="w-full border px-4 py-3 rounded-lg text-lg"
        />
        <textarea
          placeholder="Mô tả sản phẩm"
          value={editingProduct.description}
          onChange={(e) =>
            setEditingProduct({ ...editingProduct, description: e.target.value })
          }
          rows={5}
          className="w-full border px-4 py-3 rounded-lg resize-y text-lg"
        />

        {/* Ảnh hiện tại */}
        <div>
          <label className="font-semibold block mb-2">Hình ảnh hiện tại</label>
          <div className="flex flex-wrap gap-3">
            {editingProduct.images?.map((img, index) => (
              <div key={index} className="relative w-24 h-24 rounded overflow-hidden border">
                <img
                  src={`http://localhost:8080/images/${img}.png`}
                  alt={`product-${index}`}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => {
                    const updatedImages = editingProduct.images.filter((_, i) => i !== index);
                    setEditingProduct({ ...editingProduct, images: updatedImages });
                  }}
                  className="absolute top-1 right-1 bg-white bg-opacity-80 rounded-full p-1 text-red-500 hover:text-red-700"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Thêm ảnh mới */}
        <div>
          <label className="font-semibold block mb-2">Thêm ảnh mới</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => {
              const files = Array.from(e.target.files);
              const previews = files.map(file => ({
                file,
                url: URL.createObjectURL(file),
              }));
              setEditProductImages((prev) => [...prev, ...previews]);
            }}
            className="block w-full text-sm text-gray-500"
          />
          {/* Hiển thị ảnh mới được thêm */}
          <div className="mt-3 flex flex-wrap gap-3">
            {editProductImages.map((img, index) => (
              <div key={index} className="relative w-24 h-24 rounded overflow-hidden border">
                <img
                  src={img.url}
                  alt={`new-img-${index}`}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => {
                    setEditProductImages((prev) => prev.filter((_, i) => i !== index));
                  }}
                  className="absolute top-1 right-1 bg-white bg-opacity-80 rounded-full p-1 text-red-500 hover:text-red-700"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Nút cập nhật */}
      <div className="mt-6 text-right">
        <button
          onClick={handleUpdateProduct}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg"
        >
          Cập nhật
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}

export default ProductManagement;
