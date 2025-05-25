// components/EditAddressModal.jsx
import React from "react";
import { X } from "lucide-react";

const EditAddressModal = ({
  address,
  onClose,
  onChange,
  onSave
}) => {
  if (!address) return null;

  return (
    <div className="fixed inset-0 bg-gray-300 opacity-95 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-xl font-medium mb-6">Cập nhật địa chỉ</h2>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Họ và tên"
              className="border border-gray-300 rounded p-2 w-full"
              value={address.name}
              onChange={(e) =>
                onChange({ ...address, name: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Số điện thoại"
              className="border border-gray-300 rounded p-2 w-full"
              value={address.phone}
              onChange={(e) =>
                onChange({ ...address, phone: e.target.value })
              }
            />
          </div>

          <input
            type="text"
            placeholder="Tỉnh/Thành phố"
            className="border border-gray-300 rounded p-2 w-full"
            value={address.addressLine2}
            onChange={(e) =>
              onChange({ ...address, addressLine2: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Địa chỉ cụ thể"
            className="border border-gray-300 rounded p-2 w-full"
            value={address.addressLine1}
            onChange={(e) =>
              onChange({ ...address, addressLine1: e.target.value })
            }
          />

          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              id="editDefaultAddress"
              checked={address.isDefault}
              onChange={(e) =>
                onChange({ ...address, isDefault: e.target.checked })
              }
              className="mr-2"
            />
            <label
              htmlFor="editDefaultAddress"
              className="text-sm text-gray-700"
            >
              Đặt làm địa chỉ mặc định
            </label>
          </div>

          <button
            onClick={onSave}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded mt-4"
          >
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditAddressModal;
