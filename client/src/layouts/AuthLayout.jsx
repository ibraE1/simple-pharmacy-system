import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <main className="flex items-center justify-center w-screen h-screen bg-slate-100 font-body">
      <Outlet />
    </main>
  );
};

export default AuthLayout;
