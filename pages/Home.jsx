import SearchInput from "../src/components/SearchInput";
import { useQuery, gql } from "@apollo/client";
import { useState, useEffect } from "react";
import { fetchImage } from "../services/getImage";
import CountrySelected from "../src/components/CountrySelected";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Loading from "../src/components/Loading";
import defaultImage from "/public/defaulImage.png";

const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      code
      name
      currencies
      states {
        name
      }
      languages {
        native
      }
      capital
      emoji
      continent {
        name
      }
    }
  }
`;

const Home = () => {
  const { loading, error, data } = useQuery(GET_COUNTRIES);
  const [countryImages, setCountryImages] = useState({});
  const [capitalImages, setCapitalImages] = useState({});
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    console.log(value);
  };

  const handleSearch = () => {
    console.log(searchTerm);
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

  useEffect(() => {
    if (data) {
      const storedCountryImages =
        JSON.parse(localStorage.getItem("countryImages")) || {};
      const storedCapitalImages =
        JSON.parse(localStorage.getItem("capitalImages")) || {};

      if (
        Object.keys(storedCountryImages).length &&
        Object.keys(storedCapitalImages).length
      ) {
        setCountryImages(storedCountryImages);
        setCapitalImages(storedCapitalImages);
      } else {
        const fetchImages = async () => {
          const countryPromises = data.countries.map(async (country) => {
            const countryImageUrl = fetchImage(
              `${country.name} flag landscape`
            );
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

          localStorage.setItem(
            "countryImages",
            JSON.stringify(countryImageUrls)
          );
          localStorage.setItem(
            "capitalImages",
            JSON.stringify(capitalImageUrls)
          );
        };

        fetchImages();
      }
    }
  }, [data]);

  if (loading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex flex-col ">
      {selectedCountry && <CountrySelected country={selectedCountry} />}
      <SearchInput
        onSearchChange={handleSearchChange}
        onSearchClick={handleSearch}
      />

      <div className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-4 w-full h-96 mt-12 ">
        {data.countries.map((country) => (
          <div
            key={country.code}
            className={`border flex flex-col rounded-3xl shadow-2xl cursor-pointer ${
              selectedCountry?.code === country.code
                ? "bg-[#009cff]"
                : "bg-white"
            }`}
            onClick={() => handleCountrySelect(country)}
          >
            <LazyLoadImage
              className="w-full h-48 object-cover rounded-t-3xl"
              placeholderSrc={defaultImage}
              src={capitalImages[country.code] || defaultImage}
              alt={country.capital || "Default image"}
            />

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
        ))}
      </div>
    </div>
  );
};

export default Home;
