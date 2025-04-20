import React from 'react'

import { useState } from 'react';
import { Link } from 'react-router-dom';
// import Footer from '../../components/Layout/DefautLayout/UserLayout/Footer/index.jsx';
// import Header from '../../components/Layout/DefautLayout/UserLayout/Header/index.jsx';
import { IoEyeOff, IoEye } from "react-icons/io5";

function Login() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen bg-white flex flex-col justify-between">

            {/* <Header /> */}
            <div className="flex items-center justify-center flex-grow px-4">
                <div className="w-full max-w-xl">
                    <h2 className="text-3xl font-bold text-center mb-2 uppercase">Đăng nhập</h2>
                    <p className="text-center mb-6">
                        Vui lòng nhập thông tin và tận hưởng trải nghiệm cá nhân hóa cùng FOXY
                    </p>
                    <form className="space-y-4">
                        <div>
                            <label className="block font-medium mb-1">
                                Email / Số điện thoại <span className="text-red-600">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Nhập email hoặc số điện thoại của Quý khách"
                                className="w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1">
                                Mật khẩu <span className="text-red-600">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Nhập mật khẩu"
                                    className="w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                                />
                                <div
                                    className="absolute right-3 top-3.5 text-xl text-gray-600 cursor-pointer"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <IoEye /> : <IoEyeOff />}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input id="remember" type="checkbox" className="mr-2" />
                            <label htmlFor="remember" className="text-sm">
                                Nhớ thông tin đăng nhập của tôi
                            </label>
                        </div>

                        <div className="flex justify-between text-sm">
                            <span>
                                Quý khách chưa có tài khoản?{' '}
                                <Link to="/register" className="underline hover:text-red-600 "  >ĐĂNG KÝ</Link>
                            </span>
                            <Link to="/login" className="underline hover:text-red-600">Quên mật khẩu?</Link>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-black text-white py-3 rounded hover:bg-red-600 transition font-semibold uppercase"
                        >
                            ĐĂNG NHẬP
                        </button>
                    </form>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    );
}

export default Login;
