import React from "react";
import PlanetOption from "../PlanetOption/PlanetOption";

import "./PlanetSelection.styles.scss";
import VehicleOption from "../VehicleOption/VehicleOption";

const PlanetSelection = ({
  planets,
  handleSelectChange,
  showVehicles,
  vehicles,
  id,
  selectedId,

  ...props
}) => {
  return (
    <div className="selection">
      <div className="planet-selection">
        <select
          defaultValue="default"
          onChange={handleSelectChange}
          id={id}
          // onClick={(e) => console.log(e.target)}
        >
          <option value="default" disabled>
            Select a Planet
          </option>
          {planets.map((planet, index) => {
            return (
              <PlanetOption
                key={index}
                id={id}
                planetName={planet.name}
                disabled={planet.disabled}
                {...props}
              />
            );
          })}
        </select>
      </div>

      {/* <div className={`vehicle-selection ${showVehicles ? "show" : ""}`}> */}
      {id === selectedId ? (
        <div className="vehicle-selection">
          <form className={`${id} form-vehicle`}>
            {vehicles.map((vehicle, index) => {
              return (
                <VehicleOption
                  vehicle={vehicle}
                  key={index}
                  id={id}
                  {...props}
                />
              );
            })}
          </form>
        </div>
      ) : null}
    </div>
  );
};
export default PlanetSelection;
