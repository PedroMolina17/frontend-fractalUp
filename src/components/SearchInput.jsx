import { IoMdSearch } from "react-icons/io";
import { useState } from "react";

const SearchInput = ({ onSearchChange, onSearchClick }) => {
  const [countrySearch, setCountrySearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleChangeCountry = (e) => {
    setCountrySearch(e.target.value);
  };

  const handleSearchClick = () => {
    onSearchChange(countrySearch);
    onSearchClick();
  };

  return (
    <div className="relative flex items-center justify-center w-full">
      <label className="w-1/2 bg-white h-14 m-2 flex items-center gap-1 shadow-md rounded-3xl px-2">
        <input
          type="text"
          className="w-full h-full px-4 bg-transparent border-none outline-none text-black"
          placeholder="Buscar..."
          value={countrySearch}
          onChange={handleChangeCountry}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <button
          className="bg-[#009cff] flex items-center justify-center rounded-xl text-white text-xl gap-2 px-2 py-1"
          onClick={handleSearchClick}
        >
          <IoMdSearch className="text-2xl" />
          Buscar
        </button>
      </label>

      {isFocused && (
        <div
          className="absolute top-full mt-2 bg-white shadow-lg rounded-md p-4 z-20 w-1/2"
          onFocus={() => setIsFocused(true)}
        >
          <div
            className="flex justify-between text-[#676767]"
            onClick={handleSearchClick}
          >
            <p>Filtrar por continentes</p>
            <button className="text-blue-500">Limpiar</button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <img src="/europa.png" alt="Europa" className="rounded-md" />
            <img src="/america.png" alt="America" className="rounded-md" />
            <img src="/asia.png" alt="Asia" className="rounded-md" />
            <img src="/oceania.png" alt="Oceania" className="rounded-md" />
            <img src="/africa.png" alt="Africa" className="rounded-md" />
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
