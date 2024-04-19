import React, { useState } from "react";
import "./CountrySelector.css";

const CountrySelector = ({
  countries,
  selectedCountry,
  onCountryChange,
  expandedFlag,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(true);

  return (
    <select
      id="country-dropdown"
      className={`country-dropdown ${
        expandedFlag ? "expandmsg" : "collapsemsg"
      }`}
      value={selectedCountry}
      onChange={(e) => onCountryChange(e.target.value)}
      open={true}
    >
      <option value="">Select a country</option>
      {countries.map((country, index) => (
        <option key={index} value={country.name}>
          {country.name}
        </option>
      ))}
    </select>
  );
};

export default CountrySelector;
