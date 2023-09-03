import ListLink from "./ListLink";
import Navbar from "./Navbar";
import {
  HiOutlineDocumentDuplicate,
  HiOutlineUser,
  HiOutlineUsers,
} from "react-icons/hi";
import { TbMedicineSyrup } from "react-icons/tb";

const AdminNav = () => {
  return (
    <Navbar>
      <ListLink text={"Users"}>
        <HiOutlineUsers className="block text-2xl" />
      </ListLink>
      <ListLink text={"Orders"}>
        <HiOutlineDocumentDuplicate className="block text-2xl" />
      </ListLink>
      <ListLink text={"Medicines"}>
        <TbMedicineSyrup className="block text-2xl" />
      </ListLink>
      <ListLink text={"Profile"}>
        <HiOutlineUser className="block text-2xl" />
      </ListLink>
    </Navbar>
  );
};

export default AdminNav;
