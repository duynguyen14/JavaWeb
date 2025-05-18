import React, { useState } from "react";
import { Plus, Pencil, Trash2, X, ChevronDown, ChevronUp } from "lucide-react";

// Mock data demo
const mockCatalogs = [
  { CatalogId: 1, Name: "Thời trang nam" },
  { CatalogId: 2, Name: "Thời trang nữ" },
];
const mockCategories = [
  { CategoryId: 1, Name: "Áo sơ mi", CatalogId: 1 },
  { CategoryId: 2, Name: "Quần jean", CatalogId: 1 },
  { CategoryId: 3, Name: "Váy", CatalogId: 2 },
  { CategoryId: 4, Name: "Áo khoác", CatalogId: 1 },
  { CategoryId: 5, Name: "Đầm", CatalogId: 2 },
];
// Mock sản phẩm cho demo đếm số lượng sản phẩm thuộc thể loại
const mockProducts = [
  { ProductId: 1, Name: "Áo sơ mi trắng", CategoryId: 1 },
  { ProductId: 2, Name: "Quần jean xanh", CategoryId: 2 },
  { ProductId: 3, Name: "Váy hoa", CategoryId: 3 },
  { ProductId: 4, Name: "Áo khoác kaki", CategoryId: 4 },
  { ProductId: 5, Name: "Đầm dự tiệc", CategoryId: 5 },
  { ProductId: 6, Name: "Áo sơ mi caro", CategoryId: 1 },
];

