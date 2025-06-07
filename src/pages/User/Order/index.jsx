import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CheckoutSteps from '../CartShopping/CheckoutSteps';
import AddressSection from './AddressSection';
import OrderSummary from './OrderSummary';
import ListProduct from './ListProduct';
import { request } from '../../../untils/request';
import AddressFormModal from '../Address/AddressFormModal';
import ListAddressPopUp from '../../../components/Popups/ListAddressPopUp';

function Order() {
  const location = useLocation();
  const data = location.state?.products || [];
  const [products, setProduct] = useState(data);
  const [addresses, setAddresses] = useState([]);
  const token = localStorage.getItem('token');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showSelectModal, setShowSelectModal] = useState(false);
  const [productSizeDTOs, setProductSizeDTOs] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('COD'); // Thêm state cho phương thức thanh toán
  const navigate = useNavigate();

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
    setShowSelectModal(false);
  };

  console.log("data ", data);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await request.get('address', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);
        setAddresses(response.data.result); 
        if (response.data.result.length > 0 && !selectedAddress) {
          setSelectedAddress(response.data.result.find(address => address.isDefault == true) || response.data.result[0]);
        }
      } catch (e) {
        console.log('error', e);
      }
    };

    fetchAddresses();
    const dtos = data.map(item => ({
      productSizeId: item.productSizeId,
      sizeName: item.sizeName,
      quantity: item.quantity,
    }))
    setProductSizeDTOs(dtos);
  }, [token]);

  const handleAddAddress = async (newAddress) => {
    try {
      const response = await request.post('address', newAddress, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Thêm địa chỉ thành công');
      setAddresses(response.data.result);
      setShowAddModal(false);
      setSelectedAddress(response.data.result[0])
    } catch (e) {
      console.log('error', e);
    }
  };

  console.log("address ", selectedAddress);

  const total = () => {
    return products.reduce((sum, product) => sum + product.price * product.quantity, 0);
  };

  const handleOnclickOrder = async () => {
    if (!window.confirm("Xác nhận đơn đặt hàng")) {
      return;
    }
    try {
      const response = await request.post("bill/create",
        {
          productSizeDTOs: productSizeDTOs,
          addressId: selectedAddress.id,
          paymentMethod: selectedPaymentMethod, // Thêm phương thức thanh toán vào request
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      console.log(response.data);
      alert("đặt hàng thành công");
      navigate("/ordermanagement")
    }
    catch (e) {
      console.log("error", e)
    }
  }

  // Component PaymentMethodSection
  const PaymentMethodSection = () => {
    const paymentMethods = [
      {
        id: 'COD',
        name: 'Thanh toán khi nhận hàng',
        description: 'Thanh toán bằng tiền mặt khi nhận được hàng',
        icon: '💵'
      },
      {
        id: 'QR',
        name: 'Thanh toán bằng QR Code',
        description: 'Quét mã QR để thanh toán qua ví điện tử',
        icon: '📱'
      },
      {
        id: 'BANK',
        name: 'Thanh toán bằng tài khoản ngân hàng',
        description: 'Chuyển khoản trực tiếp qua ngân hàng',
        icon: '🏦'
      }
    ];

    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 my-5">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Phương thức thanh toán</h3>
        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <div key={method.id} className="flex items-center">
              <input
                type="radio"
                id={method.id}
                name="paymentMethod"
                value={method.id}
                checked={selectedPaymentMethod === method.id}
                onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor={method.id} className="ml-3 flex-1 cursor-pointer">
                <div className="flex items-start">
                  <span className="text-xl mr-3">{method.icon}</span>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{method.name}</div>
                    <div className="text-xs text-gray-500">{method.description}</div>
                  </div>
                </div>
              </label>
            </div>
          ))}
        </div>
        
        {/* Hiển thị thông tin bổ sung dựa trên phương thức được chọn */}
        {selectedPaymentMethod === 'qr' && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              💡 Sau khi đặt hàng, bạn sẽ nhận được mã QR để thanh toán qua ví điện tử (MoMo, ZaloPay, VietQR).
            </p>
          </div>
        )}
        
        {selectedPaymentMethod === 'bank' && (
          <div className="mt-4 p-3 bg-green-50 rounded-lg">
            <p className="text-sm text-green-800">
              💡 Thông tin tài khoản ngân hàng sẽ được gửi qua email sau khi đặt hàng thành công.
            </p>
          </div>
        )}
        
        {selectedPaymentMethod === 'cod' && (
          <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
            <p className="text-sm text-yellow-800">
              💡 Vui lòng chuẩn bị đúng số tiền khi nhận hàng. Shipper sẽ không có tiền thối.
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="lg:flex border-y-[1px] border-gray-300 py-10">
      <div className="lg:basis-[70%] lg:pr-3">
        <CheckoutSteps currentStep={2} />
        <AddressSection
          addresses={addresses}
          selectedAddress={selectedAddress}
          onSelectOther={() => setShowSelectModal(true)}
          handleAddAddress={handleAddAddress}
          setShowAddModal={setShowAddModal}
        />
        
        {/* Thêm PaymentMethodSection sau AddressSection */}
        <PaymentMethodSection />
        
        <div className="my-5">
          <ListProduct products={products} />
        </div>
      </div>

      <div className="lg:basis-[30%]">
        <OrderSummary total={total} />
        <button className="w-full btn-secondary text-lg py-3 shadow-md my-5"
          onClick={() => handleOnclickOrder()}
        >
          HOÀN THÀNH
        </button>
      </div>

      {showAddModal && (
        <AddressFormModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAddAddress}
        />
      )}

      {showSelectModal && (
        <ListAddressPopUp
          addresses={addresses}
          onClose={() => setShowSelectModal(false)}
          onSelect={handleSelectAddress}
        />
      )}
    </div>
  );
}

export default Order;