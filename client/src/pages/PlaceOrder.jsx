import Button from "../components/Button";
import { useState } from "react";
import { usePlaceOrder, useUser } from "../hooks/apiHooks";
import FileInput from "../components/FileInput";
import DropdownInput from "../components/DropdownInput";

const PlaceOrder = () => {
  const [address, setAddress] = useState("");
  const [image, setImage] = useState(null);

  const { data } = useUser();

  const { mutate: placeOrderMutation, isLoading } = usePlaceOrder();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("address", address || data.addresses[0]);
    formData.append("image", image, image.name);
    formData.append("user_id", data._id);
    formData.append("status", "Processing");
    placeOrderMutation(formData);
  };

  return (
    <div className="flex items-center gap-3 px-4 py-3 mx-3 my-2 bg-white border rounded-lg sm:px-6 border-slate-300 sm:flex-col sm:gap-8">
      <h1 className="text-2xl font-extrabold text-center text-sky-500 font-display">
        Place An Order
      </h1>
      <form
        className="flex flex-col items-center gap-4"
        onSubmit={handleSubmit}
      >
        <FileInput
          type="file"
          id="image"
          name="image"
          handleChange={(e) => {
            setImage(e.target.files[0]);
          }}
        />

        <DropdownInput
          id="address"
          name="address"
          options={data.addresses}
          handleChange={(e) => setAddress(e.target.value)}
        />
        <Button type="submit" disabled={isLoading}>
          Order
        </Button>
      </form>
    </div>
  );
};

export default PlaceOrder;
