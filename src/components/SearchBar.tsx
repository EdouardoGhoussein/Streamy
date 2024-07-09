import { ChangeEvent, useCallback, useContext } from "react";
import { SearchContext } from "../App";
import _ from "lodash";

const SearchBar = () => {
  const { setSearch } = useContext(SearchContext);

  const debouncedSetSearch = useCallback(
    _.debounce((value: string) => {
      setSearch(value);
    }, 500),
    []
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    debouncedSetSearch(event.target.value);
  };

  return (
    <input
      type="text"
      className="form-control"
      placeholder="Search games..."
      aria-label="Search"
      aria-describedby="basic-addon2"
      onChange={handleChange}
    />
  );
};

export default SearchBar;
