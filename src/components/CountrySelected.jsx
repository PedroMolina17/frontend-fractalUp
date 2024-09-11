import PropTypes from "prop-types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import defaulImage from "../../public/defaulImage.png";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

const CountrySelected = ({ country }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };
  return (
    <div
      className={`bottom-0 right-0 w-1/4 max-md:w-96 max-sm:w-60 min-w-64 bg-white fixed p-8 text-white transform transition-transform duration-500 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-100"
      }`}
    >
      <FaTimes
        className="text-[#676767] absolute right-4 top-4 text-xl"
        onClick={handleClose}
      />
      <div className="flex w-full h-48 rounded-md">
        <LazyLoadImage
          src={country.capitalUrl}
          alt={`${country.name} flag`}
          placeholderSrc={defaulImage}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <div className="flex gap-2 p-4">
        <LazyLoadImage
          src={country.flagUrl}
          alt={country.name}
          placeholderSrc={defaulImage}
          width={80}
          className="mt-2 rounded-md "
        />

        <div className="flex flex-col justify-center text-white">
          <h2 className="text-xl font-bold text-[#009cff]">{country.name}</h2>
          <p className=" text-lg font-bold text-[#676767] ">
            {country.continent.name}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex gap-1">
          <h2 className="text-xl font-bold text-[#009cff]">Capital:</h2>
          <p className=" text-lg font-bold text-[#676767] ">
            {country.capital}
          </p>
        </div>
        <div className="flex gap-1">
          <h2 className="text-xl font-bold text-[#009cff]">Language:</h2>
          <p className="text-lg font-bold text-[#676767]">
            {country.languages && country.languages.length > 0
              ? country.languages[0].native
              : "No language data available"}
          </p>
        </div>
        <div className="flex gap-1">
          <h2 className="text-xl font-bold text-[#009cff]">Currency:</h2>
          <p className="text-lg font-bold text-[#676767]">
            {country.currencies}
          </p>
        </div>
        <p className="text-[#009cff] text-xl font-bold">Region:</p>
        <div className="text-black h-40 overflow-scroll">
          {country.states.length > 0 ? (
            <ul>
              {country.states.map((state, index) => (
                <li key={index}>{state.name}</li>
              ))}
            </ul>
          ) : (
            <p>No states available</p>
          )}
        </div>
      </div>
    </div>
  );
};

CountrySelected.propTypes = {
  country: PropTypes.shape({
    states: PropTypes.arrayOf({ name: PropTypes.string.isRequired }),
    capital: PropTypes.string.isRequired,
    flagUrl: PropTypes.string.isRequired,
    continent: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
    languages: PropTypes.array.isRequired,
    currencies: PropTypes.string.isRequired,
    capitalUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
  }).isRequired,
};

export default CountrySelected;
