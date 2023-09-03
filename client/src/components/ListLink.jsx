import { NavLink } from "react-router-dom";

const ListLink = ({ text, linkTo, children }) => {
  return (
    <li className="flex items-center hover:text-sky-400">
      <NavLink to={linkTo} className={"flex items-center gap-2"}>
        {children}
        <p className="hidden font-semibold sm:inline">{text}</p>
      </NavLink>
    </li>
  );
};

export default ListLink;
