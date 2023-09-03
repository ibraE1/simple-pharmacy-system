import { Outlet } from "react-router-dom";
import UserNav from "../components/UserNav";
import AdminNav from "../components/AdminNav";

const AppLayout = () => {
  const user = "admin";
  return (
    <div className="flex flex-col-reverse justify-between w-screen h-screen sm:flex-row bg-slate-100">
      {user == "user" && <UserNav />}
      {["admin", "doctor"].includes(user) && <AdminNav />}
      <main className="bg-white">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
