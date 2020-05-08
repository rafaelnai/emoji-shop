import React from "react";
import "./styles.scss";

function SearchField(props) {
  const { handleSearch, value, placeholder } = props;

  return (
    <input
      className="search-input"
      onChange={handleSearch}
      type="search"
      placeholder={placeholder}
      value={value}
    />
  );
}

export default React.memo(SearchField);
