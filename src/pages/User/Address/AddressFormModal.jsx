import { useState } from "react";
import { X, MapPin } from "lucide-react";

export default function AddressFormModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    name: "",
    phoneNumber: "",
    city: "",
    detailAddress: "",
    isDefault: false,
  });
  const [addressType, setAddressType] = useState("Nhà Riêng");

  const handleSave = () => {
    onSave({
      name: form.name,
      phoneNumber: form.phoneNumber,
      city: form.city,
      detailAddress: form.detailAddress,
      isDefault: form.isDefault,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Lớp nền mờ */}
      <div
        className="absolute inset-0 bg-secondary opacity-70"
        onClick={onClose}
      ></div>

      {/* Nội dung form */}
      <div className="relative bg-white rounded-lg w-full max-w-md p-6 z-10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-xl font-medium mb-6">Địa chỉ mới</h2>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Họ và tên"
              className="border border-gray-300 rounded p-2"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Số điện thoại"
              className="border border-gray-300 rounded p-2"
              value={form.phoneNumber}
              onChange={(e) =>
                setForm({ ...form, phoneNumber: e.target.value })
              }
            />
          </div>

          <select
            className="border border-gray-300 rounded p-2 w-full"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
          >
            <option value="" disabled>
              Chọn tỉnh/thành
            </option>
            <option value="Hà Nội">Hà Nội</option>
            <option value="Hồ Chí Minh">Hồ Chí Minh</option>
            <option value="Đà Nẵng">Đà Nẵng</option>
            <option value="Hải Phòng">Hải Phòng</option>
            <option value="Hà Nam">Hà Nam</option>
          </select>

          <input
            type="text"
            placeholder="Địa chỉ cụ thể"
            className="border border-gray-300 rounded p-2 w-full"
            value={form.detailAddress}
            onChange={(e) =>
              setForm({ ...form, detailAddress: e.target.value })
            }
          />

          <div className="h-32 bg-gray-100 rounded flex items-center justify-center">
            <button className="flex items-center text-gray-500">
              <MapPin className="w-5 h-5 mr-2" />
              <span>Thêm vị trí</span>
            </button>
          </div>

          <div>
            <p className="font-medium mb-2">Loại địa chỉ:</p>
            <div className="flex space-x-4">
              {["Nhà Riêng", "Văn Phòng"].map((type) => (
                <button
                  key={type}
                  onClick={() => setAddressType(type)}
                  className={`px-4 py-2 rounded border ${
                    addressType === type
                      ? "border-red-500 text-red-500"
                      : "border-gray-300 text-gray-700"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={form.isDefault}
              onChange={(e) =>
                setForm({ ...form, isDefault: e.target.checked })
              }
            />
            <span>Đặt làm địa chỉ mặc định</span>
          </label>

          <button
            onClick={handleSave}
            className="bg-red-500 hover:bg-red-600 text-white w-full py-2 rounded-lg mt-4"
          >
            Lưu địa chỉ
          </button>
        </div>
      </div>
    </div>
  );
}
