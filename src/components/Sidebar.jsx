import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const links = [
    { path: "/", label: "Home" },
    { path: "/view1", label: "Vista 1" },
    { path: "/view2", label: "Vista 2" },
  ];

  return (
    <>
      <div className="md:hidden fixed top-0  z-50 bg-[#676767] p-4 left-0 right-0">
        <button onClick={() => setOpen(!open)} className="text-white text-3xl">
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <div
        className={`w-96 fixed top-0 left-0 bottom-0 bg-[#676767] max-md:mt-16 ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 max-md:w-64 z-40`}
      >
        <div className="p-8 bg-[#dbdbdb] m-4 rounded-md text-[#676767] text-center text-2xl font-bold">
          Logo
        </div>
        <div className="flex flex-col justify-center items-center">
          <ul className="text-2xl flex flex-col gap-2 text-white font-bold w-full px-8">
            {links.map((link, index) => (
              <li
                key={index}
                className={`w-full text-center ${
                  location.pathname === link.path
                    ? "bg-white text-[#676767] rounded-md"
                    : ""
                }`}
              >
                <Link
                  to={link.path}
                  className="block p-2 w-full"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
        ></div>
      )}
    </>
  );
};

export default Sidebar;
