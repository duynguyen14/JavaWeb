import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Bell,
  MessageSquare,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

function Header({ onToggleSidebar }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const notifications = [
    {
      id: 1,
      title: "Đơn hàng mới",
      message: "Đơn hàng #1234 vừa được tạo",
      time: "5 phút trước",
      unread: true,
    },
    {
      id: 2,
      title: "Khách hàng mới",
      message: "Nguyễn Văn A vừa đăng ký",
      time: "10 phút trước",
      unread: true,
    },
    {
      id: 3,
      title: "Tồn kho thấp",
      message: "Sản phẩm áo thun M gần hết hàng",
      time: "1 giờ trước",
      unread: false,
    },
  ];

  const profileRef = useRef(null);
  const notificationRef = useRef(null);
  const searchRef = useRef(null);
  const searchInputRef = useRef(null);

  // Kiểm tra kích thước màn hình
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024); // Thay đổi từ 768 thành 1024 để phù hợp với AdminLayout
      if (window.innerWidth >= 1024) {
        setIsSearchOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Focus vào ô tìm kiếm khi mở
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsNotificationOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Đóng dropdown khi nhấn phím ESC
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        setIsProfileOpen(false);
        setIsNotificationOpen(false);
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => document.removeEventListener("keydown", handleEscKey);
  }, []);

  return (
    <header className="bg-white shadow-sm border-b border-orange-100 h-16 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30">
      {/* Left - Menu Toggle & Logo */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden text-gray-500 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 p-1 rounded-md"
          aria-label="Chuyển đổi sidebar"
        >
          <Menu size={22} />
        </button>

        {/* <div className="lg:hidden">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-orange-200 rounded-full flex items-center justify-center text-orange-600 font-bold">
              🦊
            </div>
          </div>
        </div> */}
      </div>

      {/* Search Bar */}
      <div
        ref={searchRef}
        className={`
          relative 
          ${
            isSearchOpen
              ? "absolute top-0 left-0 right-0 p-3 bg-white z-50 h-16 flex items-center border-b border-orange-100"
              : "w-full max-w-xs hidden lg:block"
          }
        `}
      >
        {isSearchOpen && (
          <button
            onClick={() => setIsSearchOpen(false)}
            className="mr-2 text-gray-500 hover:text-orange-500"
            aria-label="Đóng tìm kiếm"
          >
            <X size={20} />
          </button>
        )}

        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-400"
          />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Tìm kiếm..."
            className="pl-10 pr-4 py-2 w-full text-sm rounded-lg border border-orange-200 bg-orange-50 focus:ring-1 focus:ring-orange-300 focus:border-orange-300 focus:outline-none"
          />
        </div>
      </div>

      {/* Icons bên phải */}
      <div className="flex items-center space-x-2 sm:space-x-4">
        {/* Nút Search - Mobile */}
        <button
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className="lg:hidden p-2 rounded-md hover:bg-orange-100 text-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          aria-label="Tìm kiếm"
        >
          <Search size={18} />
        </button>

        {/* Notifications */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => {
              setIsNotificationOpen(!isNotificationOpen);
              setIsProfileOpen(false);
            }}
            className="p-2 rounded-md hover:bg-orange-100 text-orange-600 relative focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            aria-label="Thông báo"
          >
            <Bell size={18} />
            {notifications.filter((n) => n.unread).length > 0 && (
              <span className="absolute top-1 right-1 bg-red-500 h-2 w-2 rounded-full"></span>
            )}
          </button>
          {/* thông báo */}
          {isNotificationOpen && (
            <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white shadow-lg rounded-lg border border-orange-100 z-20">
              <div className="px-4 py-2 border-b border-orange-100 text-sm font-semibold text-gray-700 bg-orange-50 flex justify-between items-center">
                <span>Thông báo</span>
                <button
                  onClick={() => setIsNotificationOpen(false)}
                  className="text-gray-500 hover:text-orange-500 lg:hidden"
                  aria-label="Đóng thông báo"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="max-h-60 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`px-4 py-2 text-sm border-b ${
                        n.unread ? "bg-orange-50" : "bg-white"
                      }`}
                    >
                      <div className="flex justify-between">
                        <span className="font-medium">{n.title}</span>
                        <span className="text-xs text-gray-400">{n.time}</span>
                      </div>
                      <p className="text-xs text-gray-500">{n.message}</p>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-8 text-center text-sm text-gray-500">
                    Không có thông báo mới
                  </div>
                )}
              </div>
              <div className="px-4 py-2 border-t bg-orange-50 text-center">
                <a
                  href="/notifications"
                  className="text-xs text-orange-600 hover:underline"
                >
                  Xem tất cả
                </a>
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => {
              setIsProfileOpen(!isProfileOpen);
              setIsNotificationOpen(false);
            }}
            className="flex items-center space-x-2 bg-orange-50 p-1.5 rounded-md hover:bg-orange-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            aria-label="Menu người dùng"
            aria-expanded={isProfileOpen}
          >
            <div className="h-8 w-8 bg-orange-200 text-orange-700 rounded-full flex items-center justify-center text-sm font-semibold">
              AD
            </div>
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-sm font-medium text-gray-700">Admin</span>
              <span className="text-xs text-orange-500">Quản trị viên</span>
            </div>
            <ChevronDown
              size={14}
              className="text-orange-400 hidden lg:block"
            />
          </button>
          {/* profile */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-lg border border-orange-100 z-20">
              <div className="px-4 py-3 border-b bg-orange-50 flex justify-between items-center">
                <div>
                  <p className="text-sm font-semibold text-gray-700">Admin</p>
                  <p className="text-xs text-orange-500">
                    admin@foxyfashion.com
                  </p>
                </div>
                <button
                  onClick={() => setIsProfileOpen(false)}
                  className="text-gray-500 hover:text-orange-500 lg:hidden"
                  aria-label="Đóng menu"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Thông tin người dùng */}
              <div className="p-4 space-y-2">
                <div>
                  <span className="text-gray-500 text-sm">Họ tên:</span>
                  <p className="font-medium text-gray-700">Nguyễn Văn A</p>
                </div>
                <div>
                  <span className="text-gray-500 text-sm">Email:</span>
                  <p className="font-medium text-gray-700">
                    admin@foxyfashion.com
                  </p>
                </div>
                <div>
                  <span className="text-gray-500 text-sm">Vai trò:</span>
                  <p className="font-medium text-gray-700">Quản trị viên</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
