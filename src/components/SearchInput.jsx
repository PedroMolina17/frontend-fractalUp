import { IoMdSearch } from "react-icons/io";
import { useState } from "react";
const SearchInput = ({ onSearchChange }) => {
  const [countrySearch, setCountrySearch] = useState("");

  const handleChangeCountry = (e) => {
    const value = e.target.value;
    setCountrySearch(value);
    onSearchChange(value);
    console.log(value);
  };

  return (
    <div className="flex items-center justify-center w-full">
      <label className="w-1/2 bg-white h-14 m-2 flex items-center gap-1 shadow-md rounded-3xl px-2 ">
        <input
          type="text"
          className="w-full h-full px-4 bg-transparent border-none outline-none"
          placeholder="Buscar..."
          value={countrySearch}
          onChange={handleChangeCountry}
        />
        <button className="bg-[#009cff] flex items-center justify-center rounded-xl text-white text-xl gap-2 px-2 py-1">
          <IoMdSearch className="text-2xl" />
          Buscar
        </button>
      </label>
    </div>
  );
};

export default SearchInput;