function CategoryManagement() {
  const [categories, setCategories] = useState(mockCategories);
  const [catalogs, setCatalogs] = useState(mockCatalogs);
  const [products] = useState(mockProducts);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add"); // add | edit
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [form, setForm] = useState({ Name: "", CatalogId: "" });
  const [expandedCatalog, setExpandedCatalog] = useState(null);

  // Lọc danh mục theo tên hoặc thể loại con
  const filteredCatalogs = catalogs.filter(
    (cat) =>
      cat.Name.toLowerCase().includes(search.toLowerCase()) ||
      categories.some(
        (c) =>
          c.CatalogId === cat.CatalogId &&
          c.Name.toLowerCase().includes(search.toLowerCase())
      )
  );

  // Mở modal
  const openModal = (type, category = null, catalogId = null) => {
    setModalType(type);
    setShowModal(true);
    if (type === "edit" && category) {
      setSelectedCategory(category);
      setForm({
        Name: category.Name,
        CatalogId: category.CatalogId,
      });
    } else {
      setSelectedCategory(null);
      setForm({ Name: "", CatalogId: catalogId || "" });
    }
  };

  // Đóng modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedCategory(null);
    setForm({ Name: "", CatalogId: "" });
  };

  // Thêm/sửa thể loại
  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalType === "add") {
      const newCategory = {
        CategoryId: categories.length
          ? Math.max(...categories.map((c) => c.CategoryId)) + 1
          : 1,
        Name: form.Name,
        CatalogId: Number(form.CatalogId),
      };
      setCategories([newCategory, ...categories]);
    } else if (modalType === "edit" && selectedCategory) {
      setCategories(
        categories.map((c) =>
          c.CategoryId === selectedCategory.CategoryId
            ? { ...c, Name: form.Name, CatalogId: Number(form.CatalogId) }
            : c
        )
      );
    }
    closeModal();
  };

  // Xóa thể loại
  const handleDelete = (categoryId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa thể loại này?")) {
      setCategories(categories.filter((c) => c.CategoryId !== categoryId));
    }
  };

  // Xóa danh mục (và các thể loại con)
  const handleDeleteCatalog = (catalogId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa danh mục này và tất cả thể loại con?")) {
      setCatalogs(catalogs.filter((c) => c.CatalogId !== catalogId));
      setCategories(categories.filter((cat) => cat.CatalogId !== catalogId));
    }
  };

  // Đếm số sản phẩm thuộc thể loại
  const getProductCount = (categoryId) =>
    products.filter((p) => p.CategoryId === categoryId).length;

  // Toggle mở rộng catalog
  const toggleExpand = (catalogId) => {
    setExpandedCatalog(expandedCatalog === catalogId ? null : catalogId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 py-8 px-0">
      <div className="max-w-full mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 px-8">
          <h2 className="text-3xl font-bold text-indigo-700">Quản lý danh mục & thể loại</h2>
        </div>
        <div className="flex items-center mb-6 px-8">
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="Tìm kiếm danh mục hoặc thể loại..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-indigo-50"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Pencil size={18} />
            </span>
          </div>
          <button
            className="ml-4 flex items-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2 rounded-xl shadow hover:scale-105 transition-all font-semibold"
            onClick={() => openModal("add")}
          >
            <Plus size={20} className="mr-2" /> Thêm thể loại
          </button>
        </div>
        <div className="bg-white shadow-2xl rounded-2xl mx-0 px-0">
          <div className="divide-y divide-indigo-100">
            {filteredCatalogs.length === 0 && (
              <div className="text-center p-8 text-gray-500">Không tìm thấy danh mục.</div>
            )}
            {filteredCatalogs.map((catalog) => {
              const catList = categories.filter(c => c.CatalogId === catalog.CatalogId);
              return (
                <div key={catalog.CatalogId}>
                  <div
                    className="flex items-center justify-between px-8 py-5 cursor-pointer hover:bg-indigo-50 transition"
                    onClick={() => toggleExpand(catalog.CatalogId)}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-lg text-indigo-700">{catalog.Name}</span>
                      <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded text-xs font-semibold">
                        {catList.length} thể loại
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        className="text-indigo-600 hover:text-indigo-800 p-2 rounded-full hover:bg-indigo-100 transition"
                        title="Sửa danh mục"
                        onClick={e => { e.stopPropagation(); openModal("edit", null, catalog.CatalogId); }}
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-100 transition"
                        title="Xóa danh mục"
                        onClick={e => { e.stopPropagation(); handleDeleteCatalog(catalog.CatalogId); }}
                      >
                        <Trash2 size={18} />
                      </button>
                      <button
                        className="ml-2 text-indigo-600 hover:text-indigo-800 p-2 rounded-full hover:bg-indigo-100 transition"
                        title={expandedCatalog === catalog.CatalogId ? "Thu gọn" : "Mở rộng"}
                      >
                        {expandedCatalog === catalog.CatalogId ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>
                    </div>
                  </div>
                  {expandedCatalog === catalog.CatalogId && (
                    <div className="bg-indigo-50 px-8 py-6 animate-fade-in">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div className="font-semibold text-indigo-700 text-lg mb-2 md:mb-0">
                          Thể loại thuộc danh mục này
                        </div>
                        <button
                          className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                          onClick={() => openModal("add", null, catalog.CatalogId)}
                        >
                          <Plus size={16} className="mr-2" /> Thêm thể loại vào danh mục này
                        </button>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="min-w-full text-base text-left bg-white rounded-xl shadow">
                          <thead>
                            <tr>
                              <th className="p-3 font-semibold">Tên thể loại</th>
                              <th className="p-3 font-semibold">Số sản phẩm</th>
                              <th className="p-3 text-center font-semibold">Hành động</th>
                            </tr>
                          </thead>
                          <tbody>
                            {catList.length === 0 && (
                              <tr>
                                <td colSpan={3} className="text-center p-4 text-gray-500">
                                  Chưa có thể loại nào.
                                </td>
                              </tr>
                            )}
                            {catList.map(cat => (
                              <tr key={cat.CategoryId} className="border-t hover:bg-indigo-100 transition">
                                <td className="p-3 font-semibold">{cat.Name}</td>
                                <td className="p-3">
                                  <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium shadow">
                                    {getProductCount(cat.CategoryId)}
                                  </span>
                                </td>
                                <td className="p-3 flex justify-center space-x-2">
                                  <button
                                    className="text-indigo-600 hover:text-indigo-800 p-2 rounded-full hover:bg-indigo-100 transition"
                                    title="Sửa"
                                    onClick={e => { e.stopPropagation(); openModal("edit", cat, catalog.CatalogId); }}
                                  >
                                    <Pencil size={18} />
                                  </button>
                                  <button
                                    className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-100 transition"
                                    title="Xóa"
                                    onClick={e => { e.stopPropagation(); handleDelete(cat.CategoryId); }}
                                  >
                                    <Trash2 size={18} />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        {/* Modal Thêm/Sửa thể loại */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10 backdrop-blur-[2px] transition-all">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8 relative animate-fade-in">
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
                onClick={closeModal}
                aria-label="Đóng"
              >
                <X size={24} />
              </button>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-indigo-700">
                {modalType === "add" ? <Plus size={22} /> : <Pencil size={20} />}
                {modalType === "add" ? "Thêm thể loại" : "Chỉnh sửa thể loại"}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-base font-medium mb-1 text-indigo-700">Tên thể loại</label>
                  <input
                    type="text"
                    required
                    value={form.Name}
                    onChange={(e) => setForm((f) => ({ ...f, Name: e.target.value }))}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 bg-indigo-50"
                  />
                </div>
                <div>
                  <label className="block text-base font-medium mb-1 text-indigo-700">Thuộc danh mục</label>
                  <select
                    required
                    value={form.CatalogId}
                    onChange={(e) => setForm((f) => ({ ...f, CatalogId: e.target.value }))}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 bg-indigo-50"
                  >
                    <option value="">Chọn danh mục</option>
                    {catalogs.map((c) => (
                      <option key={c.CatalogId} value={c.CatalogId}>
                        {c.Name}
                      </option>
                    ))}
                  </select>
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
    </div>
  );
}

export default CategoryManagement;
