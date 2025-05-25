import { useState } from "react";
import { Plus } from "lucide-react";
import AddressList from "./AddressList";
import AddressFormModal from "./AddressFormModal";
import EditAddressModal from "./EditAddressModal";
export default function Address() {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Nguyễn Đức Duy",
      phone: "(+84) 865 540 300",
      addressLine1: "35 Nga Khê",
      addressLine2: "Xã Nguyễn Lý, Huyện Lý Nhân, Hà Nam",
      isDefault: true,
    },
    {
      id: 2,
      name: "Nguyễn Đức Duy",
      phone: "(+84) 865 540 300",
      addressLine1: "Miểu Tu Hoàng, 35/41, Tu Hoàng",
      addressLine2: "Phường Phương Canh, Quận Nam Từ Liêm, Hà Nội",
      isDefault: false,
    },
  ]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editAddress, setEditAddress] = useState(null);

  const handleEditAddress = (address) => {
    setEditAddress({ ...address });
    setShowEditModal(true);
  };

  const handleSaveEditAddress = () => {
    setAddresses(prev =>
      prev.map(addr =>
        addr.id === editAddress.id
          ? {
            ...editAddress,
            isDefault: editAddress.isDefault
          }
          : {
            ...addr,
            isDefault: editAddress.isDefault ? false : addr.isDefault
          }
      )
    );
    setShowEditModal(false);
  };
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddAddress = (newAddress, isDefault) => {
    const newId = addresses.length ? Math.max(...addresses.map(a => a.id)) + 1 : 1;

    const updatedList = isDefault
      ? addresses.map(a => ({ ...a, isDefault: false }))
      : [...addresses];

    const addressToAdd = {
      ...newAddress,
      id: newId,
      isDefault,
    };

    setAddresses([...updatedList, addressToAdd]);
    setShowAddModal(false);
  };

  const deleteAddress = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xoá địa chỉ này")) {
      setAddresses(addresses.filter(addr => addr.id !== id));
      alert("Xoá địa chỉ thành công");
    }
  };

  const setDefaultAddress = (id) => {
    if (!window.confirm("Bạn chắc chắn muốn thiết lập địa chỉ này mặc định")) {
      return;
    }
    alert("Thiết lập địa chỉ mặc định thành công")
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };

  return (
    <div className="w-full bg-white lg:pl-10 rounded-lg mt-10 relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Địa chỉ của tôi</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          <Plus className="w-5 h-5 mr-2" />
          <span>Thêm địa chỉ mới</span>
        </button>
      </div>

      <AddressList
        addresses={addresses}
        deleteAddress={deleteAddress}
        setDefaultAddress={setDefaultAddress}
        editAddress ={handleEditAddress}
      />

      {showAddModal && (
        <AddressFormModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAddAddress}
        />
      )}
      {showEditModal && (
  <EditAddressModal
    address={editAddress}
    onClose={() => setShowEditModal(false)}
    onChange={(updated) => setEditAddress(updated)}
    onSave={handleSaveEditAddress}
  />
)}
    </div>
  );
}
