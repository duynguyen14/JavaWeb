import React, { useState } from 'react';
import { Pencil, Trash2, Plus, Search, X, UserPlus, Lock, Unlock } from 'lucide-react';

// Dữ liệu mẫu
const mockUsers = [
  {
    id: 1,
    email: 'a@gmail.com',
    name: 'Nguyễn Văn A',
    role: 'Admin',
    status: 'Hoạt động',
    gender: 'Nam',
    dob: '1995-01-01',
  },
  {
    id: 2,
    email: 'b@gmail.com',
    name: 'Trần Thị B',
    role: 'User',
    status: 'Bị khóa',
    gender: 'Nữ',
    dob: '1998-05-10',
  },
  {
    id: 3,
    email: 'c@gmail.com',
    name: 'Lê Văn C',
    role: 'User',
    status: 'Hoạt động',
    gender: 'Nam',
    dob: '2000-09-20',
  },
];

const roles = ['Admin', 'User'];
const genders = ['Nam', 'Nữ', 'Khác'];

function UserManagement() {
  const [users, setUsers] = useState(mockUsers);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add'); // 'add' | 'edit'
  const [selectedUser, setSelectedUser] = useState(null);

  // Form state
  const [form, setForm] = useState({
    name: '',
    email: '',
    role: 'User',
    status: 'Hoạt động',
    gender: 'Nam',
    dob: '',
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const totalPages = Math.ceil(users.length / pageSize);

  // Lọc người dùng
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  // Lấy dữ liệu trang hiện tại
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Khi search thay đổi thì về trang 1
  React.useEffect(() => {
    setCurrentPage(1);
  }, [search, users.length]);

  // Mở modal thêm/sửa
  const openModal = (type, user = null) => {
    setModalType(type);
    setShowModal(true);
    if (type === 'edit' && user) {
      setSelectedUser(user);
      setForm({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        gender: user.gender || 'Nam',
        dob: user.dob ? user.dob.slice(0, 10) : '',
      });
    } else {
      setSelectedUser(null);
      setForm({
        name: '',
        email: '',
        role: 'User',
        status: 'Hoạt động',
        gender: 'Nam',
        dob: '',
      });
    }
  };

  // Đóng modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
    setForm({ name: '', email: '', role: 'User', status: 'Hoạt động', gender: 'Nam', dob: '' });
  };

  // Xử lý thêm/sửa người dùng
  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalType === 'add') {
      const newUser = {
        ...form,
        id: users.length ? Math.max(...users.map(u => u.id)) + 1 : 1,
      };
      setUsers([newUser, ...users]);
    } else if (modalType === 'edit' && selectedUser) {
      setUsers(users.map(u => u.id === selectedUser.id ? { ...form, id: selectedUser.id } : u));
    }
    closeModal();
  };

  // Xóa người dùng
  const handleDelete = (userId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      setUsers(users.filter(u => u.id !== userId));
    }
  };

  // Khóa/Mở khóa người dùng
  const toggleStatus = (user) => {
    setUsers(users.map(u =>
      u.id === user.id
        ? { ...u, status: u.status === 'Hoạt động' ? 'Bị khóa' : 'Hoạt động' }
        : u
    ));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Quản lý người dùng</h2>
        <button
          className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          onClick={() => openModal('add')}
        >
          <Plus size={18} className="mr-2" /> Thêm người dùng
        </button>
      </div>

      <div className="flex items-center mb-4">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Tìm kiếm..."
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
              <th className="p-3 font-semibold">Họ tên</th>
              <th className="p-3 font-semibold">Email</th>
              <th className="p-3 font-semibold">Giới tính</th>
              <th className="p-3 font-semibold">Ngày sinh</th>
              <th className="p-3 font-semibold">Vai trò</th>
              <th className="p-3 font-semibold">Trạng thái</th>
              <th className="p-3 text-center font-semibold">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map(user => (
              <tr key={user.id} className="border-t hover:bg-indigo-50 transition">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.gender || ''}</td>
                <td className="p-3">{user.dob ? new Date(user.dob).toLocaleDateString('vi-VN') : ''}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold
                    ${user.role === 'Admin' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700'}`}>
                    {user.role}
                  </span>
                </td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold
                    ${user.status === 'Hoạt động' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {user.status}
                  </span>
                </td>
                <td className="p-3 flex justify-center space-x-2">
                  <button
                    className="text-indigo-600 hover:text-indigo-800 p-2 rounded-full hover:bg-indigo-100 transition"
                    title="Sửa"
                    onClick={() => openModal('edit', user)}
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-100 transition"
                    title="Xóa"
                    onClick={() => handleDelete(user.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                  <button
                    className={`p-2 rounded-full transition ${user.status === 'Hoạt động'
                      ? 'text-yellow-600 hover:text-yellow-800 hover:bg-yellow-100'
                      : 'text-green-600 hover:text-green-800 hover:bg-green-100'
                    }`}
                    title={user.status === 'Hoạt động' ? 'Khóa tài khoản' : 'Mở khóa tài khoản'}
                    onClick={() => toggleStatus(user)}
                  >
                    {user.status === 'Hoạt động' ? <Lock size={18} /> : <Unlock size={18} />}
                  </button>
                </td>
              </tr>
            ))}
            {paginatedUsers.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center p-4 text-gray-500">Không tìm thấy người dùng.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <nav className="inline-flex rounded-md shadow-sm" aria-label="Pagination">
            <button
              className={`px-3 py-1 rounded-l-md border border-indigo-200 bg-white text-indigo-600 hover:bg-indigo-50 transition disabled:opacity-50`}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                className={`px-3 py-1 border-t border-b border-indigo-200 bg-white text-indigo-600 hover:bg-indigo-50 transition
                  ${currentPage === idx + 1 ? 'font-bold bg-indigo-100' : ''}`}
                onClick={() => setCurrentPage(idx + 1)}
              >
                {idx + 1}
              </button>
            ))}
            <button
              className={`px-3 py-1 rounded-r-md border border-indigo-200 bg-white text-indigo-600 hover:bg-indigo-50 transition disabled:opacity-50`}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </nav>
        </div>
      )}

      {/* Modal Thêm/Sửa */}
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
              {modalType === 'add' ? <UserPlus size={22} /> : <Pencil size={20} />}
              {modalType === 'add' ? 'Thêm người dùng' : 'Chỉnh sửa người dùng'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Họ tên</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 bg-indigo-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 bg-indigo-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Giới tính</label>
                <select
                  value={form.gender}
                  onChange={e => setForm({ ...form, gender: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 bg-indigo-50"
                >
                  {genders.map(g => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Ngày sinh</label>
                <input
                  type="date"
                  value={form.dob}
                  onChange={e => setForm({ ...form, dob: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 bg-indigo-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Vai trò</label>
                <select
                  value={form.role}
                  onChange={e => setForm({ ...form, role: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 bg-indigo-50"
                >
                  {roles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Trạng thái</label>
                <select
                  value={form.status}
                  onChange={e => setForm({ ...form, status: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 bg-indigo-50"
                >
                  <option value="Hoạt động">Hoạt động</option>
                  <option value="Bị khóa">Bị khóa</option>
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
                  {modalType === 'add' ? 'Thêm' : 'Lưu'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserManagement;
