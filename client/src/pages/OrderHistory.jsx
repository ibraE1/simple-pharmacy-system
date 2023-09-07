import DropdownInput from "../components/DropdownInput";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUserOrders } from "../api/userAPI";

const OrderHistory = () => {
  const [currentId, setCurrentId] = useState(null);

  const { data, isFetched, isLoading } = useQuery(
    ["authenticated-user-orders"],
    getCurrentUserOrders,
    {
      onSuccess: (data) => {
        setCurrentId(data.data[0].id);
      },
    }
  );

  const memoizedCurrentOrder = useMemo(() => {
    return data ? data.data.find((o) => o.id === currentId) : null;
  }, [data, currentId]);

  if (!memoizedCurrentOrder) {
    return <h1>Loading..</h1>;
  }

  return (
    <div className="flex items-center flex-grow gap-3 px-4 py-3 mx-3 my-2 bg-white border rounded-lg sm:px-6 border-slate-300 sm:flex-col sm:gap-8">
      <h1 className="text-2xl font-extrabold text-center text-sky-500 font-display">
        Order History
      </h1>
      <DropdownInput
        id="order"
        name="order"
        options={data.data.map((order) => order.id)}
        handleChange={(e) => setCurrentId(e.target.value)}
      />
      <div>
        <p>Status: {memoizedCurrentOrder.status}</p>
        <p>Address: {memoizedCurrentOrder.address}</p>
        <ul>
          {memoizedCurrentOrder.items.map((item, index) => (
            <li key={index}>
              <p>Item: {item.medicine_id.name}</p>
              <p>Price Per Unit: {item.medicine_id.price}</p>
              <p>Quantity: {item.quantity}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderHistory;
