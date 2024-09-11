import { IoMdSearch } from "react-icons/io";
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import defaultImage from "/public/defaulImage.png";
import PropTypes from "prop-types";

const continentsData = [
  { code: "EU", name: "Europa", image: "/europa.png" },
  { code: "AM", name: "América", image: "/america.png" },
  { code: "AS", name: "Asia", image: "/asia.png" },
  { code: "OC", name: "Oceanía", image: "/oceania.png" },
  { code: "AF", name: "África", image: "/africa.png" },
];

const SearchInput = ({ onSearchChange, onSearchClick, onContinentsChange }) => {
  const [countrySearch, setCountrySearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [selectedContinents, setSelectedContinents] = useState([]);

  const handleChangeCountry = (e) => {
    setCountrySearch(e.target.value);
  };

  const handleSearchClick = () => {
    onSearchChange(countrySearch);
    onSearchClick();
    setIsFocused(false);
  };

  const handleContinentClick = (code) => {
    let updatedContinents;
    if (code === "AM") {
      updatedContinents =
        selectedContinents.includes("NA") &&
        selectedContinents.includes("SA") &&
        selectedContinents.includes("AM")
          ? selectedContinents.filter(
              (continent) =>
                continent !== "NA" && continent !== "SA" && continent !== "MA"
            )
          : [...selectedContinents, "NA", "SA", "AM"];
    } else {
      updatedContinents = selectedContinents.includes(code)
        ? selectedContinents.filter((continent) => continent !== code)
        : [...selectedContinents, code];
    }
    setSelectedContinents(updatedContinents);
    onContinentsChange(updatedContinents);
  };

  const handleClearContinents = () => {
    setSelectedContinents([]);
    onContinentsChange([]);
  };

  return (
    <div className="relative flex items-center justify-center w-full">
      <label className="w-1/2 bg-white h-14 m-2 flex items-center gap-1 shadow-md rounded-3xl px-2 min-w-80">
        <input
          type="text"
          className="w-full h-full px-4 bg-transparent border-none outline-none text-black"
          placeholder="Buscar..."
          value={countrySearch}
          onChange={handleChangeCountry}
          onFocus={() => setIsFocused(true)}
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
          <div className="flex justify-between text-[#676767]">
            <p>Filtrar por continentes</p>
            <button className="text-blue-500" onClick={handleClearContinents}>
              Limpiar
            </button>
          </div>
          <div className="grid grid-cols-3 gap-3 ">
            {continentsData.map((continent) => (
              <div
                key={continent.code}
                className={`cursor-pointer rounded-md border-2`}
                onClick={() => handleContinentClick(continent.code)}
              >
                <LazyLoadImage
                  src={continent.image}
                  alt={continent.name}
                  placeholderSrc={defaultImage}
                  className={`rounded-md  ${
                    selectedContinents.includes(continent.code)
                      ? "border-blue-500 shadow-blue-500 shadow-md"
                      : "border-transparent"
                  }`}
                />
                <p className="text-center text-[#676767]">{continent.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

SearchInput.propTypes = {
  onSearchChange: PropTypes.func.isRequired,
  onSearchClick: PropTypes.func.isRequired,
  onContinentsChange: PropTypes.func.isRequired,
};

export default SearchInput;
