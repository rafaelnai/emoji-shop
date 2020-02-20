import React from "react";
import "./styles.scss";

export default function SearchField(props) {
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
