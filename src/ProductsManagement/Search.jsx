import React, { useState } from "react";

function Search({ onSearch }) {
  const [searchString, setSearchString] = useState("");
  const handleChange = (evt) => {
    setSearchString(evt.target.value);
  };
  return (
    <div className="w-25 d-flex">
      <input
        className="form-control"
        placeholder="Search Name"
        value={searchString}
        onChange={handleChange}
      />
      <button
        className="btn btn-success"
        onClick={() => onSearch(searchString)}
      >
        Search
      </button>
    </div>
  );
}

export default Search;
