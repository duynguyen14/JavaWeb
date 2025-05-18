import React from 'react';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto pt-6 bg-orange-50">
      <div className="max-w-screen-xl mx-auto px-6 py-8 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600">
          {/* Logo + Giới thiệu */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-10 w-10 bg-orange-300 rounded-md flex items-center justify-center">
                <span className="font-bold text-white text-xl">F</span>
              </div>
              <span className="text-lg font-semibold text-gray-800">Foxy Fashion</span>
            </div>
            <p className="text-xs text-gray-500">
              Foxy – Nơi mua sắm thời trang hàng đầu dành cho bạn. Phong cách, chất lượng, và sự hài lòng.
            </p>
          </div>

          {/* Thông tin liên hệ */}
          <div>
            <h4 className="font-medium text-gray-700 mb-4">Liên hệ</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-2" /> 123 Đường Thời Trang, TP.HCM
              </li>
              <li className="flex items-center text-gray-600">
                <Mail className="w-4 h-4 mr-2" /> support@foxy.vn
              </li>
              <li className="flex items-center text-gray-600">
                <Phone className="w-4 h-4 mr-2" /> 0123 456 789
              </li>
            </ul>
          </div>

          {/* Chính sách & điều khoản */}
          <div className="flex flex-col space-y-3 md:items-end">
            <a href="/terms" className="text-xs text-gray-600 hover:text-orange-500 transition-colors">Điều khoản dịch vụ</a>
            <a href="/privacy" className="text-xs text-gray-600 hover:text-orange-500 transition-colors">Chính sách bảo mật</a>
            <a href="/help" className="text-xs text-gray-600 hover:text-orange-500 transition-colors">Trung tâm trợ giúp</a>
          </div>
        </div>

        {/* Line dưới cùng */}
        <div className="mt-8 border-t border-orange-200 pt-4 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
          <p className="mb-2 md:mb-0">&copy; {currentYear} Foxy. Đã đăng ký bản quyền.</p>
          <p className="flex items-center text-gray-600">
            Phát triển với <Heart size={10} className="text-red-500 mx-1" fill="currentColor" /> bởi Team Foxy
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
