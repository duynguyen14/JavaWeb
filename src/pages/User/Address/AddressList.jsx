import AddressItem from "./AddressItem";
export default function AddressList({ addresses, deleteAddress, setDefaultAddress,editAddress }) {
  return (
    <div className="mt-10 px-10">
      {addresses.map(address => (
        <AddressItem
          key={address.id}
          address={address}
          onDelete={() => deleteAddress(address.id)}
          onSetDefault={() => setDefaultAddress(address.id)}
          onEdit={() => editAddress(address)}
        />
      ))}
    </div>
  );
}
