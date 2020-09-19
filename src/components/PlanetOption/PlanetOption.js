import React from "react";

const PlanetOption = ({ planetName, disabled, ...props }) => {
  return (
    <option name={planetName} value={planetName} disabled={disabled}>
      {planetName}{" "}
    </option>
  );
};
export default PlanetOption;
