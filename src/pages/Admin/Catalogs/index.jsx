import React, { useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";

// Mock data for demo
const mockCatalogs = [
  { CatalogId: 1, Name: "Thời trang nam" },
  { CatalogId: 2, Name: "Thời trang nữ" },
];

function CatalogManagement() {
  const [catalogs, setCatalogs] = useState(mockCatalogs);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add"); // add | edit
  const [selectedCatalog, setSelectedCatalog] = useState(null);
  const [form, setForm] = useState({ Name: "" });

  // Lọc catalog
  const filteredCatalogs = catalogs.filter((c) =>
    c.Name.toLowerCase().includes(search.toLowerCase())
  );

  // Mở modal
  const openModal = (type, catalog = null) => {
    setModalType(type);
    setShowModal(true);
    if (type === "edit" && catalog) {
      setSelectedCatalog(catalog);
      setForm({ Name: catalog.Name });
    } else {
      setSelectedCatalog(null);
      setForm({ Name: "" });
    }
  };

  // Đóng modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedCatalog(null);
    setForm({ Name: "" });
  };

  // Thêm/sửa catalog
  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalType === "add") {
      const newCatalog = {
        CatalogId: catalogs.length
          ? Math.max(...catalogs.map((c) => c.CatalogId)) + 1
          : 1,
        Name: form.Name,
      };
      setCatalogs([newCatalog, ...catalogs]);
    } else if (modalType === "edit" && selectedCatalog) {
      setCatalogs(
        catalogs.map((c) =>
          c.CatalogId === selectedCatalog.CatalogId
            ? { ...c, Name: form.Name }
            : c
        )
      );
    }
    closeModal();
  };

  // Xóa catalog
  const handleDelete = (catalogId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa catalog này?")) {
      setCatalogs(catalogs.filter((c) => c.CatalogId !== catalogId));
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold">Quản lý catalog</h2>
        <button
          className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          onClick={() => openModal("add")}
        >
          <Plus size={18} className="mr-2" /> Thêm catalog
        </button>
      </div>
      <div className="flex items-center mb-4">
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Tìm kiếm catalog..."
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
              <th className="p-3 font-semibold">Tên catalog</th>
              <th className="p-3 text-center font-semibold">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredCatalogs.map((catalog) => (
              <tr key={catalog.CatalogId} className="border-t hover:bg-indigo-50 transition">
                <td className="p-3">{catalog.Name}</td>
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
                    onClick={() => handleDelete(catalog.CatalogId)}
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {filteredCatalogs.length === 0 && (
              <tr>
                <td colSpan="2" className="text-center p-4 text-gray-500">
                  Không tìm thấy catalog.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Modal Thêm/Sửa catalog */}
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
              {modalType === "add" ? "Thêm catalog" : "Chỉnh sửa catalog"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Tên catalog</label>
                <input
                  type="text"
                  required
                  value={form.Name}
                  onChange={(e) => setForm((f) => ({ ...f, Name: e.target.value }))}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 bg-indigo-50"
                />
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

export default CatalogManagement;
