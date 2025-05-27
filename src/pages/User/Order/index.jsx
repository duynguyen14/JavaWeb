import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
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

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
    setShowSelectModal(false);
  };

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
      } catch (e) {
        console.log('error', e);
      }
    };

    fetchAddresses();
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
    } catch (e) {
      console.log('error', e);
    }
  };

  const total = () => {
    return products.reduce((sum, product) => sum + product.price * product.quantity, 0);
  };

  return (
    <div className="lg:flex border-y-[1px] border-gray-300 py-10">
      <div className="lg:basis-[70%] lg:pr-3">
        <CheckoutSteps currentStep={2} />
        <AddressSection
          addresses={addresses}
          selectedAddress={selectedAddress}
          onSelectOther={() => setShowSelectModal(true)}
        />
        <div className="my-5">
          <ListProduct products={products} />
        </div>
      </div>

      <div className="lg:basis-[30%]">
        <OrderSummary total={total} />
        <button className="w-full btn-secondary text-lg py-3 shadow-md my-5">
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
