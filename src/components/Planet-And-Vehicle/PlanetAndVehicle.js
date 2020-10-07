import React from "react";
import PlanetSelection from "../PlanetSelection/PlanetSelection";
import "./PlanetAndVehicle.styles.scss";

const PlanetAndVehicle = ({ TotalNumberOfDestination, ...props }) => {
  return (
    <div className="planet-vehicle-selection-container">
      {TotalNumberOfDestination.map((destination) => {
        return (
          <PlanetSelection
            {...props}
            key={destination.id}
            id={destination.id}
            destination={destination.name}
          />
        );
      })}
    </div>
  );
};

export default PlanetAndVehicle;
