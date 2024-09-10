import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const links = [
    { path: "/", label: "Home" },
    { path: "/view1", label: "Vista 1" },
    { path: "/view2", label: "Vista 2" },
  ];

  return (
    <div className="w-96 fixed top-0 left-0 bottom-0 bg-[#676767]">
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
                  ? "bg-white text-[#676767] rounded-md "
                  : ""
              }`}
            >
              <Link to={link.path} className="block p-2 w-full">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
