import { Link } from "react-router-dom";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import { useState } from "react";
import { useRegister } from "../hooks/apiHooks";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    national_id: "",
    addresses: [],
  });

  const { mutate: signupUserMutation, isLoading } = useRegister();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == "addresses") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        addresses: value.split(","),
      }));
    } else setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signupUserMutation(formData);
  };

  return (
    <div className="flex flex-col items-center w-4/5 px-8 bg-white border rounded-lg lg:w-4/5 justify-evenly border-slate-300 h-4/5">
      <h1 className="text-2xl font-extrabold text-center text-sky-500 font-display">
        Create An Account
      </h1>
      <form
        className="flex flex-col items-center w-full gap-4 sm:w-4/5"
        onSubmit={handleSubmit}
      >
        <FormInput
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          handleChange={handleChange}
        />
        <FormInput
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          value={formData.name}
          handleChange={handleChange}
        />
        <FormInput
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          handleChange={handleChange}
        />
        <FormInput
          type="number"
          id="national_id"
          name="national_id"
          placeholder="National ID"
          value={formData.national_id}
          handleChange={handleChange}
        />
        <FormInput
          type="text"
          id="addresses"
          name="addresses"
          placeholder="Addresses"
          value={formData.addresses}
          handleChange={handleChange}
        />
        <Button type="submit" disabled={isLoading}>
          Sign Up
        </Button>
      </form>
      <p className="text-sm whitespace-nowrap">
        {"Already have an account? "}
        <Link className="text-sky-400 hover:underline" to={"/login"}>
          Login here
        </Link>
      </p>
    </div>
  );
};

export default Signup;
