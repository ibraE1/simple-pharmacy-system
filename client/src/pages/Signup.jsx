import { Link } from "react-router-dom";
import FormInput from "../components/FormInput";
import Button from "../components/Button";

const Signup = () => {
  return (
    <div className="flex flex-col items-center w-4/5 px-8 bg-white border rounded-lg lg:w-4/5 justify-evenly border-slate-300 h-4/5">
      <h1 className="text-2xl font-extrabold text-center text-sky-500 font-display">
        Create An Account
      </h1>
      <form className="flex flex-col items-center w-full gap-4 sm:w-4/5">
        <FormInput type="email" id="email" name="email" placeholder="Email" />
        <FormInput type="text" id="name" name="name" placeholder="Name" />
        <FormInput
          type="password"
          id="password"
          name="password"
          placeholder="Password"
        />
        <FormInput
          type="number"
          id="national_id"
          name="national_id"
          placeholder="National ID"
        />
        <FormInput
          type="text"
          id="address"
          name="address"
          placeholder="Address"
        ></FormInput>
        <Button
          handleClick={(e) => {
            e.preventDefault();
          }}
        >
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
