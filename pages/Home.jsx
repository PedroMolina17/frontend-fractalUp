import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { fetchImage } from "../services/getImage";
import CountrySelected from "../src/components/CountrySelected";
import SearchInput from "../src/components/SearchInput";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Loading from "../src/components/Loading";
import defaultImage from "/public/defaulImage.png";
import {
  SEARCH_COUNTRIES,
  GET_ALL_COUNTRIES,
  GET_COUNTRIES_BY_CONTINENT,
} from "../queries/queries";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [triggerSearch, setTriggerSearch] = useState(false);
  const [countryImages, setCountryImages] = useState({});
  const [capitalImages, setCapitalImages] = useState({});
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedContinents, setSelectedContinents] = useState([]);

  const {
    loading: searchLoading,
    error: searchError,
    data: searchData,
  } = useQuery(SEARCH_COUNTRIES, {
    variables: { searchTerms: searchTerm ? [searchTerm] : [] },
    skip: !triggerSearch || !searchTerm,
  });

  const {
    loading: allLoading,
    error: allError,
    data: allData,
  } = useQuery(GET_ALL_COUNTRIES, {
    skip: triggerSearch && searchTerm,
  });

  const {
    loading: continentLoading,
    error: continentError,
    data: continentData,
  } = useQuery(GET_COUNTRIES_BY_CONTINENT, {
    variables: { continents: selectedContinents },
    skip: selectedContinents.length === 0,
  });

  const countries =
    triggerSearch && searchTerm ? searchData?.countries : allData?.countries;
  const continentCountries = continentData?.countries;

  useEffect(() => {
    const countriesToUse =
      selectedContinents.length > 0 ? continentCountries : countries;
    if (countriesToUse) {
      const fetchImages = async () => {
        const countryPromises = countriesToUse.map(async (country) => {
          const countryImageUrl = fetchImage(`${country.name} flag landscape`);
          const capitalImageUrl = fetchImage(`${country.capital}`);
          return {
            code: country.code,
            countryImageUrl: await countryImageUrl,
            capitalImageUrl: await capitalImageUrl,
          };
        });

        const results = await Promise.all(countryPromises);

        const countryImageUrls = {};
        const capitalImageUrls = {};
        results.forEach(({ code, countryImageUrl, capitalImageUrl }) => {
          countryImageUrls[code] = countryImageUrl;
          capitalImageUrls[code] = capitalImageUrl;
        });
        setCountryImages(countryImageUrls);
        setCapitalImages(capitalImageUrls);
      };
      fetchImages();
    }
  }, [countries, continentCountries, selectedContinents]);

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    if (!value) {
      // Restablecer cuando el campo de búsqueda esté vacío
      setTriggerSearch(false);
    }
  };

  const handleSearch = () => {
    if (searchTerm) {
      setTriggerSearch(true); // Solo activa la búsqueda si hay un término
    } else {
      setTriggerSearch(false); // Desactiva la búsqueda si no hay término
    }
  };

  const handleContinentsChange = (newSelectedContinents) => {
    setSelectedContinents(newSelectedContinents);
  };

  const handleCountrySelect = (country) => {
    if (selectedCountry?.code === country.code) {
      setSelectedCountry(null);
    } else {
      const selectedCountryWithImage = {
        ...country,
        flagUrl: countryImages[country.code],
        capitalUrl: capitalImages[country.code],
      };
      setSelectedCountry(selectedCountryWithImage);
    }
  };

  if (searchLoading || allLoading || continentLoading) {
    return (
      <SearchInput
        onSearchChange={handleSearchChange}
        onSearchClick={handleSearch}
        onContinentsChange={handleContinentsChange}
      />
    );
  }

  if (searchError) return <p>Error: {searchError.message}</p>;
  if (allError) return <p>Error: {allError.message}</p>;
  if (continentError) return <p>Error: {continentError.message}</p>;

  const countriesToDisplay =
    selectedContinents.length > 0 ? continentCountries : countries;

  return (
    <>
      <div className="flex flex-col">
        {selectedCountry && <CountrySelected country={selectedCountry} />}
        <SearchInput
          onContinentsChange={handleContinentsChange}
          onSearchChange={handleSearchChange}
          onSearchClick={handleSearch}
        />

        <div className="grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-2 w-full  mt-12">
          {countriesToDisplay?.length > 0 ? (
            countriesToDisplay.map((country) => (
              <div
                key={country.code}
                className={`border grid col-span-1 rounded-3xl shadow-2xl cursor-pointer ${
                  selectedCountry?.code === country.code
                    ? "bg-[#009cff]"
                    : "bg-white"
                }`}
                onClick={() => handleCountrySelect(country)}
              >
                <div className="w-full h-48 rounded-t-3xl overflow-hidden">
                  <LazyLoadImage
                    className="w-full h-full object-cover rounded-t-3xl overflow-hidden"
                    placeholderSrc={defaultImage}
                    src={capitalImages[country.code] || defaultImage}
                    alt={country.capital || "Default image"}
                  />
                </div>

                <div className="flex gap-2 p-4">
                  <LazyLoadImage
                    src={countryImages[country.code]}
                    alt={country.name || "Default image"}
                    placeholderSrc={defaultImage || defaultImage}
                    width={80}
                    className="mt-2 rounded-md"
                  />

                  <div className="flex flex-col justify-center">
                    <h2
                      className={`max-md:text-lg lg:text-xl font-bold ${
                        selectedCountry?.code === country.code
                          ? "text-white"
                          : "text-[#009cff]"
                      }`}
                    >
                      {country.name}
                    </h2>
                    <p
                      className={`text-[#676767] max-md:text-md lg:text-lg font-bold ${
                        selectedCountry?.code === country.code
                          ? "text-white"
                          : "text-[#009cff]"
                      }`}
                    >
                      {country.continent.name}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-4">
              No hay países disponibles.
              {selectedCountry && setSelectedCountry(null)}
            </p>
          )}
        </div>

        {(searchLoading || allLoading || continentLoading) && (
          <div className="flex justify-center py-4">
            <Loading />
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
