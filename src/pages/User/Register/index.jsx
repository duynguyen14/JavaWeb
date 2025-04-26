import React, { useState } from 'react';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
// import Footer from '../../../components/Layout/DefautLayout/UserLayout/Footer/index.jsx';
// import Header from '../../../components/Layout/DefautLayout/UserLayout/Header/index.jsx';
=======
>>>>>>> f717db6c5fc83ad1d81b89e440bb55838b4f2280
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    return (
        <div className="min-h-screen bg-white flex flex-col justify-between">
<<<<<<< HEAD
            {/* <Header /> */}
            <div className="flex flex-col items-center justify-center px-4 pt-10">
                <div className="w-full max-w-xl">
                    <h2 className="text-3xl font-bold uppercase text-center mb-2">Đăng ký tài khoản</h2>
                    <p className="text-center mb-6">Vui lòng nhập đầy đủ thông tin</p>
=======
            <div className="flex flex-grow items-center justify-center px-4 py-12">
                <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2     gap-8">
>>>>>>> f717db6c5fc83ad1d81b89e440bb55838b4f2280

                    {/* Left -register */}

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
                                    <input type="checkbox" id="terms" className="mr-2 mt-1" defaultChecked />
                                    <label htmlFor="terms">Tôi đồng ý Điều kiện – Điều khoản & Chính sách bảo mật của FOXY</label>
                                </div>
                                <div className="flex items-start">
                                    <input type="checkbox" id="offers" className="mr-2 mt-1" />
                                    <label htmlFor="offers">Nhận thông tin và khuyến mãi mới nhất từ FOXY</label>
                                </div>
                            </div>

                            {/* Submit */}
                            <button type="submit" className="w-full bg-black text-white py-3 rounded-full hover:bg-red-600 transition uppercase">
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
                            className="block text-center bg-black text-white py-3 rounded-full hover:bg-red-600 transition uppercase"
                        >
                            ĐĂNG NHẬP
                        </Link>
                    </div>

                </div>
            </div>
<<<<<<< HEAD
            {/* <Footer /> */}
=======
>>>>>>> f717db6c5fc83ad1d81b89e440bb55838b4f2280
        </div>
    );
}

export default Register;
