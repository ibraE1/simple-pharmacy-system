import { Link } from "react-router-dom";
import FormInput from "../components/FormInput";
import Button from "../components/Button";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-around w-4/5 px-8 bg-white border rounded-lg lg:w-4/5 border-slate-300 h-4/5">
      <h1 className="text-2xl font-extrabold text-center text-sky-500 font-display whitespace-nowrap">
        Log In To Your Account
      </h1>
      <form className="flex flex-col items-center w-full gap-4 sm:w-4/5">
        <FormInput type="email" id="email" name="email" placeholder="Email" />
        <FormInput
          type="password"
          id="password"
          name="password"
          placeholder="Password"
        />
        <Button
          handleClick={(e) => {
            e.preventDefault();
          }}
        >
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

export default Login;
