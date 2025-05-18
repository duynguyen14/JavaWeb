import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { request } from '../../../untils/request';
import axios from 'axios';
function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [user, setUser] = useState({
        userName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleOnChangeInput = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (user.password !== user.confirmPassword) {
            alert("Mật khẩu xác nhận không khớp!");
            return;
        }

        try {
            const { confirmPassword, ...userData } = user; // bỏ confirm trước khi gửi
            const response = await request.post("user/register", userData);
            console.log(response);
            alert("Đăng ký thành công!");
        } catch (error) {
            console.log("Lỗi đăng ký:", error);
            alert("Đăng ký thất bại!");
        }
    };
    return (
        <div className="border-gray-300 border-y-[1px] bg-white flex flex-col justify-between">
            <div className="flex flex-grow items-center justify-center px-4 py-12">
                <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Left -register */}
                    <div className="w-full max-w-xl">
                        <h2 className="text-3xl font-bold uppercase text-center mb-2">Đăng ký tài khoản</h2>
                        <p className="text-center mb-6">Vui lòng nhập đầy đủ thông tin</p>

                        <form className="space-y-5" onSubmit={handleSubmit}>
                            {/* Tên đăng nhập */}
                            <div>
                                <label className="block font-medium mb-1">
                                    Tên đăng nhập <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="userName"
                                    placeholder="Nhập tên đăng nhập"
                                    className="w-full px-4 py-3 border rounded"
                                    value={user.userName}
                                    onChange={handleOnChangeInput}
                                />
                            </div>

                            {/* Mật khẩu */}
                            <div>
                                <label className="block font-medium mb-1">
                                    Mật khẩu <span className="text-red-600">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Nhập mật khẩu"
                                        className="w-full px-4 py-3 border rounded"
                                        value={user.password}
                                        onChange={handleOnChangeInput}
                                    />
                                    <div
                                        className="absolute top-3.5 right-3 cursor-pointer text-xl text-gray-600"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                                    </div>
                                </div>
                            </div>

                            {/* Nhập lại mật khẩu */}
                            <div>
                                <label className="block font-medium mb-1">Nhắc lại mật khẩu</label>
                                <div className="relative">
                                    <input
                                        type={showConfirm ? "text" : "password"}
                                        name="confirmPassword"
                                        placeholder="Xác nhận mật khẩu"
                                        className="w-full px-4 py-3 border rounded"
                                        value={user.confirmPassword}
                                        onChange={handleOnChangeInput}
                                    />
                                    <div
                                        className="absolute top-3.5 right-3 cursor-pointer text-xl text-gray-600"
                                        onClick={() => setShowConfirm(!showConfirm)}
                                    >
                                        {showConfirm ? <IoEyeOutline /> : <IoEyeOffOutline />}
                                    </div>
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block font-medium mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Nhập email"
                                    className="w-full px-4 py-3 border rounded"
                                    value={user.email}
                                    onChange={handleOnChangeInput}
                                />
                            </div>

                            {/* Checkbox */}
                            <div className="space-y-2 text-sm">
                                <div className="flex items-start">
                                    <input type="checkbox" id="terms" className="mr-2 mt-1" defaultChecked />
                                    <label htmlFor="terms">Tôi đồng ý Điều kiện – Điều khoản & Chính sách bảo mật của FOXY</label>
                                </div>
                                <div className="flex items-start">
                                    <input type="checkbox" id="offers" className="mr-2 mt-1" />
                                    <label htmlFor="offers">Nhận thông tin và khuyến mãi mới nhất từ FOXY</label>
                                </div>
                            </div>

                            {/* Submit */}
                            <button
                                // type="submit"
                                className="cursor-pointer w-full bg-black text-white py-3 rounded-full hover:bg-red-600 transition uppercase"
                            >
                                Đăng ký ngay
                            </button>
                        </form>
                    </div>

                    {/* Right - login */}
                    <div className="bg-gray-50 p-8 rounded shadow-sm flex flex-col justify-center">
                        <h3 className="text-2xl font-bold text-center mb-4">Khách hàng mới của FoxyStore</h3>
                        <p className="text-center mb-6 text-gray-600">
                            Nếu bạn đã có tài khoản foxystore.com, hãy sử dụng tùy chọn này để truy cập biểu mẫu đăng nhập.
                            Hãy đăng nhập bằng tài khoản FoxyStore của bạn, quá trình mua hàng trên foxystore.com sẽ là một trải nghiệm thú vị và nhanh chóng hơn!
                        </p>
                        <Link
                            to="/login"
                            className="cursor-pointer block text-center bg-black text-white py-3 rounded-full hover:bg-red-600 transition uppercase"
                        >
                            ĐĂNG NHẬP
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Register;
