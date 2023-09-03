import { GiMedicines } from "react-icons/gi";

const Navbar = ({ children }) => {
  return (
    <div className="flex items-center gap-3 px-4 py-3 mx-3 my-2 bg-white border rounded-lg sm:px-6 sm:items-start border-slate-300 sm:flex-col sm:gap-8">
      <div className="flex items-center gap-1 text-lg sm:text-2xl">
        <GiMedicines className="stroke-2 stroke-sky-500 fill-sky-500" />
        <h1 className="text-lg font-bold sm:text-2xl text-sky-500">Pharmacy</h1>
      </div>
      <nav className="flex flex-grow sm:flex-grow-0">
        <ul className="flex justify-around flex-grow sm:text-lg sm:justify-start sm:gap-2 sm:flex-grow-0 sm:flex-col">
          {children}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
