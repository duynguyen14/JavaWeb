import { Pencil, Trash2, Star } from 'lucide-react';

export default function AddressItem({ address, onDelete, onSetDefault,onEdit  }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 p-6 mb-4">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
        {/* Address Information */}
        <div className="flex-1 space-y-3">
          {/* Name and Phone */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <h3 className="font-semibold text-gray-900 text-lg">{address.name}</h3>
            <span className="text-gray-600 font-medium">{address.phone}</span>
          </div>

          {/* Address Lines */}
          <div className="space-y-1">
            <p className="text-gray-700 leading-relaxed">{address.addressLine1}</p>
            {address.addressLine2 && (
              <p className="text-gray-700 leading-relaxed">{address.addressLine2}</p>
            )}
          </div>

          {/* Default Badge */}
          {address.isDefault && (
            <div className="pt-2">
              <span className="inline-flex items-center px-3 py-1.5 text-xs font-medium bg-blue-50 text-blue-600 border border-blue-200 rounded-full">
                <Star className="w-3 h-3 mr-1.5 fill-blue-500" />
                Mặc định
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center lg:items-end xl:items-center gap-3">
          {/* Action Links */}
          <div className="flex gap-4 order-2 sm:order-1 lg:order-2 xl:order-1">
            <button
              className="flex items-center gap-1 text-white bg-blue-500 cursor-pointer px-3 py-2 rounded-md font-medium transition-colors duration-200 hover:underline"
                onClick={onEdit}
            >
              <Pencil className="w-4 h-4" />
              Cập nhật
            </button>
            {!address.isDefault && (
              <button
                onClick={onDelete}
                className="flex items-center gap-1 text-white bg-red-500 cursor-pointer px-3 py-2 rounded-md  font-medium transition-colors duration-200 hover:underline"
              >
                <Trash2 className="w-4 h-4" />
                Xoá
              </button>
            )}
          </div>

        </div>
      </div>
      <div className='mt-5'>
          {!address.isDefault && (
            <button
              onClick={onSetDefault}
              className="cursor-pointer order-1 sm:order-2 lg:order-1 xl:order-2 inline-flex items-center gap-2 bg-white border border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700 font-medium px-5 py-2.5 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 whitespace-nowrap"
            >
              <Star className="w-4 h-4" />
              Thiết lập mặc định
            </button>
          )}
      </div>
          {/* Set Default Button */}
    </div>
  );
}
