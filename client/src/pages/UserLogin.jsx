import { Link } from "react-router-dom";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import { useState } from "react";
import { useLogin } from "../hooks/apiHooks";

const UserLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { mutate: loginMutation, isLoading } = useLogin();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation(formData);
  };
  return (
    <div className="flex flex-col items-center justify-around w-4/5 px-8 bg-white border rounded-lg lg:w-4/5 border-slate-300 h-4/5">
      <h1 className="text-2xl font-extrabold text-center text-sky-500 font-display whitespace-nowrap">
        Log In To Your Account
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
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          handleChange={handleChange}
        />
        <Button type="submit" disabled={isLoading}>
          Login
        </Button>
      </form>
      <p className="text-sm whitespace-nowrap">
        {"Don't have an account? "}
        <Link className="text-sky-400 hover:underline" to={"/signup"}>
          Sign up here
        </Link>
      </p>
    </div>
  );
};

export default UserLogin;
