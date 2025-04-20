import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../../components/Layout/DefautLayout/UserLayout/Footer/index.jsx';
import Header from '../../../components/Layout/DefautLayout/UserLayout/Header/index.jsx';
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    return (
        <div className="min-h-screen bg-white flex flex-col justify-between">
            <Header />
            <div className="flex flex-col items-center justify-center px-4 pt-10">
                <div className="w-full max-w-xl">
                    <h2 className="text-3xl font-bold uppercase text-center mb-2">Đăng ký tài khoản</h2>
                    <p className="text-center mb-6">Vui lòng nhập đầy đủ thông tin</p>

                    <form className="space-y-5">

                        {/* Họ tên */}
                        <div>
                            <label className="block font-medium mb-1">Tên đăng nhập <span className="text-red-600">*</span></label>
                            <input type="text" placeholder="Nhập tên đăng nhập " className="w-full px-4 py-3 border rounded" />
                        </div>

                        {/* Mật khẩu */}
                        <div>
                            <label className="block font-medium mb-1">Mật khẩu <span className="text-red-600">*</span></label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Nhập mật khẩu của Quý khách"
                                    className="w-full px-4 py-3 border rounded"
                                />
                                <div className="absolute top-3.5 right-3 cursor-pointer text-xl text-gray-600" onClick={() => setShowPassword(!showPassword)}>
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
                                    placeholder="Xác nhận mật khẩu đã nhập ở trên"
                                    className="w-full px-4 py-3 border rounded"
                                />
                                <div className="absolute top-3.5 right-3 cursor-pointer text-xl text-gray-600" onClick={() => setShowConfirm(!showConfirm)}>
                                    {showConfirm ? <IoEyeOutline /> : <IoEyeOffOutline />}
                                </div>
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block font-medium mb-1">Email</label>
                            <input type="email" placeholder="Nhập email của Quý khách" className="w-full px-4 py-3 border rounded" />
                        </div>


                        {/* Checkbox */}
                        <div className="space-y-2 text-sm">
                            <div className="flex items-start">
                                <input type="checkbox" id="terms" className="mr-2 mt-1"defaultChecked  />
                                <label  htmlFor="terms">Tôi đồng ý Điều kiện – Điều khoản & Chính sách bảo mật của FOXY</label>
                            </div>
                            <div className="flex items-start">
                                <input type="checkbox" id="offers" className="mr-2 mt-1" />
                                <label htmlFor="offers">Nhận thông tin và khuyến mãi mới nhất từ FOXY</label>
                            </div>
                        </div>

                        {/* Submit */}
                        <button type="submit" className="w-full bg-black text-white py-3 rounded hover:bg-red-600 transition font-semibold uppercase">
                            Đăng ký ngay
                        </button>
                    </form>

                    <p className="mt-4 text-center text-sm">
                        Quý khách đã có tài khoản? <Link to="/login" className="underline hover:text-red-600">ĐĂNG NHẬP NGAY</Link>
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Register;
