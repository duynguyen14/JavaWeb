import React, { useState, useEffect } from 'react';
import {
  Home, Users, Package, List, Grid, ShoppingCart, BarChart2, Mail,
  Settings, LogOut, ChevronLeft, ChevronRight, X
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

function Sidebar({ collapsed, setCollapsed }) {
  const location = useLocation();
  const pathname = location.pathname;
  const [mobileOpen, setMobileOpen] = useState(false);

  // Đóng sidebar di động khi đường dẫn thay đổi
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Đóng sidebar di động khi kích thước màn hình thay đổi thành desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) { // Thay đổi từ md thành lg để phù hợp với AdminLayout
        setMobileOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Xử lý phím ESC để đóng menu di động
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [mobileOpen]);

  const menuItems = [
    { name: 'Dashboard', icon: <Home size={18} />, path: '/admin', badge: null },
    { name: 'Quản lý người dùng', icon: <Users size={18} />, path: '/admin/users', badge: '12' },
    { name: 'Quản lí nhân viên', icon: <Users size={18} />, path: '/employees', badge: null },
    { name: 'Quản lí sản phẩm', icon: <Package size={18} />, path: '/products', badge: '25' },
    { name: 'Quản lí danh mục', icon: <List size={18} />, path: '/categories', badge: null },
    { name: 'Quản lí thể loại', icon: <Grid size={18} />, path: '/genres', badge: null },
    { name: 'Quản lý đơn hàng', icon: <ShoppingCart size={18} />, path: '/orders', badge: '8' },
    { name: 'Quản lý doanh thu', icon: <BarChart2 size={18} />, path: '/revenue', badge: null },
    { name: 'Tài khoản', icon: <Users size={18} />, path: '/account', badge: null },
    { name: 'Tin nhắn', icon: <Mail size={18} />, path: '/messages', badge: '5' },
    { name: 'Cài đặt', icon: <Settings size={18} />, path: '/settings', },
  ];

  return (
    <>
      {/* Lớp nền mờ cho di động */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden transition-opacity"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Nút mở menu trên di động */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-orange-500 text-white p-2 rounded-md shadow-md hover:bg-orange-600 transition-colors"
        aria-label={mobileOpen ? "Đóng menu" : "Mở menu"}
      >
        {mobileOpen ? <X size={20} /> : "☰"}
      </button>

      {/* Sidebar chính */}
      <aside 
        className={`
          fixed inset-y-0 left-0 bg-white border-r border-orange-100 shadow-lg z-40
          transition-all duration-300 ease-in-out
          ${collapsed ? 'w-20' : 'w-64'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Header */}
        <div className="h-16 px-4 border-b border-orange-100 bg-gradient-to-r from-orange-300 to-orange-200 flex items-center justify-between">
          {!collapsed ? (
            <div className="flex items-center space-x-3">
              <div className="h-9 w-9 bg-white text-orange-500 rounded-full flex items-center justify-center font-bold text-lg shadow-sm">
                🦊
              </div>
              <h1 className="text-orange-800 font-semibold text-lg tracking-wide">Foxy Admin</h1>
            </div>
          ) : (
            <div className="h-9 w-9 mx-auto bg-white text-orange-500 rounded-full flex items-center justify-center font-bold text-lg shadow-sm">
              🦊
            </div>
          )}
          
          {/* Nút đóng cho di động */}
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden text-orange-700 hover:bg-orange-100 p-1 rounded-full transition"
            aria-label="Đóng sidebar"
          >
            <X size={20} />
          </button>
          
          {/* Nút thu gọn/mở rộng cho desktop */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:block text-orange-700 hover:bg-orange-100 p-1 rounded-md transition"
            aria-label={collapsed ? "Mở rộng sidebar" : "Thu gọn sidebar"}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Thông tin người dùng */}
        <div className="px-4 py-3 border-b border-orange-100 bg-orange-50">
          {!collapsed ? (
            <div className="flex items-center space-x-3">
              <div className="h-9 w-9 bg-orange-200 text-orange-700 rounded-full flex items-center justify-center font-medium">AD</div>
              <div>
                <h3 className="text-sm font-semibold text-gray-800">Admin User</h3>
                <p className="text-xs text-orange-600">Super Admin</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="h-9 w-9 bg-orange-200 text-orange-700 rounded-full flex items-center justify-center font-medium">AD</div>
            </div>
          )}
        </div>

        {/* Menu */}
        <nav className="h-[calc(100vh-8rem)] overflow-y-auto overflow-x-hidden px-2 pt-4 pb-20">
          {!collapsed && (
            <p className="text-xs font-semibold text-orange-500 uppercase mb-2 px-2 tracking-wider">Menu</p>
          )}
          <ul className="space-y-1">
            {menuItems.map((item, index) => {
              const isActive = pathname === item.path;
              return (
                <li key={index}>
                  <Link
                    to={item.path}
                    className={`group flex items-center ${collapsed ? 'justify-center' : 'justify-between'} gap-3 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium
                      ${isActive ? 'bg-orange-100 text-orange-700' : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'}`}
                  >
                    <div className={`flex items-center ${collapsed ? '' : 'gap-3'}`}>
                      <span className={`${isActive ? 'text-orange-500' : 'text-gray-500'} group-hover:text-orange-500 transition-colors`}>
                        {item.icon}
                      </span>
                      {!collapsed && <span>{item.name}</span>}
                    </div>
                    {!collapsed && item.badge && (
                      <span className="bg-orange-100 text-orange-600 text-xs px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                    {/* {collapsed && item.badge && (
                      <span className="absolute top-5 right-0 translate-x-1/2 -translate-y-1/2 bg-orange-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                        {item.badge}
                      </span>
                    )} */}
                  </Link>
                </li>
              );
            })}
          </ul>
            
            

          {/* Đăng xuất */}
          <div className="mt-6">
            {!collapsed && (
              <p className="text-xs font-semibold text-orange-500 uppercase mb-2 px-2 tracking-wider">Tài khoản</p>
            )}
            <Link
              to="/logout"
              className={`group flex items-center ${collapsed ? 'justify-center' : 'justify-start'} gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors`}
            >
              <span className="text-gray-500 group-hover:text-red-600 transition-colors"><LogOut size={18} /></span>
              {!collapsed && <span>Đăng xuất</span>}
            </Link>
          </div>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;