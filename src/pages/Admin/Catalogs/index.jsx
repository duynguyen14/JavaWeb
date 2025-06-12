import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Folder } from "lucide-react";
import { request } from '../../../untils/request';

function CatalogsManagement() {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add"); // add | edit
  const [selectedCatalog, setSelectedCatalog] = useState(null);
  const [form, setForm] = useState({ Name: "" });
  const [catalogs, setCatalogs] = useState([]);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCatalogs = async () => {
      try {
        const res = await request.get("/catalog/getAll", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = res.data;
        if (data.code === 1000 && Array.isArray(data.result)) {
          setCatalogs(
            data.result.map((c) => ({
              CatalogId: c.catalogId,
              Name: c.name,
              isDeleted: c.isDeleted,
              categories: c.categories.map((cat) => ({
                CategoryId: cat.categoryId,
                Name: cat.name,
                CatalogId: cat.catalogId,
              })),
            }))
          );
        }
      } catch (err) {
        // Handle error (optional)
      }
    };
    fetchCatalogs();
  }, []);

  // Mở modal Thêm/Sửa danh mục
  const openModal = (type, catalog = null) => {
    setModalType(type);
    setShowModal(true);
    if (type === "edit" && catalog) {
      setSelectedCatalog(catalog);
      setForm({ Name: catalog.Name });
    if (type === "edit" && catalog) {
      setSelectedCatalog(catalog);
      setForm({ Name: catalog.Name });
    } else {
      setSelectedCatalog(null);
      setForm({ Name: "" });
      setSelectedCatalog(null);
      setForm({ Name: "" });
    }
  };

  // Đóng modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedCatalog(null);
    setForm({ Name: "" });
    setSelectedCatalog(null);
    setForm({ Name: "" });
  };

  // Thêm/Sửa danh mục
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (modalType === "add") {
      try {
        const res = await request.post("catalog/create", {
          name: form.Name,
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (res.data && res.data.code === 1000) {
          // Refetch or append new catalog
          const newCatalog = {
            CatalogId: res.data.result.catalogId,
            Name: res.data.result.name,
            isDeleted: res.data.result.isDeleted,
            categories: [],
          };
          setCatalogs([newCatalog, ...catalogs]);
        }
      } catch (err) {
        // Handle error (optional)
      }
    } else if (modalType === "edit" && selectedCatalog) {
      try {
        const res = await request.put(
          `catalog/update/${selectedCatalog.CatalogId}`,
          { name: form.Name },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        if (res.data && res.data.code === 1000) {
          setCatalogs(
            catalogs.map((c) =>
              c.CatalogId === selectedCatalog.CatalogId
                ? { ...c, Name: form.Name }
                : c
            )
          );
        }
      } catch (err) {
        // Handle error (optional)
      }
    }
    closeModal();
  };

  // Xóa mềm danh mục (gọi API)
  const handleDeleteCatalog = (catalogId) => {
    setConfirmDeleteId(catalogId);
  };

  const confirmDelete = async () => {
    try {
      const res = await request.delete(`catalog/delete/${confirmDeleteId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.data && res.data.code === 1000) {
        setCatalogs(
          catalogs.map((c) =>
            c.CatalogId === confirmDeleteId ? { ...c, isDeleted: true } : c
          )
        );
      }
    } catch (err) {
      // Handle error (optional)
    }
    setConfirmDeleteId(null);
  };

  const cancelDelete = () => {
    setConfirmDeleteId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 py-10 px-0">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-10 px-4">
          <h2 className="text-3xl font-extrabold text-indigo-700 tracking-tight">
            Quản lý danh mục
          </h2>
          <button
            className="flex items-center bg-indigo-600 text-white px-5 py-2 rounded-xl shadow-lg hover:scale-105 transition-all font-semibold gap-2"
            onClick={() => openModal("add")}
          >
            <Plus size={20} /> Thêm danh mục
          </button>
        </div>
        {/* Hiển thị danh mục dạng sơ đồ cây ngang */}
        <div className="space-y-6 px-4">
          {catalogs
            .filter((catalog) => !catalog.isDeleted)
            .map((catalog) => {
              const catList = catalog.categories || [];
              return (
                <div
                  key={catalog.CatalogId}
                  className="flex items-center bg-white rounded-xl shadow border border-gray-100 px-6 py-4 hover:shadow-lg transition group"
                >
                  {/* Catalog node */}
                  <div className="flex items-center gap-3 min-w-[220px]">
                    <div className="bg-indigo-100 text-indigo-700 rounded-full p-2">
                      <Folder size={22} />
                    </div>
                    <div>
                      <span className="font-bold text-lg text-gray-900">{catalog.Name}</span>
                      <br />
                      <span className="ml-2 text-xs text-gray-500 font-medium">
                        ({catalog.categoryCount ?? catList.length} thể loại)
                      </span>
                    </div>
                  </div>
                  {/* Tree branch line */}
                  <div className="h-0.5 bg-gray-200 flex-1 mx-3" />
                  {/* Categories as tree leaves */}
                  <ul className="flex flex-row gap-3 items-center flex-wrap">
                    {catList.length === 0 && (
                      <li className="text-gray-400 italic">Chưa có thể loại nào</li>
                    )}
                    {catList.map((cat, idx) => (
                      <li
                        key={cat.CategoryId}
                        className="flex items-center gap-1"
                      >
                        <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                          {cat.Name}
                        </span>
                        {idx < catList.length - 1 && (
                          <span className="w-4 h-0.5 bg-gray-200 inline-block" />
                        )}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col gap-2 ml-6">
                    <button
                      className="text-indigo-600 hover:text-indigo-800 p-2 rounded-full hover:bg-indigo-50 transition"
                      title="Sửa danh mục"
                      onClick={() => openModal("edit", catalog)}
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition"
                      title="Xóa danh mục"
                      onClick={() => handleDeleteCatalog(catalog.CatalogId)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
        {/* Modal xác nhận xóa danh mục */}
        {confirmDeleteId !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-30">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 relative">
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
                onClick={cancelDelete}
                aria-label="Đóng"
              >
                <X size={24} />
              </button>
              <div className="text-lg font-semibold mb-4 text-black">
                Xác nhận xóa danh mục?
              </div>
              <div className="mb-6 text-gray-700">
                Bạn có chắc chắn muốn xóa danh mục này? Thao tác này không thể hoàn tác.
              </div>
              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                  onClick={cancelDelete}
                >
                  Hủy
                </button>
                <button
                  className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition font-semibold"
                  onClick={confirmDelete}
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Modal Thêm/Sửa danh mục */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center transition-all">
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
                {modalType === "add" ? "Thêm danh mục" : "Chỉnh sửa danh mục"}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-base font-medium mb-1 text-indigo-700">
                    Tên danh mục
                  </label>
                  <input
                    type="text"
                    required
                    value={form.Name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, Name: e.target.value }))
                    }
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 bg-indigo-50"
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
    </div>
  );
}
}

export default CatalogsManagement;