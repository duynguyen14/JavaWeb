import React, { useState } from 'react';
import { Pencil, Save, X, Eye, EyeOff, Upload, ShieldCheck } from 'lucide-react';

// Giả lập dữ liệu admin từ database USERS, USER_ROLE, ROLE
const mockAdmin = {
  UserId: 1,
  UserName: 'Nguyễn Văn A',
  Email: 'a@gmail.com',
  Status: 'Hoạt động',
  Gender: 'Nam',
  DOB: '1995-01-01',
  Role: 'Admin',
};

function ProfileAdmin() {
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({ ...mockAdmin });
  const [form, setForm] = useState({ ...mockAdmin });
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [message, setMessage] = useState('');

  // 2FA state (demo)
  const [twoFA, setTwoFA] = useState(false);

  const handleEdit = () => {
    setForm({ ...profile });
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
    setForm({ ...profile });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setProfile({ ...form });
    setEditMode(false);
    // TODO: Gọi API cập nhật thông tin ở đây
  };

  // Avatar upload handler
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setAvatarUrl(URL.createObjectURL(file));
      setMessage('Đã chọn ảnh đại diện mới (chưa lưu)');
    }
  };

  // Password change handler (demo only)
  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (!passwordForm.oldPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      setMessage('Vui lòng nhập đầy đủ thông tin đổi mật khẩu.');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setMessage('Mật khẩu mới không khớp.');
      return;
    }
    // TODO: Gọi API đổi mật khẩu ở đây
    setMessage('Đổi mật khẩu thành công!');
    setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
    setShowChangePassword(false);
  };

  return (
    <div className="w-full min-h-[calc(100vh-80px)] flex justify-center items-start bg-gradient-to-br from-indigo-50 to-purple-100 py-2 px-2">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl p-0 md:p-0 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-14 py-6 flex flex-col md:flex-row items-center gap-10">
          <div className="relative">
            <img
              src={avatarUrl || "https://api.dicebear.com/7.x/initials/svg?seed=" + encodeURIComponent(profile.UserName)}
              alt="Avatar"
              className="w-40 h-40 rounded-full border-4 border-white object-cover shadow-lg"
            />
            <label className="absolute bottom-2 right-2 bg-white hover:bg-indigo-100 text-indigo-600 rounded-full p-2 cursor-pointer shadow transition border border-indigo-200">
              <Upload size={22} />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </label>
          </div>
          <div className="flex-1 flex flex-col items-center md:items-start">
            <div className="font-bold text-3xl text-white mb-1">{profile.UserName}</div>
            <div className="text-indigo-100 text-lg mb-2">{profile.Email}</div>
            <div className="flex gap-2 mt-2">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold
                ${profile.Status === 'Hoạt động' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {profile.Status}
              </span>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700">
                {profile.Role}
              </span>
            </div>
          </div>
        </div>
        {/* Thông báo */}
        {message && (
          <div className="mb-4 px-6 py-3 rounded-lg bg-yellow-50 text-yellow-700 border border-yellow-200 flex items-center justify-between text-base">
            <span>{message}</span>
            <button onClick={() => setMessage('')} className="ml-2 text-yellow-700 hover:text-yellow-900">
              <X size={18} />
            </button>
          </div>
        )}
        {/* Form */}
        <form onSubmit={handleSave} className="space-y-8 px-10 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Họ tên</label>
              {editMode ? (
                <input
                  type="text"
                  className="w-full border rounded-lg px-3 py-2 bg-indigo-50 focus:ring-2 focus:ring-indigo-500"
                  value={form.UserName}
                  onChange={e => setForm({ ...form, UserName: e.target.value })}
                  required
                />
              ) : (
                <div className="text-gray-800 font-semibold">{profile.UserName}</div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
              {editMode ? (
                <input
                  type="email"
                  className="w-full border rounded-lg px-3 py-2 bg-indigo-50 focus:ring-2 focus:ring-indigo-500"
                  value={form.Email}
                  onChange={e => setForm({ ...form, Email: e.target.value })}
                  required
                />
              ) : (
                <div className="text-gray-800 font-semibold">{profile.Email}</div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Giới tính</label>
              {editMode ? (
                <select
                  className="w-full border rounded-lg px-3 py-2 bg-indigo-50 focus:ring-2 focus:ring-indigo-500"
                  value={form.Gender}
                  onChange={e => setForm({ ...form, Gender: e.target.value })}
                >
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                  <option value="Khác">Khác</option>
                </select>
              ) : (
                <div className="text-gray-800 font-semibold">{profile.Gender}</div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Ngày sinh</label>
              {editMode ? (
                <input
                  type="date"
                  className="w-full border rounded-lg px-3 py-2 bg-indigo-50 focus:ring-2 focus:ring-indigo-500"
                  value={form.DOB}
                  onChange={e => setForm({ ...form, DOB: e.target.value })}
                />
              ) : (
                <div className="text-gray-800 font-semibold">
                  {profile.DOB ? new Date(profile.DOB).toLocaleDateString('vi-VN') : ''}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-end gap-4 pt-4">
            <button
              type="button"
              className="px-4 py-2 rounded-lg bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition font-semibold flex items-center gap-1"
              onClick={() => setShowChangePassword((v) => !v)}
            >
              Đổi mật khẩu
            </button>
            {editMode ? (
              <>
                <button
                  type="button"
                  className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition flex items-center gap-1"
                  onClick={handleCancel}
                >
                  <X size={18} /> Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition font-semibold flex items-center gap-1"
                >
                  <Save size={18} /> Lưu
                </button>
              </>
            ) : (
              <button
                type="button"
                className="px-4 py-2 rounded-lg bg-yellow-400 text-white hover:bg-yellow-500 transition font-semibold flex items-center gap-1"
                onClick={handleEdit}
              >
                <Pencil size={18} /> Chỉnh sửa
              </button>
            )}
          </div>
        </form>
        {/* Đổi mật khẩu */}
        {showChangePassword && (
          <div className="mt-4 max-w-lg mx-auto bg-indigo-50 rounded-2xl shadow-lg p-8">
            <h3 className="text-lg font-bold text-indigo-700 mb-4">Đổi mật khẩu</h3>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Mật khẩu cũ</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 bg-white"
                    value={passwordForm.oldPassword}
                    onChange={e => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600"
                    onClick={() => setShowPassword(v => !v)}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Mật khẩu mới</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 bg-white"
                  value={passwordForm.newPassword}
                  onChange={e => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Nhập lại mật khẩu mới</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 bg-white"
                  value={passwordForm.confirmPassword}
                  onChange={e => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  required
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                  onClick={() => setShowChangePassword(false)}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition font-semibold"
                >
                  Đổi mật khẩu
                </button>
              </div>
            </form>
          </div>
        )}
        {/* 2FA */}
        <div className="px-10 pb-8 pt-2">
          <div className="flex items-center gap-3 mt-6">
            <ShieldCheck size={22} className={twoFA ? "text-green-500" : "text-gray-400"} />
            <span className="font-semibold text-gray-700 text-base">Bảo mật 2 lớp (2FA)</span>
            <button
              className={`ml-4 px-4 py-2 rounded-lg font-semibold transition ${twoFA ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              onClick={() => setTwoFA(v => !v)}
            >
              {twoFA ? "Đã bật" : "Bật 2FA"}
            </button>
            {twoFA && <span className="ml-2 text-green-600 text-sm">Đã kích hoạt</span>}
          </div>
          <div className="text-xs text-gray-500 mt-2 ml-1">
            {twoFA
              ? "Tài khoản của bạn đang được bảo vệ bởi xác thực hai lớp."
              : "Bật xác thực hai lớp để tăng cường bảo mật cho tài khoản."}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileAdmin;
