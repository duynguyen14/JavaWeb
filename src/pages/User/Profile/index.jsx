import React, { useState, useEffect } from 'react';
import { User, Phone, Mail, Calendar, Edit2, Lock, AlertCircle } from 'lucide-react';
import axios from 'axios';

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [userInfo, setUserInfo] = useState({
    user_name: 'Nguyễn Văn A',
    email: "nguyenvana@gmail.com",
    phone: "0987654321",
    gender: "",
    dob: "09/09/1999",
  });
  const token =localStorage.getItem("token");
  // Lấy thông tin user khi component được mount
  useEffect(() => {
    fetchUserProfile();
  }, []);

  // Hàm lấy thông tin từ API
  const fetchUserProfile = () => {
    setLoading(true);
    axios.get('http://localhost:8080/user/profile',{
      headers:{
        Authorization :`Bearer ${token}`
      }
    })
      .then(response => {
        console.log('Thông tin khách hàng:', response.data);
        setUserInfo({
          ...userInfo,
          ...response.data
        });
      })
      .catch(error => {
        console.error('Lỗi lấy dữ liệu:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Xử lý thay đổi input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value
    });
  };

  // Xử lý chọn giới tính
  const handleGenderChange = (gender) => {
    setUserInfo({
      ...userInfo,
      gender
    });
  };

  // Xử lý cập nhật thông tin
  const handleUpdateProfile = () => {
    setSaving(true);
    // setMessage({ text: 'Đang cập nhật thông tin...', type: 'info' });

    axios.post('http://localhost:8080/user/profile', userInfo)
      .then(response => {
        console.log(response.data);
        // setMessage({ 
        //   text: 'Cập nhật thông tin thành công!', 
        //   type: 'success' 
        // });
        // setTimeout(() => setMessage({ text: '', type: '' }), 3000);
      })
      .catch(error => {
        console.error('Lỗi thông tin:', error);
        // setMessage({ 
        //   text: 'Lỗi cập nhật thông tin. Vui lòng thử lại sau.', 
        //   type: 'error' 
        // });
      })
      .finally(() => {
        setSaving(false);
      });
  };

  // Xử lý đổi mật khẩu (có thể thêm chức năng này sau)
  const handleChangePassword = () => {
    // Thêm logic đổi mật khẩu ở đây
    alert('Chức năng đổi mật khẩu sẽ được cập nhật sau');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white-50 to-white-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        
        <div className="text-center mb-5">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800">TÀI KHOẢN CỦA TÔI</h1>
        </div>

        {/* Content */}
        <div className="pt-10 px-6 pb-10 md:px-16">
            <>
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
                        name="user_name"
                        className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={userInfo.user_name}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone size={18} className="text-gray-400" />
                      </div>
                      <input
                        name="phone"
                        className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={userInfo.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ngày sinh</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar size={18} className="text-gray-400" />
                      </div>
                      <input
                        name="dob"
                        className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={userInfo.dob}
                        onChange={handleInputChange}
                        placeholder="DD/MM/YYYY"
                      />
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
                        name="email"
                        className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={userInfo.email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Giới tính</label>
                    <div className="grid grid-cols-3 gap-4">
                      <label className="relative flex justify-center items-center p-4 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input 
                          type="radio" 
                          name="gender" 
                          className="h-5 w-5 text-blue-600 focus:ring-blue-500" 
                          checked={userInfo.gender === "Nam"}
                          onChange={() => handleGenderChange("Nam")}
                        />
                        <span className="ml-3 text-gray-700">Nam</span>
                      </label>
                      <label className="relative flex justify-center items-center p-4 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input 
                          type="radio" 
                          name="gender" 
                          className="h-5 w-5 text-blue-600 focus:ring-blue-500" 
                          checked={userInfo.gender === "Nữ"}
                          onChange={() => handleGenderChange("Nữ")}
                        />
                        <span className="ml-3 text-gray-700">Nữ</span>
                      </label>
                      <label className="relative flex justify-center items-center p-4 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input 
                          type="radio" 
                          name="gender" 
                          className="h-5 w-5 text-blue-600 focus:ring-blue-500" 
                          checked={userInfo.gender === "Khác" || userInfo.gender === ""}
                          onChange={() => handleGenderChange("Khác")}
                        />
                        <span className="ml-3 text-gray-700">Khác</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row gap-6 justify-center">
                <button 
                  className={`flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition shadow-md text-lg ${saving ? 'opacity-70 cursor-not-allowed' : ''}`}
                  onClick={handleUpdateProfile}
                  disabled={saving}
                >
                  <span className="font-medium">
                    {saving ? 'ĐANG CẬP NHẬT...' : 'CẬP NHẬT'}
                  </span>
                </button>
                <button 
                  className="flex items-center justify-center bg-gradient-to-r from-gray-700 to-gray-800 text-white px-8 py-4 rounded-lg hover:from-gray-800 hover:to-gray-900 transition shadow-md text-lg"
                  onClick={handleChangePassword}
                >
                  <span className="font-medium">ĐỔI MẬT KHẨU</span>
                </button>
              </div>
            </>
          {/* )} */}
        </div>
      </div>

      <div className="text-center mt-6 text-sm text-gray-500">
        © 2025 Foxy Store. Mọi quyền được bảo lưu.
      </div>
    </div>
  );
};

export default Profile;