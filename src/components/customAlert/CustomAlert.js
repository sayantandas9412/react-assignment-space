import React from "react";
import "./CustomAlert.styles.scss";

const CustomAlert = ({
  handleAlertClick,
  selectedPlanet,
  selectionComplete,
  showSelections,
  handleFindButton,
  selectedPlanets,
  selectedVehicles,
}) => {
  let customMessage = "";
  let selectedPlanetsList = selectedPlanets.map((planet) => planet + ", ");
  let selectedVehiclesList = selectedVehicles.map((vehicle) => vehicle + ", ");
  if (selectionComplete && !showSelections) {
    customMessage = (
      <p>
        You have already selected 4 planets
        <br />
        <br />
        Please Click <strong>FIND FALCONE</strong> to proceed
      </p>
    );
  } else if (showSelections) {
    customMessage = (
      <p>
        Selected Planets : <strong>{selectedPlanetsList}</strong> <br />
        Selected Vehicles : <strong>{selectedVehiclesList}</strong>
      </p>
    );
  } else {
    customMessage = (
      <p>
        please select one vehicle for planet <strong>{selectedPlanet}</strong>
      </p>
    );
  }

  return (
    <div className="customAlert-container">
      <div className="customAlert">
        {showSelections ? <h3>Confirm</h3> : <h3>OOPS !!!</h3>}
        {customMessage}

        {showSelections ? (
          <button onClick={handleFindButton}>FIND</button>
        ) : (
          <button onClick={handleAlertClick}>Ok</button>
        )}
      </div>
    </div>
  );
};
export default CustomAlert;
