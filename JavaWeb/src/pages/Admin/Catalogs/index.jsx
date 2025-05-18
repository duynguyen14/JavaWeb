import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pencil, Trash2, Plus, Search, X } from 'lucide-react';

function CatalogManagement() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [form, setForm] = useState({ id: '', name: '' });

  // Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/v1/catalog');
      if (res.data.code === 1000) {
        setCategories(res.data.result);
      } else {
        console.error('API trả về mã lỗi:', res.data.code);
      }
    } catch (error) {
      console.error('Lỗi khi tải danh mục:', error);
    }
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const openAddDialog = () => {
    setEditingCategory(null);
    setForm({ id: '', name: '' });
    setIsDialogOpen(true);
  };

  const openEditDialog = (category) => {
    setEditingCategory(category);
    setForm({ name: category.name });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa danh mục này?')) {
      try {
        const res = await axios.delete(`http://localhost:8080/api/v1/catalog/${id}`);
        if (res.data.code === 1000) {
          fetchCategories();
        } else {
          alert('Xóa thất bại: ' + res.data.message);
        }
      } catch (error) {
        console.error('Lỗi khi xóa danh mục:', error);
      }
    }
  };

  const handleFormSubmit = async () => {
    if (!form.name.trim()) {
      alert('Tên danh mục không được để trống');
      return;
    }
    try {
      let res;
      if (editingCategory) {
        res = await axios.put(`http://localhost:8080/api/v1/catalog/${editingCategory.id}`, form);
      } else {
        res = await axios.post('http://localhost:8080/api/v1/catalog', form);
      }
      if (res.data.code === 1000) {
        setIsDialogOpen(false);
        fetchCategories();
      } else {
        alert('Lưu thất bại: ' + res.data.message);
      }
    } catch (error) {
      console.error('Lỗi khi lưu danh mục:', error);
    }
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-800">Quản lý danh mục</h2>
        <button
          onClick={openAddDialog}
          className="flex items-center space-x-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white px-6 py-3 rounded-md shadow hover:from-orange-500 hover:to-orange-600 transition"
        >
          <Plus size={20} />
          <span>Thêm danh mục</span>
        </button>
      </header>

      <div className="mb-6">
        <div className="relative max-w-sm">
          <Search className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Tìm kiếm danh mục..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-200"
          />
        </div>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Mã danh mục</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Tên danh mục</th>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">Hành động</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedCategories.length > 0 ? (
              paginatedCategories.map(category => (
                <tr key={category.id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{category.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{category.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                    <button onClick={() => openEditDialog(category)} className="mr-2 text-blue-500 hover:text-blue-600">
                      <Pencil size={18} />
                    </button>
                    <button onClick={() => handleDelete(category.id)} className="text-red-500 hover:text-red-600">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                  Không có danh mục phù hợp.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Phân trang */}
      <div className="mt-4 flex justify-center items-center space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
        >
          Trước
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 rounded border ${
              currentPage === index + 1
                ? 'bg-orange-500 text-white border-orange-500'
                : 'bg-white border-gray-300 hover:bg-gray-100'
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
        >
          Sau
        </button>
      </div>

      {isDialogOpen && (
        <>
          <div className="fixed inset-0 bg-black opacity-50" onClick={() => setIsDialogOpen(false)}></div>
          <div className="fixed inset-0 flex items-center justify-center px-4">
            <div className="bg-white w-full max-w-md rounded-lg shadow-xl p-6 relative animate-fade-in">
              <button
                onClick={() => setIsDialogOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
              >
                <X size={20} />
              </button>
              <h3 className="text-2xl font-semibold text-gray-800 mb-5">
                {editingCategory ? 'Chỉnh sửa danh mục' : 'Thêm danh mục'}
              </h3>
              <div className="space-y-5">
                {!editingCategory && (
                  <input
                    type="text"
                    placeholder="Mã danh mục"
                    value={form.id}
                    onChange={(e) => setForm({ ...form, id: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-200"
                  />
                )}
                <input
                  type="text"
                  placeholder="Tên danh mục"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-200"
                />
                <button
                  onClick={handleFormSubmit}
                  className="w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white py-3 rounded-md font-semibold hover:from-orange-500 hover:to-orange-600 transition"
                >
                  {editingCategory ? 'Cập nhật' : 'Thêm mới'}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CatalogManagement;
