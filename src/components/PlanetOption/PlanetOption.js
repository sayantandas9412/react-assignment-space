import React from "react";
import "./PlanetOption.styles.scss";

const PlanetOption = ({ planetName, disabled }) => {
  return (
    <option
      name={planetName}
      value={planetName}
      disabled={disabled}
      className="planet-option"
    >
      {planetName}{" "}
    </option>
  );
};
export default PlanetOption;
