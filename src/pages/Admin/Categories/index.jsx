import React, { useState } from "react";
import { Plus, Pencil, Trash2, X, ChevronDown, ChevronUp } from "lucide-react";

// Mock data for demo
const mockCatalogs = [
  { CatalogId: 1, Name: "Thời trang nam" },
  { CatalogId: 2, Name: "Thời trang nữ" },
];

const mockCategories = [
  { CategoryId: 1, Name: "Áo", CatalogId: 1 },
  { CategoryId: 2, Name: "Quần", CatalogId: 1 },
  { CategoryId: 3, Name: "Váy", CatalogId: 2 },
  { CategoryId: 4, Name: "Áo khoác", CatalogId: 1 },
  { CategoryId: 5, Name: "Đầm", CatalogId: 2 },
];

function CategoryManagement() {
  const [categories, setCategories] = useState(mockCategories);
  const [catalogs] = useState(mockCatalogs);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add"); // add | edit
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [form, setForm] = useState({ Name: "", CatalogId: "" });
  const [expandedCatalog, setExpandedCatalog] = useState(null);

  // Toggle xem thể loại trong catalog
  const toggleExpand = (catalogId) => {
    setExpandedCatalog(expandedCatalog === catalogId ? null : catalogId);
  };

  // Bỏ tích thể loại khỏi danh mục
  const handleToggleCategory = (categoryId, catalogId) => {
    setCategories((categories) =>
      categories.map((cat) =>
        cat.CategoryId === categoryId
          ? { ...cat, CatalogId: cat.CatalogId === catalogId ? null : catalogId }
          : cat
      )
    );
  };

  // Lọc danh mục
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
  const openModal = (type, category = null) => {
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
      setForm({ Name: "", CatalogId: "" });
    }
  };

  // Đóng modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedCategory(null);
    setForm({ Name: "", CatalogId: "" });
  };

  // Thêm/sửa danh mục
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

  // Xóa danh mục
  const handleDelete = (categoryId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
      setCategories(categories.filter((c) => c.CategoryId !== categoryId));
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold">Quản lý danh mục & thể loại</h2>
        <button
          className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          onClick={() => openModal("add")}
        >
          <Plus size={18} className="mr-2" /> Thêm danh mục
        </button>
      </div>
      <div className="flex items-center mb-4">
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Tìm kiếm danh mục hoặc thể loại..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-indigo-50"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Pencil size={18} />
          </span>
        </div>
      </div>
      <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-indigo-50 text-indigo-700">
            <tr>
              <th className="p-3 font-semibold">Tên danh mục</th>
              <th className="p-3 font-semibold">Số thể loại</th>
              <th className="p-3 text-center font-semibold">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {catalogs.map((catalog) => {
              const categoryList = categories.filter((c) => c.CatalogId === catalog.CatalogId);
              return (
                <React.Fragment key={catalog.CatalogId}>
                  <tr className="border-t hover:bg-indigo-50 transition">
                    <td
                      className="p-3 font-semibold cursor-pointer"
                      onClick={() => toggleExpand(catalog.CatalogId)}
                    >
                      <span className="flex items-center gap-2">
                        {catalog.Name}
                        {expandedCatalog === catalog.CatalogId ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded text-xs font-semibold">
                        {categoryList.length}
                      </span>
                    </td>
                    <td className="p-3 flex justify-center space-x-2">
                      <button
                        className="text-indigo-600 hover:text-indigo-800 p-2 rounded-full hover:bg-indigo-100 transition"
                        title="Sửa"
                        onClick={() => openModal("edit", catalog)}
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-100 transition"
                        title="Xóa"
                        onClick={() => {
                          if (window.confirm("Xóa danh mục này?")) {
                            setCategories(categories =>
                              categories.map(cat =>
                                cat.CatalogId === catalog.CatalogId
                                  ? { ...cat, CatalogId: null }
                                  : cat
                              )
                            );
                            setCatalogs(catalogs.filter(c => c.CatalogId !== catalog.CatalogId));
                          }
                        }}
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                  {expandedCatalog === catalog.CatalogId && (
                    <tr>
                      <td colSpan={3} className="bg-indigo-50 p-4">
                        <div className="font-semibold mb-2 text-indigo-700">Quản lý thể loại thuộc danh mục này:</div>
                        <div className="flex flex-wrap gap-3">
                          {categories.length === 0 && (
                            <span className="text-gray-400 italic">Chưa có thể loại nào.</span>
                          )}
                          {categories.map(cat => (
                            <label
                              key={cat.CategoryId}
                              className="flex items-center gap-2 bg-white px-3 py-1 rounded shadow border"
                            >
                              <input
                                type="checkbox"
                                checked={cat.CatalogId === catalog.CatalogId}
                                onChange={() => handleToggleCategory(cat.CategoryId, catalog.CatalogId)}
                                className="accent-indigo-600"
                              />
                              <span className="text-sm">{cat.Name}</span>
                            </label>
                          ))}
                        </div>
                        <div className="text-xs text-gray-400 mt-2">
                          Bỏ tích để loại bỏ thể loại khỏi danh mục này.
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
            {catalogs.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center p-4 text-gray-500">
                  Không tìm thấy danh mục.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Modal Thêm/Sửa danh mục */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-10 backdrop-blur-[2px] transition-all">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative animate-fade-in">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
              onClick={closeModal}
              aria-label="Đóng"
            >
              <X size={22} />
            </button>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              {modalType === "add" ? <Plus size={22} /> : <Pencil size={20} />}
              {modalType === "add" ? "Thêm danh mục" : "Chỉnh sửa danh mục"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Tên danh mục</label>
                <input
                  type="text"
                  required
                  value={form.Name}
                  onChange={(e) => setForm((f) => ({ ...f, Name: e.target.value }))}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 bg-indigo-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Thuộc catalog</label>
                <select
                  required
                  value={form.CatalogId}
                  onChange={(e) => setForm((f) => ({ ...f, CatalogId: e.target.value }))}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 bg-indigo-50"
                >
                  <option value="">Chọn catalog</option>
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
  );
}

export default CategoryManagement;
