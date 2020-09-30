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
  destination,
  handleSelectClick,
  selectDisabled,
  customMessage,
  selectedPlanet,
  selectedVehicle,

  ...props
}) => {
  return (
    <div className="selection-container">
      <div className="planet-selection">
        <h3 className="destination-number">{destination}</h3>

        <select
          defaultValue="default"
          onChange={handleSelectChange}
          onClick={handleSelectClick}
          id={id}
          className={`selection ${selectDisabled ? "disabled" : ""}`}
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
      {id === selectedId ? (
        <p className="custom-message">{customMessage}</p>
      ) : null}

      {/* <div className={`vehicle-selection ${showVehicles ? "show" : ""}`}> */}
      {id === selectedId ? (
        <div className="vehicle-selection">
          <form className="form-vehicle">
            {vehicles.map((vehicle, index) => {
              return (
                <VehicleOption
                  vehicle={vehicle}
                  key={index}
                  id={id}
                  selectedVehicle={selectedVehicle}
                  {...props}
                />
              );
            })}
          </form>
        </div>
      ) : null}
      {id === selectedId ? (
        selectedPlanet && selectedVehicle ? (
          <p className="selected-planet-vehicle-display">
            <strong>{selectedVehicle}</strong> selected for planet{" "}
            <strong>{selectedPlanet}</strong>
          </p>
        ) : (
          ""
        )
      ) : (
        ""
      )}
    </div>
  );
};
export default PlanetSelection;
