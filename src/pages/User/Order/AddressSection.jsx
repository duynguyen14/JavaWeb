export default function AddressSection() {
  return (
    <div className="text-sm md:text-base">
      <h2 className="text-lg font-semibold mb-2">Địa chỉ giao hàng</h2>
      <div className=" mb-2 rounded-tl-3xl rounded-br-3xl border-[1px] p-6 border-gray-300">
        <div className=" mb-4">
            <span className="font-bold">duyên (Cơ quan)</span>
            <span className="ml-4 text-blue-600 cursor-pointer">Chọn địa chỉ khác</span>
        </div>
        <div className="  text-gray-700">
            <p className="mb-4">Điện thoại: 0865540300</p>
            <p>Địa chỉ: kim chung hoài đức, Kim Chung, Hoài Đức, Hà Nội</p>
        </div>
      </div>
      <button className="mt-4 px-3 py-2 md:px-5 md:py-3 btn-secondary ">+ THÊM ĐỊA CHỈ</button>
    </div>
  );
}
