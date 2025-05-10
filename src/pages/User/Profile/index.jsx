import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Profile() {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div className="w-full bg-gray-50 py-8 px-4">
            {/* Header */}
            <h1 className="text-3xl text-center">Tài Khoản Của Tôi</h1>
            <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6 md:p-10">

                {/* Notification */}
                <div className="bg-blue-100 text-blue-700 p-4 rounded-lg mb-6 text-sm">
                    Vì chính sách an toàn, bạn không thể thay đổi SĐT, Ngày sinh, Họ tên. Vui lòng liên hệ CSKH 0123456789 để được hỗ trợ.
                </div>

                {/* Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold mb-2">Họ và tên</label>
                        <input
                            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value="Nguyễn Văn A"
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2">Số điện thoại</label>
                        <input
                            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value="0987654321"
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2">Email</label>
                        <input
                            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value="foxystore.com@gmail.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2">Giới tính</label>
                        <div className="flex items-center gap-4">
                            <label>
                                <input type="radio" name="gender" /> Nam
                            </label>
                            <label>
                                <input type="radio" name="gender" /> Nữ
                            </label>
                            <label>
                                <input type="radio" name="gender" defaultChecked /> Khác
                            </label>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2">Ngày sinh</label>
                        <input
                            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value="09/09/1999"
                            readOnly
                        />
                    </div>
                </div>

                {/* Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <button
                        className="block text-center bg-black text-white px-6 py-3 rounded-full hover:bg-red-600 transition uppercase"
                    >
                        CẬP NHẬT
                    </button>
                    <Link
                        to="#"
                        className="block text-center bg-black text-white px-6 py-3 rounded-full hover:bg-red-600 transition uppercase"
                    >
                        ĐỔI MẬT KHẨU
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Profile;
