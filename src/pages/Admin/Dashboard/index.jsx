import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';
import {
  ShoppingBag, Users, DollarSign, TrendingUp, Star, Truck, Package, BarChart2, LineChart as LineChartIcon, AreaChart as AreaChartIcon, PieChart as PieChartIcon
} from 'lucide-react';

// Dữ liệu mẫu (tối thiểu, sẽ được thay thế bởi API)
const dailyData = [
  { name: '01/05', value: 2500 },
  { name: '02/05', value: 3200 },
  { name: '03/05', value: 2800 },
  { name: '04/05', value: 3800 },
  { name: '05/05', value: 4200 },
  { name: '06/05', value: 3600 },
  { name: '07/05', value: 4500 },
];

const monthlyData = [
  { name: 'T1', value: 62000 },
  { name: 'T2', value: 79000 },
  { name: 'T3', value: 85000 },
  { name: 'T4', value: 91000 },
];

const quarterlyData = [
  { name: 'Q1', value: 226000 },
  { name: 'Q2', value: 304000 },
];

const categoryData = [
  { name: 'Áo', value: 35 },
  { name: 'Quần', value: 25 },
  { name: 'Giày', value: 20 },
  { name: 'Phụ kiện', value: 20 },
];

const categorySalesData = [
  { name: 'Áo', value: 42000 },
  { name: 'Quần', value: 35000 },
  { name: 'Giày', value: 28000 },
  { name: 'Phụ kiện', value: 15000 },
];

const recentOrders = [
  { id: '#5036', customer: 'Nguyễn Văn A', date: '08/05/2025', amount: '2,300,000 đ', status: 'Hoàn thành' },
  { id: '#5035', customer: 'Trần Thị B', date: '07/05/2025', amount: '1,750,000 đ', status: 'Đang xử lý' },
];

const customerComments = [
  {
    name: 'Minh Anh',
    avatar: '/api/placeholder/40/40',
    date: '07/05/2025',
    comment: 'Áo sơ mi chất lượng tốt, vải mát, đường may đẹp. Mình rất hài lòng với sản phẩm này.',
    rating: 5,
    product: 'Áo sơ mi trắng FOXY'
  },
  {
    name: 'Thanh Hà',
    avatar: '/api/placeholder/40/40',
    date: '06/05/2025',
    comment: 'Quần jean rất đẹp và đúng kích thước. Giao hàng nhanh.',
    rating: 4,
    product: 'Quần jean nữ cạp cao'
  },
  {
    name: 'Hồng Nhung',
    avatar: '/api/placeholder/40/40',
    date: '05/05/2025',
    comment: 'Túi xách đẹp, chất liệu tốt nhưng màu hơi khác một chút so với hình.',
    rating: 4,
    product: 'Túi xách Mini FOXY'
  },
];

const bestSellers = [
  {
    name: 'Áo sơ mi trắng FOXY',
    image: '/api/placeholder/80/80',
    sold: 124,
    price: '450,000 đ',
    category: 'Áo'
  },
  {
    name: 'Quần jean nữ cạp cao',
    image: '/api/placeholder/80/80',
    sold: 98,
    price: '650,000 đ',
    category: 'Quần'
  },
  {
    name: 'Giày thể thao FOXY AIR',
    image: '/api/placeholder/80/80',
    sold: 87,
    price: '850,000 đ',
    category: 'Giày'
  },
];

const newProducts = [
  {
    name: 'Áo polo FOXY Summer',
    image: '/api/placeholder/80/80',
    date: '05/05/2025',
    price: '380,000 đ',
    category: 'Áo'
  },
  {
    name: 'Váy hoa FOXY Blossom',
    image: '/api/placeholder/80/80',
    date: '04/05/2025',
    price: '550,000 đ',
    category: 'Váy'
  },
];

const featuredProducts = [
  {
    name: 'Bộ sưu tập Hè 2025',
    image: '/api/placeholder/320/150',
    description: 'Những thiết kế mới nhất cho mùa hè sôi động'
  },
  {
    name: 'Bộ sưu tập công sở',
    image: '/api/placeholder/320/150',
    description: 'Lịch lãm và chuyên nghiệp cho môi trường làm việc'
  },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// Thêm gradient cho biểu đồ
const GradientDefs = () => (
  <defs>
    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#a78bfa" />
      <stop offset="100%" stopColor="#6366f1" />
    </linearGradient>
    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.8} />
      <stop offset="95%" stopColor="#6366f1" stopOpacity={0.2} />
    </linearGradient>
    <linearGradient id="barCategoryGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#34d399" />
      <stop offset="100%" stopColor="#10b981" />
    </linearGradient>
  </defs>
);

