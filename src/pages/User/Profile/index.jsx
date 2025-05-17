import React, { useState } from 'react';
import { User, Phone, Mail, Calendar, Edit2, Lock, AlertCircle } from 'lucide-react';

const Profile = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white-50 to-white-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800">TÀI KHOẢN CỦA TÔI</h1>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* User Banner */}
          <div className="bg-gradient-to-r from-gray-600 to-gray-800 h-32 md:h-25  relative">
            <div className="absolute -bottom-15 left-8 md:left-12">
              <div className="bg-white rounded-full h-30 w-30 shadow-md border-4 border-white flex items-center justify-center">
                <User size={80} className="text-gray-400" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="pt-24 px-6 pb-10 md:px-16">
            {/* Notification */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-md mb-10 flex items-start">
              <AlertCircle size={24} className="text-blue-500 mt-1 mr-4 flex-shrink-0" />
              <p className="text-blue-700 text-base">
                Vì chính sách an toàn, bạn không thể thay đổi SĐT, Ngày sinh, Họ tên. Vui lòng liên hệ CSKH <span className="font-semibold">0123456789</span> để được hỗ trợ.
              </p>
            </div>

            {/* Form */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Họ và tên</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User size={18} className="text-gray-400" />
                    </div>
                    <input
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg py-3 pl-10 pr-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value="Nguyễn Văn A"
                      readOnly
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-xs text-gray-400 italic">Không thể chỉnh sửa</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone size={18} className="text-gray-400" />
                    </div>
                    <input
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg py-3 pl-10 pr-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value="0987654321"
                      readOnly
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-xs text-gray-400 italic">Không thể chỉnh sửa</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ngày sinh</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar size={18} className="text-gray-400" />
                    </div>
                    <input
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg py-3 pl-10 pr-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value="09/09/1999"
                      readOnly
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-xs text-gray-400 italic">Không thể chỉnh sửa</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail size={18} className="text-gray-400" />
                    </div>
                    <input
                      className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      defaultValue="foxystore.com@gmail.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Giới tính</label>
                  <div className="grid grid-cols-3 gap-4">
                    <label className="relative flex justify-center items-center p-4 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input type="radio" name="gender" className="h-5 w-5 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-3 text-gray-700">Nam</span>
                    </label>
                    <label className="relative flex justify-center items-center p-4 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input type="radio" name="gender" className="h-5 w-5 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-3 text-gray-700">Nữ</span>
                    </label>
                    <label className="relative flex justify-center items-center p-4 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input type="radio" name="gender" defaultChecked className="h-5 w-5 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-3 text-gray-700">Khác</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row gap-6 justify-center">
              <button className="flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition shadow-md text-lg">
                {/* <Edit2 size={20} className="mr-3" /> */}
                <span className="font-medium">CẬP NHẬT</span>
              </button>
              <button className="flex items-center justify-center bg-gradient-to-r from-gray-700 to-gray-800 text-white px-8 py-4 rounded-lg hover:from-gray-800 hover:to-gray-900 transition shadow-md text-lg">
                {/* <Lock size={20} className="mr-3" /> */}
                <span className="font-medium">ĐỔI MẬT KHẨU</span>
              </button>
            </div>

          </div>
        </div>

        <div className="text-center mt-6 text-sm text-gray-500">
          © 2025 Foxy Store. Mọi quyền được bảo lưu.
        </div>
      </div>
    </div>
  );
};

export default Profile;