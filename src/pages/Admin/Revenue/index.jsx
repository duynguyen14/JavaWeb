import React, { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell
} from "recharts";
import { Filter, Download } from "lucide-react";

// Mock data
const mockCategories = [
  { CategoryId: 1, Name: "Áo" },
  { CategoryId: 2, Name: "Quần" },
  { CategoryId: 3, Name: "Giày" },
];
const mockRegions = [
  { id: "hn", name: "Hà Nội" },
  { id: "hcm", name: "Hồ Chí Minh" },
  { id: "dn", name: "Đà Nẵng" },
];
const monthlyRevenue = [
  { name: "T1", revenue: 12000000 },
  { name: "T2", revenue: 15000000 },
  { name: "T3", revenue: 18000000 },
  { name: "T4", revenue: 21000000 },
  { name: "T5", revenue: 17000000 },
  { name: "T6", revenue: 22000000 },
  { name: "T7", revenue: 25000000 },
  { name: "T8", revenue: 23000000 },
  { name: "T9", revenue: 20000000 },
  { name: "T10", revenue: 24000000 },
  { name: "T11", revenue: 26000000 },
  { name: "T12", revenue: 30000000 },
];
const quarterlyRevenue = [
  { name: "Q1", revenue: 45000000 },
  { name: "Q2", revenue: 60000000 },
  { name: "Q3", revenue: 68000000 },
  { name: "Q4", revenue: 80000000 },
];
const yearlyRevenue = [
  { name: "2022", revenue: 200000000 },
  { name: "2023", revenue: 250000000 },
  { name: "2024", revenue: 320000000 },
];
const bestSellers = [
  { name: "Áo sơ mi trắng", sold: 320 },
  { name: "Quần jean xanh", sold: 270 },
  { name: "Váy hoa", sold: 210 },
  { name: "Giày thể thao", sold: 180 },
  { name: "Áo thun basic", sold: 150 },
];

const COLORS = ["#6366f1", "#34d399", "#fbbf24", "#f472b6", "#a78bfa"];

function RevenueManagement() {
  const [chartType, setChartType] = useState("bar"); // bar | line | area
  const [timeFrame, setTimeFrame] = useState("month"); // month | quarter | year
  const [filter, setFilter] = useState({
    category: "",
    region: "",
    year: "2024",
  });

  // Lấy dữ liệu theo khung thời gian
  const getRevenueData = () => {
    if (timeFrame === "month") return monthlyRevenue;
    if (timeFrame === "quarter") return quarterlyRevenue;
    return yearlyRevenue;
  };

  // Xuất báo cáo (demo)
  const handleExport = () => {
    // TODO: Thực tế sẽ xuất file Excel/PDF
    alert("Đã xuất báo cáo doanh thu (demo)");
  };

  // Render biểu đồ doanh thu
  const renderRevenueChart = () => {
    const data = getRevenueData();
    if (chartType === "line") {
      return (
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={v => v.toLocaleString("vi-VN") + " đ"} />
          <Legend />
          <Line type="monotone" dataKey="revenue" name="Doanh thu" stroke="#6366f1" strokeWidth={3} dot={{ r: 5, fill: "#a78bfa" }} />
        </LineChart>
      );
    }
    if (chartType === "area") {
      return (
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={v => v.toLocaleString("vi-VN") + " đ"} />
          <Legend />
          <Area type="monotone" dataKey="revenue" name="Doanh thu" stroke="#a78bfa" fill="#c7d2fe" strokeWidth={2} />
        </AreaChart>
      );
    }
    // bar
    return (
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={v => v.toLocaleString("vi-VN") + " đ"} />
        <Legend />
        <Bar dataKey="revenue" name="Doanh thu" fill="#6366f1" radius={[8, 8, 0, 0]} barSize={40} />
      </BarChart>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 py-8 px-2">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h2 className="text-3xl font-bold text-indigo-700">Quản lý doanh thu</h2>
          <button
            className="flex items-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2 rounded-xl shadow hover:scale-105 transition-all font-semibold"
            onClick={handleExport}
          >
            <Download size={20} className="mr-2" /> Xuất báo cáo
          </button>
        </div>
        {/* Bộ lọc */}
        <div className="flex flex-wrap gap-4 mb-6 items-end bg-white rounded-xl shadow p-4">
          <div>
            <label className="block text-xs font-semibold mb-1 text-indigo-700">Khung thời gian</label>
            <select
              value={timeFrame}
              onChange={e => setTimeFrame(e.target.value)}
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400"
            >
              <option value="month">Theo tháng</option>
              <option value="quarter">Theo quý</option>
              <option value="year">Theo năm</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1 text-indigo-700">Năm</label>
            <select
              value={filter.year}
              onChange={e => setFilter(f => ({ ...f, year: e.target.value }))}
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400"
            >
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1 text-indigo-700">Danh mục</label>
            <select
              value={filter.category}
              onChange={e => setFilter(f => ({ ...f, category: e.target.value }))}
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">Tất cả</option>
              {mockCategories.map(c => (
                <option key={c.CategoryId} value={c.CategoryId}>{c.Name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1 text-indigo-700">Khu vực</label>
            <select
              value={filter.region}
              onChange={e => setFilter(f => ({ ...f, region: e.target.value }))}
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">Tất cả</option>
              {mockRegions.map(r => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1 text-indigo-700">Dạng biểu đồ</label>
            <select
              value={chartType}
              onChange={e => setChartType(e.target.value)}
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400"
            >
              <option value="bar">Cột</option>
              <option value="line">Đường</option>
              <option value="area">Vùng</option>
            </select>
          </div>
        </div>
        {/* Biểu đồ doanh thu */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-10">
          <h3 className="text-xl font-bold text-indigo-700 mb-4">Biểu đồ doanh thu</h3>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              {renderRevenueChart()}
            </ResponsiveContainer>
          </div>
        </div>
        {/* Sản phẩm bán chạy */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-xl font-bold text-indigo-700 mb-6">Top sản phẩm bán chạy</h3>
          <div className="flex flex-col md:flex-row gap-10">
            <div className="flex-1 flex items-center justify-center">
              <PieChart width={340} height={260}>
                <Pie
                  data={bestSellers}
                  dataKey="sold"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  labelLine={false}
                  label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                  isAnimationActive={true}
                >
                  {bestSellers.map((entry, idx) => (
                    <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend
                  verticalAlign="right"
                  align="right"
                  layout="vertical"
                  iconType="circle"
                  wrapperStyle={{ right: 0, top: 30, fontSize: 14 }}
                  formatter={(value) => <span style={{ color: "#6366f1", fontWeight: 500 }}>{value}</span>}
                />
              </PieChart>
            </div>
            <div className="flex-1">
              <table className="min-w-full text-base text-left">
                <thead>
                  <tr>
                    <th className="p-3 font-semibold text-indigo-700">Sản phẩm</th>
                    <th className="p-3 font-semibold text-indigo-700">Số lượng bán</th>
                  </tr>
                </thead>
                <tbody>
                  {bestSellers.map((item, idx) => (
                    <tr key={idx} className="border-b last:border-0">
                      <td className="p-3">{item.name}</td>
                      <td className="p-3">{item.sold}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RevenueManagement;
