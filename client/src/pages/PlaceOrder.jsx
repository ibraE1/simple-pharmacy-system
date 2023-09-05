import FormInput from "../components/FormInput";
import Button from "../components/Button";
import { useState } from "react";
import { usePlaceOrder, useUser } from "../hooks/apiHooks";

const PlaceOrder = () => {
  const [formData, setFormData] = useState({});

  const { data } = useUser();

  const { mutate: placeOrderMutation, isLoading } = usePlaceOrder();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    placeOrderMutation(formData);
  };

  return (
    <div className="flex flex-col items-center w-4/5 px-8 bg-white border rounded-lg lg:w-4/5 justify-evenly border-slate-300 h-4/5">
      <h1 className="text-2xl font-extrabold text-center text-sky-500 font-display">
        Place An Order
      </h1>
      <form
        className="flex flex-col items-center w-full gap-4 sm:w-4/5"
        onSubmit={handleSubmit}
      >
        <FormInput
          type="file"
          id="image"
          name="image"
          value={formData.image}
          handleChange={handleChange}
        />

        <FormInput
          type="text"
          id="address"
          name="address"
          placeholder="address"
          value={formData.address || data.addresses[0]}
          handleChange={handleChange}
        />
        <Button type="submit" disabled={isLoading}>
          Order
        </Button>
      </form>
    </div>
  );
};

export default PlaceOrder;
