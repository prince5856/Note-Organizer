import React from "react";
import { MdSearch } from "react-icons/md";

const Search = ({ handleSearchNote, setSearchTitle }) => {
  const handleChange = (event) => {
    const searchValue = event.target.value.toLowerCase();
    handleSearchNote(searchValue);
    setSearchTitle(searchValue);
  };
  return (
    <div className="search">
      <MdSearch className="search-icons" size="1.3em" />
      <input
        onChange={handleChange}
        type="text"
        placeholder="type to search..."
      />
    </div>
  );
};

export default Search;
