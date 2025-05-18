import React, { useState } from "react";
import { Star, Check, X, Eye, EyeOff, MessageCircle } from "lucide-react";

// Mock data
const mockFeedbacks = [
  {
    ReviewId: 1,
    UserName: "Nguyễn Văn A",
    ProductName: "Áo sơ mi trắng",
    Rating: 5,
    Comment: "Sản phẩm rất đẹp, chất lượng tốt!",
    Status: "Chờ duyệt", // Chờ duyệt | Đã duyệt | Đã ẩn | Từ chối
    Reply: "",
  },
  {
    ReviewId: 2,
    UserName: "Trần Thị B",
    ProductName: "Quần jean xanh",
    Rating: 3,
    Comment: "Vải ổn, giao hàng hơi chậm.",
    Status: "Đã duyệt",
    Reply: "Cảm ơn bạn đã góp ý, shop sẽ cải thiện giao hàng.",
  },
  {
    ReviewId: 3,
    UserName: "Lê Văn C",
    ProductName: "Váy hoa",
    Rating: 1,
    Comment: "Không giống hình, thất vọng.",
    Status: "Đã ẩn",
    Reply: "",
  },
];

function FeedbackManagement() {
  const [feedbacks, setFeedbacks] = useState(mockFeedbacks);
  const [filterRating, setFilterRating] = useState("");
  const [replyModal, setReplyModal] = useState({ open: false, review: null, value: "" });

  // Lọc theo số sao
  const filteredFeedbacks = feedbacks.filter(
    (f) => (filterRating ? f.Rating === Number(filterRating) : true)
  );

  // Duyệt đánh giá
  const handleApprove = (reviewId) => {
    setFeedbacks(feedbacks.map(f =>
      f.ReviewId === reviewId ? { ...f, Status: "Đã duyệt" } : f
    ));
  };

  // Từ chối đánh giá
  const handleReject = (reviewId) => {
    setFeedbacks(feedbacks.map(f =>
      f.ReviewId === reviewId ? { ...f, Status: "Từ chối" } : f
    ));
  };

  // Ẩn/hiện đánh giá
  const handleToggleHide = (reviewId) => {
    setFeedbacks(feedbacks.map(f =>
      f.ReviewId === reviewId
        ? { ...f, Status: f.Status === "Đã ẩn" ? "Đã duyệt" : "Đã ẩn" }
        : f
    ));
  };

  // Mở modal trả lời
  const openReplyModal = (review) => {
    setReplyModal({ open: true, review, value: review.Reply || "" });
  };

  // Đóng modal trả lời
  const closeReplyModal = () => {
    setReplyModal({ open: false, review: null, value: "" });
  };

  // Gửi trả lời
  const handleReply = (e) => {
    e.preventDefault();
    setFeedbacks(feedbacks.map(f =>
      f.ReviewId === replyModal.review.ReviewId
        ? { ...f, Reply: replyModal.value }
        : f
    ));
    closeReplyModal();
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold">Quản lý đánh giá</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Lọc theo sao:</span>
          <select
            value={filterRating}
            onChange={e => setFilterRating(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="">Tất cả</option>
            {[5, 4, 3, 2, 1].map(star => (
              <option key={star} value={star}>{star} sao</option>
            ))}
          </select>
        </div>
      </div>
      <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-indigo-50 text-indigo-700">
            <tr>
              <th className="p-3 font-semibold">Người dùng</th>
              <th className="p-3 font-semibold">Sản phẩm</th>
              <th className="p-3 font-semibold">Số sao</th>
              <th className="p-3 font-semibold">Nội dung</th>
              <th className="p-3 font-semibold">Trạng thái</th>
              <th className="p-3 font-semibold">Trả lời</th>
              <th className="p-3 text-center font-semibold">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredFeedbacks.map(fb => (
              <tr key={fb.ReviewId} className="border-t hover:bg-indigo-50 transition">
                <td className="p-3">{fb.UserName}</td>
                <td className="p-3">{fb.ProductName}</td>
                <td className="p-3 flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < fb.Rating ? "text-yellow-400" : "text-gray-300"}
                      fill={i < fb.Rating ? "currentColor" : "none"}
                    />
                  ))}
                </td>
                <td className="p-3">{fb.Comment}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold
                    ${fb.Status === "Đã duyệt"
                      ? "bg-green-100 text-green-700"
                      : fb.Status === "Chờ duyệt"
                      ? "bg-yellow-100 text-yellow-700"
                      : fb.Status === "Đã ẩn"
                      ? "bg-gray-200 text-gray-700"
                      : "bg-red-100 text-red-700"
                    }`}>
                    {fb.Status}
                  </span>
                </td>
                <td className="p-3">
                  {fb.Reply ? (
                    <span className="text-green-700">{fb.Reply}</span>
                  ) : (
                    <span className="text-gray-400 italic">Chưa trả lời</span>
                  )}
                </td>
                <td className="p-3 flex flex-wrap gap-1 justify-center">
                  {fb.Status === "Chờ duyệt" && (
                    <>
                      <button
                        className="text-green-600 hover:text-green-800 p-2 rounded-full hover:bg-green-100 transition"
                        title="Duyệt"
                        onClick={() => handleApprove(fb.ReviewId)}
                      >
                        <Check size={18} />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-100 transition"
                        title="Từ chối"
                        onClick={() => handleReject(fb.ReviewId)}
                      >
                        <X size={18} />
                      </button>
                    </>
                  )}
                  {fb.Status === "Đã duyệt" && (
                    <button
                      className="text-gray-600 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100 transition"
                      title="Ẩn đánh giá"
                      onClick={() => handleToggleHide(fb.ReviewId)}
                    >
                      <EyeOff size={18} />
                    </button>
                  )}
                  {fb.Status === "Đã ẩn" && (
                    <button
                      className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-100 transition"
                      title="Hiện đánh giá"
                      onClick={() => handleToggleHide(fb.ReviewId)}
                    >
                      <Eye size={18} />
                    </button>
                  )}
                  <button
                    className="text-indigo-600 hover:text-indigo-800 p-2 rounded-full hover:bg-indigo-100 transition"
                    title="Trả lời"
                    onClick={() => openReplyModal(fb)}
                  >
                    <MessageCircle size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {filteredFeedbacks.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center p-4 text-gray-500">
                  Không tìm thấy đánh giá.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Modal trả lời đánh giá */}
      {replyModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10 backdrop-blur-[2px] transition-all">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative animate-fade-in">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
              onClick={closeReplyModal}
              aria-label="Đóng"
            >
              <X size={22} />
            </button>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <MessageCircle size={22} /> Trả lời đánh giá
            </h3>
            <form onSubmit={handleReply} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nội dung trả lời</label>
                <textarea
                  value={replyModal.value}
                  onChange={e => setReplyModal(r => ({ ...r, value: e.target.value }))}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 bg-indigo-50"
                  rows={3}
                  required
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                  onClick={closeReplyModal}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition font-semibold"
                >
                  Gửi trả lời
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Dữ liệu mock đã bám sát database của bạn:
      - ReviewId (bảng REVIEW)
      - UserName (từ bảng USERS, join qua UserId)
      - ProductName (từ bảng PRODUCT, join qua ProductId)
      - Rating, Comment, Reply (bảng REVIEW, Reply là mở rộng cho chức năng quản trị)
      - Status (không có trong bảng gốc, nhưng thực tế nên có để quản trị duyệt/ẩn, có thể thêm cột Status vào bảng REVIEW nếu cần)
      - Lọc theo số sao (Rating), duyệt, ẩn, trả lời đều đúng nghiệp vụ quản trị đánh giá.

      Nếu muốn đúng 100% database, bạn chỉ cần đổi tên trường cho đúng với bảng REVIEW, USERS, PRODUCT khi kết nối API thực tế.
      Hiện tại mock đã phản ánh đúng cấu trúc và nghiệp vụ quản trị đánh giá theo database bạn gửi. */}
    </div>
  );
}

export default FeedbackManagement;
