import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoEyeOff, IoEye } from "react-icons/io5";
import { request } from '../../untils/request';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from '../../redux/actions';
import Loading from '../../components/OtherComponent/Loading';
function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const dispatch =useDispatch();
    const loading =useSelector(state=>state.loading)
    console.log(loading);
    const navigate =useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleOnclickLogin = async () => {
        try {
            const response = await request.post("user/login", user);
            console.log(response.data);
            alert("Đăng nhập thành công")
            localStorage.setItem("token",response.data.result.accessToken);
            setTimeout(() => {
                // navigate("/");
            }, 1000);
        }
        catch(e){
            alert("Đăng nhập thất bại");
            console.log("Lỗi ",e);
        }
    }

    return (
        <div className="bg-white flex flex-col justify-between border-gray-300 border-y-[1px]">
            <div className="flex flex-grow items-center justify-center px-4 py-12">
                <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Left side - Login */}
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
                                    name="email"
                                    value={user.email}
                                    onChange={handleChange}
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
                                        name="password"
                                        value={user.password}
                                        onChange={handleChange}
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

                            <button
                                type="button"
                                className="cursor-pointer w-full bg-black text-white py-3 rounded-full hover:bg-red-600 transition uppercase"
                                onClick={() => handleOnclickLogin()}
                            >
                                ĐĂNG NHẬP
                            </button>

                            {/* đăng nhập google */}
                            <div className="mt-4">
                                <button
                                    type="button"
                                    className="cursor-pointer w-full flex items-center justify-center border border-gray-300 py-3 rounded hover:bg-gray-100 transition"
                                    onClick={() => {

                                        authService.login();
                                    }}

                                >
                                    <img
                                        src="https://developers.google.com/identity/images/g-logo.png"
                                        alt="Google"
                                        className="w-5 h-5 mr-3"
                                    />
                                    <span className=" font-medium text-gray-700">Đăng nhập bằng Google</span>
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Right side - Register */}
                    <div className="bg-gray-50 p-8 rounded shadow-sm flex flex-col justify-center">
                        <h3 className="text-2xl font-bold text-center mb-4">Khách hàng mới của FoxyStore</h3>
                        <p className="text-center mb-6 text-gray-600">
                            Nếu bạn chưa có tài khoản trên foxystore.com, hãy sử dụng tùy chọn này để truy cập biểu mẫu đăng ký.
                            Bằng cách cung cấp cho FoxyStore thông tin chi tiết của bạn, quá trình mua hàng trên foxystore.com sẽ là một trải nghiệm thú vị và nhanh chóng hơn!
                        </p>
                        <Link
                            to="/register"
                            className="cursor-pointer block text-center bg-black text-white py-3 rounded-full hover:bg-red-600 transition uppercase"
                        >
                            ĐĂNG KÝ
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Login;
