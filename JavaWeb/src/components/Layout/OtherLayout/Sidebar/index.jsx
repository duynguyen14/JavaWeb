import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, LogOut, User, Truck, MapPin, Heart, HelpCircle, X } from 'lucide-react';

function Sidebar() {
    const [showMenu, setShowMenu] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (!mobile) setShowMenu(true);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const menuItems = [
        { icon: <User size={18} />, label: 'Thông tin tài khoản', link: '/profile' },
        { icon: <Truck size={18} />, label: 'Quản lý đơn hàng', link: '/order' },
        { icon: <MapPin size={18} />, label: 'Thiết lập địa chỉ', link: '/address' },
        { icon: <Heart size={18} />, label: 'Sản phẩm yêu thích', link: '/product/love' },
        { icon: <HelpCircle size={18} />, label: 'Hỗ trợ tài khoản', link: '/support' },
        { icon: <LogOut size={18} />, label: 'Đăng xuất', to: '#', special: true },
    ];

    return (
        <>
            {isMobile && !showMenu && (
                <button
                    className="fixed top-4 left-4 z-50 flex items-center gap-2 text-white bg-gray-600 px-3 py-2 rounded shadow-md hover:bg-gray-700 transition"
                    onClick={() => setShowMenu(true)}
                >
                    <Menu size={20} />
                    Menu
                </button>
            )}

            {/* Sidebar */}
            <div
                className={`bg-white shadow-md md:static fixed top-0 left-0 z-40 h-full w-64 transition-transform duration-300 ${
                    showMenu ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {/* Mobile Header */}
                {isMobile && (
                    <div className="flex justify-between items-center px-4 py-3 border-b">
                        <span className="font-semibold text-lg text-gray-800">Menu</span>
                        <button onClick={() => setShowMenu(false)} className="text-gray-600 hover:text-red-500">
                            <X size={24} />
                        </button>
                    </div>
                )}

                <div className="px-6 py-4 mt-4 md:mt-6">
                    <ul className="space-y-4 text-sm font-medium text-gray-700">
                        {menuItems.map((item, index) => (
                            <li key={index}>
                                <Link
                                    to={item.link}
                                    className={`flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition ${
                                        item.special ? 'text-blue-600 font-semibold hover:underline' : ''
                                    }`}
                                >
                                    {item.icon}
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Sidebar;
