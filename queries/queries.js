import { gql } from "@apollo/client";

export const SEARCH_COUNTRIES = gql`
  query SearchCountries($searchTerms: [String!]) {
    countries(filter: { name: { in: $searchTerms } }) {
      code
      name
      currencies
      capital
      emoji
      states {
        name
      }
      languages {
        native
      }
      continent {
        name
      }
    }
  }
`;

export const GET_ALL_COUNTRIES = gql`
  query GetAllCountries {
    countries {
      code
      name
      currencies
      capital
      emoji
      states {
        name
      }
      languages {
        native
      }
      continent {
        name
      }
    }
  }
`;

export const GET_COUNTRIES_BY_CONTINENT = gql`
  query GetCountriesByContinent($continents: [String!]) {
    countries(filter: { continent: { in: $continents } }) {
      code
      name
      currency
      capital
      emoji
      currencies
      states {
        name
      }
      languages {
        native
      }
      continent {
        code
        name
      }
    }
  }
`;
