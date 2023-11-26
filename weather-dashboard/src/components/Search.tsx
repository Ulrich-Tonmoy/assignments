/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { fetchLocations } from "../api/weatherApi";
import { toast } from "react-toastify";

interface SearchProps {
  onSearchChange: (searchData: { label: string; value: string }) => void;
}

const Search = ({ onSearchChange }: SearchProps) => {
  const [search, setSearch] = useState(null);

  const loadOptions = (inputValue: string) => {
    return fetchLocations(inputValue)
      .then((response) => {
        return {
          options: response.data.map(
            (city: { lat: string; lon: string; name: string; country: string }) => {
              return {
                value: `${city.lat} ${city.lon}`,
                label: `${city.name}, ${city.country}`,
              };
            },
          ),
        };
      })
      .catch(({ response }) => {
        toast.error(response.data.message, {
          theme: "colored",
        });
        return response;
      });
  };

  const handleOnChange = (searchData: any) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