export default function Dashboard() {
  // State cho các loại biểu đồ
  const [salesTimeFrame, setSalesTimeFrame] = useState('monthly');
  const [salesChartType, setSalesChartType] = useState('bar');
  const [categoryView, setCategoryView] = useState('distribution');

  // Chọn dữ liệu dựa trên khung thời gian
  const getSalesData = () => {
    switch (salesTimeFrame) {
      case 'daily':
        return dailyData;
      case 'quarterly':
        return quarterlyData;
      case 'monthly':
      default:
        return monthlyData;
    }
  };

  // Chọn dữ liệu dựa trên loại danh mục
  const getCategoryData = () => {
    return categoryView === 'distribution' ? categoryData : categorySalesData;
  };

  // Render biểu đồ doanh thu dựa trên loại đã chọn
  const renderSalesChart = () => {
    const data = getSalesData();

    switch (salesChartType) {
      case 'line':
        return (
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <GradientDefs />
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => new Intl.NumberFormat('vi-VN').format(value) + ' đ'} />
            <Legend />
            {/* Sửa stroke về màu HEX, không dùng gradient */}
            <Line type="monotone" dataKey="value" name="Doanh thu" stroke="#a78bfa" strokeWidth={3} dot={{ r: 5, fill: "#a78bfa" }} activeDot={{ r: 8 }} animationDuration={800} />
          </LineChart>
        );
      case 'area':
        return (
          <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <GradientDefs />
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => new Intl.NumberFormat('vi-VN').format(value) + ' đ'} />
            <Legend />
            <Area type="monotone" dataKey="value" name="Doanh thu" stroke="#a78bfa" fill="url(#areaGradient)" strokeWidth={2} animationDuration={800} />
          </AreaChart>
        );
      case 'bar':
      default:
        return (
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <GradientDefs />
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => new Intl.NumberFormat('vi-VN').format(value) + ' đ'} />
            <Legend />
            {/* Sử dụng màu HEX trực tiếp và barSize để đảm bảo hiển thị */}
            <Bar dataKey="value" name="Doanh thu" fill="#a78bfa" radius={[8, 8, 0, 0]} barSize={40} animationDuration={800} />
          </BarChart>
        );
    }
  };

  // Render biểu đồ danh mục (chỉ cho phép BarChart/PieChart)
  const renderCategoryChart = () => {
    const data = getCategoryData();
    if (categoryView === 'distribution') {
      return (
        <PieChart>
          <GradientDefs />
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={90}
            fill="#a78bfa"
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            isAnimationActive={true}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value}%`} />
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            wrapperStyle={{ fontSize: 14, marginTop: 10 }}
          />
        </PieChart>
      );
    }
    // categoryView === 'sales'
    return (
      <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <GradientDefs />
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(value) => new Intl.NumberFormat('vi-VN').format(value) + ' đ'} />
        <Legend />
        <Bar dataKey="value" name="Doanh thu" fill="#34d399" radius={[8, 8, 0, 0]} barSize={40} animationDuration={800} />
      </BarChart>
    );
  };

  // Render nút chuyển đổi dạng biểu đồ với icon
  const chartTypes = [
    { key: 'bar', icon: <BarChart2 className="w-5 h-5" />, label: 'Cột' },
    { key: 'line', icon: <LineChartIcon className="w-5 h-5" />, label: 'Đường' },
    { key: 'area', icon: <AreaChartIcon className="w-5 h-5" />, label: 'Vùng' }
  ];

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-100 min-h-screen p-4">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-5 flex items-center transition-transform hover:-translate-y-1 hover:shadow-2xl">
          <div className="rounded-full bg-blue-100 p-3 mr-4">
            <DollarSign className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Doanh thu</p>
            <p className="text-2xl font-semibold">127,000,000 đ</p>
            <p className="text-green-500 text-xs">↑ 12.5% so với tháng trước</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-5 flex items-center transition-transform hover:-translate-y-1 hover:shadow-2xl">
          <div className="rounded-full bg-purple-100 p-3 mr-4">
            <ShoppingBag className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Đơn hàng</p>
            <p className="text-2xl font-semibold">430</p>
            <p className="text-green-500 text-xs">↑ 8.2% so với tháng trước</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-5 flex items-center transition-transform hover:-translate-y-1 hover:shadow-2xl">
          <div className="rounded-full bg-yellow-100 p-3 mr-4">
            <Users className="h-6 w-6 text-yellow-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Khách hàng mới</p>
            <p className="text-2xl font-semibold">256</p>
            <p className="text-green-500 text-xs">↑ 5.3% so với tháng trước</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-5 flex items-center transition-transform hover:-translate-y-1 hover:shadow-2xl">
          <div className="rounded-full bg-green-100 p-3 mr-4">
            <TrendingUp className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Tỷ lệ chuyển đổi</p>
            <p className="text-2xl font-semibold">3.2%</p>
            <p className="text-red-500 text-xs">↓ 0.5% so với tháng trước</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Sales Chart with controls */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-purple-700">Biểu đồ doanh thu</h2>
            <div className="flex items-center space-x-2">
              <select
                className="border rounded px-2 py-1 text-sm focus:ring-2 focus:ring-purple-400"
                value={salesTimeFrame}
                onChange={(e) => setSalesTimeFrame(e.target.value)}
              >
                <option value="daily">Theo ngày</option>
                <option value="monthly">Theo tháng</option>
                <option value="quarterly">Theo quý</option>
              </select>
              <div className="flex space-x-1 ml-2">
                {chartTypes.map((type) => (
                  <button
                    key={type.key}
                    className={`p-2 rounded-full border transition-all duration-200 flex items-center justify-center
                      ${salesChartType === type.key
                        ? 'bg-purple-600 text-white border-purple-600 shadow'
                        : 'bg-gray-100 text-purple-600 border-transparent hover:bg-purple-100'}`}
                    onClick={() => setSalesChartType(type.key)}
                    title={`Biểu đồ ${type.label}`}
                  >
                    {type.icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              {renderSalesChart()}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Chart with controls */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-purple-700">Phân tích danh mục</h2>
            <select
              className="border rounded px-2 py-1 text-sm focus:ring-2 focus:ring-purple-400"
              value={categoryView}
              onChange={(e) => setCategoryView(e.target.value)}
            >
              <option value="distribution">Phân bố sản phẩm</option>
              <option value="sales">Doanh thu theo danh mục</option>
            </select>
          </div>
          <div className="h-72 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              {renderCategoryChart()}
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-purple-700 mb-4">Bộ sưu tập nổi bật</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredProducts.map((product, index) => (
            <div key={index} className="bg-gray-50 rounded-lg overflow-hidden flex flex-col">
              <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                <p className="text-gray-600">{product.description}</p>
                <button className="mt-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md px-4 py-2 text-sm">Xem chi tiết</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Products Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Best Selling Products */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-purple-700">Sản phẩm bán chạy</h2>
            <button className="text-purple-600 text-sm hover:underline">Xem tất cả</button>
          </div>
          <div className="space-y-4">
            {bestSellers.map((product, index) => (
              <div key={index} className="flex items-center border-b pb-4 last:border-0 last:pb-0">
                <img src={product.image} alt={product.name} className="w-16 h-16 rounded object-cover mr-4" />
                <div className="flex-1">
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.category}</p>
                  <div className="flex justify-between mt-1">
                    <span className="text-purple-600 font-medium">{product.price}</span>
                    <span className="text-gray-500 text-sm flex items-center">
                      <ShoppingBag className="h-4 w-4 mr-1" />
                      {product.sold} đã bán
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* New Products */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-purple-700">Sản phẩm mới</h2>
            <button className="text-purple-600 text-sm hover:underline">Xem tất cả</button>
          </div>
          <div className="space-y-4">
            {newProducts.map((product, index) => (
              <div key={index} className="flex items-center border-b pb-4 last:border-0 last:pb-0">
                <div className="relative">
                  <img src={product.image} alt={product.name} className="w-16 h-16 rounded object-cover mr-4" />
                  <span className="absolute top-0 left-0 bg-green-500 text-white text-xs px-1 rounded">Mới</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.category}</p>
                  <div className="flex justify-between mt-1">
                    <span className="text-purple-600 font-medium">{product.price}</span>
                    <span className="text-gray-500 text-sm">{product.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Orders Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-purple-700">Đơn hàng gần đây</h2>
            <button className="text-purple-600 text-sm hover:underline">Xem tất cả</button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khách hàng</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá trị</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentOrders.map((order, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-purple-600">{order.id}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{order.customer}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{order.amount}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${order.status === 'Hoàn thành' ? 'bg-green-100 text-green-800' :
                          order.status === 'Đang xử lý' ? 'bg-yellow-100 text-yellow-800' :
                            order.status === 'Đã giao' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Shipping Status */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-purple-700 mb-4">Trạng thái vận chuyển</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center">
                <div className="rounded-full bg-blue-100 p-2 mr-3">
                  <Truck className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Đang vận chuyển</p>
                  <p className="text-sm text-gray-500">19 đơn hàng</p>
                </div>
              </div>
              <span className="text-blue-600 font-medium">24%</span>
            </div>

            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center">
                <div className="rounded-full bg-yellow-100 p-2 mr-3">
                  <Package className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="font-medium">Đang xử lý</p>
                  <p className="text-sm text-gray-500">34 đơn hàng</p>
                </div>
              </div>
              <span className="text-yellow-600 font-medium">42%</span>
            </div>

            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center">
                <div className="rounded-full bg-green-100 p-2 mr-3">
                  <ShoppingBag className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Đã giao hàng</p>
                  <p className="text-sm text-gray-500">27 đơn hàng</p>
                </div>
              </div>
              <span className="text-green-600 font-medium">34%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Comments */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-purple-700">Đánh giá từ khách hàng</h2>
          <button className="text-purple-600 text-sm hover:underline">Xem tất cả</button>
        </div>
        <div className="space-y-4">
          {customerComments.map((comment, index) => (
            <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
              <div className="flex items-center mb-2">
                <img src={comment.avatar} alt={comment.name} className="w-10 h-10 rounded-full mr-3" />
                <div>
                  <p className="font-semibold">{comment.name}</p>
                  <div className="flex items-center text-sm">
                    <div className="flex mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < comment.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill={i < comment.rating ? 'currentColor' : 'none'} />
                      ))}
                    </div>
                    <span className="text-gray-500">{comment.date}</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">{comment.comment}</p>
              <p className="text-xs text-purple-600">Sản phẩm: {comment.product}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}