import React from "react";
import PlanetSelection from "../PlanetSelection/PlanetSelection";

import "./PlanetAndVehicle.styles.scss";

const PlanetAndVehicle = ({ TotalNumberOfDestination, ...props }) => {
  return (
    <div className="select-container">
      {TotalNumberOfDestination.map((destination) => {
        return (
          <PlanetSelection
            {...props}
            key={destination.id}
            id={destination.id}
          />
        );
      })}
    </div>
  );
};

export default PlanetAndVehicle;
