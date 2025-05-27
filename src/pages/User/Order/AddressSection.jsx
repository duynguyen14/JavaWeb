export default function AddressSection({ addresses, selectedAddress, onSelectOther }) {
  const hasAddress = addresses && addresses.length > 0;
  const defaultAddress = selectedAddress
    || (hasAddress ? addresses.find(addr => addr.isDefault) || addresses[0] : null);

  return (
    <div className="text-sm md:text-base">
      {!hasAddress ? (
        <div className="flex justify-between px-5">
          <h2 className="text-lg font-semibold mb-2">Địa chỉ giao hàng</h2>
          <button className="btn-secondary px-4 py-3">
            Thiết lập địa chỉ
          </button>
        </div>
      ) : (
        <div className="mb-2 rounded-tl-3xl rounded-br-3xl border-[1px] p-6 border-gray-300">
          <h2 className="text-lg font-semibold mb-2">Địa chỉ giao hàng</h2>
          <div className="mb-4 flex items-center justify-between">
            <span className="font-bold">
              {defaultAddress.name} ({defaultAddress.city || "Nhà riêng"})
            </span>
            <button className="btn-secondary px-3 py-2 cursor-pointer" onClick={onSelectOther}>
              Chọn địa chỉ khác
            </button>
          </div>
          <div className="text-gray-700">
            <p className="mb-2">Điện thoại: {defaultAddress.phoneNumber}</p>
            <p>Địa chỉ: {defaultAddress.detailAddress}</p>
          </div>
        </div>
      )}
    </div>
  );
}
