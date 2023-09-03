import ListLink from "./ListLink";
import Navbar from "./Navbar";
import { HiOutlineDocumentAdd, HiOutlineUser } from "react-icons/hi";
import { LuHistory } from "react-icons/lu";

const UserNav = () => {
  return (
    <Navbar>
      <ListLink text={"Place Order"}>
        <HiOutlineDocumentAdd className="block text-2xl" />
      </ListLink>
      <ListLink text={"Order History"}>
        <LuHistory className="block text-2xl" />
      </ListLink>
      <ListLink text={"Profile"}>
        <HiOutlineUser className="block text-2xl" />
      </ListLink>
    </Navbar>
  );
};

export default UserNav;
