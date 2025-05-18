import { useState } from "react";
import { Plus, X, MapPin } from "lucide-react";

export default function AddressComponent({isPopUp,setIsPopUp}) {
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
    {
      id: 3,
      name: "Nguyễn Đức Duy",
      phone: "(+84) 865 540 300",
      addressLine1: "Ngõ 35 phố tu hoàng",
      addressLine2: "Phường Phương Canh, Quận Nam Từ Liêm, Hà Nội",
      isDefault: false,
    },
    
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [addressType, setAddressType] = useState("Nhà Riêng");
  const [isDefault, setIsDefault] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: "",
    phone: "",
    province: "",
    addressDetail: ""
  });
  console.log(isPopUp)
  const handleOnCilckAdd=()=>{
    // setIsPopUp(true)
    setShowAddModal(true)
  }
  const handleAddAddress = () => {
    // Logic để thêm địa chỉ mới vào danh sách
    const newId = addresses.length ? Math.max(...addresses.map(a => a.id)) + 1 : 1;
    
    const addressToAdd = {
      id: newId,
      name: newAddress.name,
      phone: newAddress.phone,
      addressLine1: newAddress.addressDetail,
      addressLine2: newAddress.province,
      isDefault: isDefault,
    };
    
    // Nếu đặt làm mặc định, cập nhật các địa chỉ khác
    let updatedAddresses = [...addresses];
    if (isDefault) {
      updatedAddresses = updatedAddresses.map(addr => ({
        ...addr,
        isDefault: false
      }));
    }
    
    setAddresses([...updatedAddresses, addressToAdd]);
    setShowAddModal(false);
    resetForm();
  };

  const resetForm = () => {
    setNewAddress({
      name: "",
      phone: "",
      province: "",
      addressDetail: ""
    });
    setAddressType("Nhà Riêng");
    setIsDefault(false);
  };

  const setDefaultAddress = (id) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };

  const deleteAddress = (id) => {
    if(window.confirm("Bạn có chắc chắn muốn xoá địa chỉ này")){
      setAddresses(addresses.filter(addr => addr.id !== id));
      alert("Xoá địa chỉ thành công")
      return;
    }

  };

  return (
    <div className="w-full bg-white px-1 md:px-5 lg:px-0 lg:ml-10 rounded-lg mt-10 relative"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-xl font-medium md:text-3xl md:font-bold text-gray-800">Địa chỉ của tôi</h1>
        <button 
          onClick={() => handleOnCilckAdd()}
          className="flex items-center whitespace-nowrap bg-red-500 hover:bg-red-600 text-white px-3 sm:px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 flex-shrink-0" />
          <span className="text-sm sm:text-base">Thêm địa chỉ mới</span>
        </button>
      </div>

      <div className="mt-10">
        {addresses.map((address) => (
          <div
            key={address.id}
            className="py-4 border-b border-gray-200 flex flex-col md:flex-row md:justify-between"
          >
            <div className="space-y-1">
              <div className="flex items-center">
                <h3 className="font-medium text-gray-800">{address.name}</h3>
                <span className="text-gray-600 ml-4">{address.phone}</span>
              </div>
              <p className="text-gray-600">{address.addressLine1}</p>
              <p className="text-gray-600">{address.addressLine2}</p>
              
              {address.isDefault && (
                <span className="inline-block mt-2 px-3 py-1 text-xs border border-red-500 text-red-500 rounded">
                  Mặc định
                </span>
              )}
            </div>

            <div className="flex flex-col items-end mt-4 md:mt-0 space-y-2">
              <div className="flex space-x-2">
                <button className="text-blue-500 hover:underline">Cập nhật</button>
                {!address.isDefault && (
                  <button 
                    onClick={() => deleteAddress(address.id)}
                    className="text-blue-500 hover:underline"
                  >
                    Xóa
                  </button>
                )}
              </div>
              {!address.isDefault && (
                <button 
                  onClick={() => setDefaultAddress(address.id)}
                  className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded flex items-center justify-center whitespace-nowrap"
                >
                  Thiết lập mặc định
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal thêm địa chỉ mới */}
      {showAddModal && (
        <div className="fixed inset-0  bg-gray-100 opacity-95 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
            <button 
              onClick={() => setShowAddModal(false)}
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
                  className="border border-gray-300 rounded p-2 w-full"
                  value={newAddress.name}
                  onChange={(e) => setNewAddress({...newAddress, name: e.target.value})}
                />
                <input
                  type="text"
                  placeholder="Số điện thoại"
                  className="border border-gray-300 rounded p-2 w-full"
                  value={newAddress.phone}
                  onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})}
                />
              </div>
              
              <div className="relative">
                <select
                  className="border border-gray-300 rounded p-2 w-full appearance-none"
                  value={newAddress.province}
                  onChange={(e) => setNewAddress({...newAddress, province: e.target.value})}
                >
                  <option value="" disabled selected>Tỉnh/ Thành phố, Quận/Huyện, Phường/Xã</option>
                  <option value="Hà Nội">Hà Nội</option>
                  <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                  <option value="Đà Nẵng">Đà Nẵng</option>
                  <option value="Hải Phòng">Hải Phòng</option>
                  <option value="Hà Nam">Hà Nam</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              <input
                type="text"
                placeholder="Địa chỉ cụ thể"
                className="border border-gray-300 rounded p-2 w-full"
                value={newAddress.addressDetail}
                onChange={(e) => setNewAddress({...newAddress, addressDetail: e.target.value})}
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
                  <button
                    onClick={() => setAddressType("Nhà Riêng")}
                    className={`px-4 py-2 rounded border ${
                      addressType === "Nhà Riêng"
                        ? "border-red-500 text-red-500"
                        : "border-gray-300 text-gray-700"
                    }`}
                  >
                    Nhà Riêng
                  </button>
                  <button
                    onClick={() => setAddressType("Văn Phòng")}
                    className={`px-4 py-2 rounded border ${
                      addressType === "Văn Phòng"
                        ? "border-red-500 text-red-500"
                        : "border-gray-300 text-gray-700"
                    }`}
                  >
                    Văn Phòng
                  </button>
                </div>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="defaultAddress"
                  checked={isDefault}
                  onChange={() => setIsDefault(!isDefault)}
                  className="mr-2"
                />
                <label htmlFor="defaultAddress" className="text-gray-700 cursor-pointer">
                  Đặt làm địa chỉ mặc định
                </label>
              </div>
              
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded text-gray-700"
                >
                  Trở lại
                </button>
                <button
                  onClick={handleAddAddress}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Hoàn thành
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}