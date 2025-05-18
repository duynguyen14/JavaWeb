import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pencil, Trash2, Plus, Search, X } from 'lucide-react';

function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [form, setForm] = useState({ categoryId: '', catalogId: '', name: '' });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/v1/category');
      setCategories(res.data);
    } catch (error) {
      console.error('Lỗi khi tải thể loại:', error);
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

  const openAddDialog = () => {
    setEditingCategory(null);
    setForm({ categoryId: '', catalogId: '', name: '' });
    setIsDialogOpen(true);
  };

  const openEditDialog = (category) => {
    setEditingCategory(category);
    setForm({
      categoryId: category.categoryId,
      catalogId: category.catalogId,
      name: category.name,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (categoryId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa thể loại này?')) {
      try {
        await axios.delete(`http://localhost:8080/api/v1/category/${categoryId}`); 
        fetchCategories();
      } catch (error) {
        console.error('Lỗi khi xóa thể loại:', error);
      }
    }
  };

  const handleFormSubmit = async () => {
    if (!form.catalogId || !form.name) {
      alert('Mã danh mục và tên thể loại không được để trống');
      return;
    }

    try {
      if (editingCategory) {
        await axios.put(
          `http://localhost:8080/api/v1/category/${editingCategory.categoryId}`, 
          form
        );
      } else {
        await axios.post('http://localhost:8080/api/v1/category', form); // Đổi categories thành category
      }
      setIsDialogOpen(false);
      fetchCategories();
    } catch (error) {
      console.error('Lỗi khi lưu thể loại:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-800">Quản lý thể loại</h2>
        <button
          onClick={openAddDialog}
          className="flex items-center space-x-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white px-6 py-3 rounded-md shadow hover:from-orange-500 hover:to-orange-600 transition"
        >
          <Plus size={20} />
          <span>Thêm thể loại</span>
        </button>
      </header>

      <div className="mb-6">
        <div className="relative max-w-sm">
          <Search className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Tìm kiếm thể loại..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // Reset page khi tìm kiếm
            }}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-200"
          />
        </div>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Mã thể loại</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Tên thể loại</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Danh mục</th>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">Hành động</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedCategories.map((category) => (
              <tr key={category.categoryId} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{category.categoryId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{category.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{category.catalogName || 'Chưa có'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                  <button onClick={() => openEditDialog(category)} className="mr-2 text-blue-500 hover:text-blue-600">
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(category.categoryId)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {paginatedCategories.length === 0 && (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                  Không tìm thấy thể loại.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Phân trang */}
      <div className="mt-4 flex justify-center items-center space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
        >
          Trước
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
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
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
        >
          Sau
        </button>
      </div>

      {/* Modal */}
      {isDialogOpen && (
        <>
          <div className="fixed inset-0 bg-black opacity-50" onClick={() => setIsDialogOpen(false)}></div>
          <div className="fixed inset-0 flex items-center justify-center px-4">
            <div className="bg-white w-full max-w-md rounded-lg shadow-xl p-6 relative animate-fade-in">
              <button onClick={() => setIsDialogOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition">
                <X size={20} />
              </button>
              <h3 className="text-2xl font-semibold text-gray-800 mb-5">
                {editingCategory ? 'Chỉnh sửa thể loại' : 'Thêm thể loại'}
              </h3>
              <div className="space-y-5">
                <input
                  type="text"
                  placeholder="Mã danh mục"
                  value={form.catalogId}
                  onChange={(e) => setForm({ ...form, catalogId: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-4 py-3"
                />
                <input
                  type="text"
                  placeholder="Tên thể loại"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-4 py-3"
                />
                <button
                  onClick={handleFormSubmit}
                  className="w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white py-3 rounded-md font-semibold"
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

export default CategoryManagement;
