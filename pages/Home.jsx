import SearchInput from "../src/components/SearchInput";
import { useQuery, gql } from "@apollo/client";
import { useState, useEffect } from "react";
import { fetchImage } from "../services/getImage";

const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      code
      name
      capital
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

  useEffect(() => {
    if (data) {
      const fetchImages = async () => {
        const countryImageUrls = {};
        const capitalImageUrls = {};

        for (const country of data.countries) {
          const countryImageUrl = await fetchImage(
            `${country.name} flag landscape`
          );
          countryImageUrls[country.code] = countryImageUrl;

          const capitalImageUrl = await fetchImage(`${country.capital}`);
          capitalImageUrls[country.code] = capitalImageUrl;
        }

        setCountryImages(countryImageUrls);
        setCapitalImages(capitalImageUrls);
      };

      fetchImages();
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex flex-col">
      <div className="text-red-100 ">
        <SearchInput />
      </div>
      <div className="grid grid-cols-3 gap-4 p-4 z-30">
        {/* {data.countries.slice(0, 4).map((country) => (
          <div
            key={country.code}
            className="border grid p-4 rounded-lg shadow-md"
          >
            <h2>{country.name}</h2>
            <p>Capital: {country.capital}</p>
            <p>Continent: {country.continent.name}</p>
            {countryImages[country.code] ? (
              <img
                src={countryImages[country.code]}
                alt={`Image of ${country.name}`}
                width={200}
                className="mt-2"
              />
            ) : (
              <p>No country image available</p>
            )}
            {capitalImages[country.code] ? (
              <img
                src={capitalImages[country.code]}
                alt={`Image of ${country.capital}`}
                width={200}
                className="mt-2"
              />
            ) : (
              <p>No capital image available</p>
            )}
          </div>
        ))} */}
        <div className="h-96 w-full bg-red-300"></div>{" "}
        <div className="h-96 w-full bg-red-300"></div>
        <div className="h-96 w-full bg-red-300"></div>
      </div>
    </div>
  );
};

export default Home;
