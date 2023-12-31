import ListLink from "./ListLink";
import Navbar from "./Navbar";
import { HiOutlineDocumentAdd, HiOutlineUser } from "react-icons/hi";
import { LuHistory } from "react-icons/lu";

const UserNav = () => {
  return (
    <Navbar>
      <ListLink text={"Place Order"} linkTo={"/order/place"}>
        <HiOutlineDocumentAdd className="block text-2xl" />
      </ListLink>
      <ListLink text={"Order History"} linkTo={"/user/history"}>
        <LuHistory className="block text-2xl" />
      </ListLink>
      <ListLink text={"Profile"}>
        <HiOutlineUser className="block text-2xl" />
      </ListLink>
    </Navbar>
  );
};

export default UserNav;
