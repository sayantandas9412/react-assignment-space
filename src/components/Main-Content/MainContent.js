import React from "react";
import "./MainContent.styles.scss";
import Time from "../Time/Time";
import PlanetAndVehicle from "../Planet-And-Vehicle/PlanetAndVehicle";

const MainContent = ({
  loading,
  planets,
  vehicles,
  handleSelectChange,
  handleVehicleChange,
  timeTaken,
  handleFindButton,
  selectedVehicles,
  handleSubmitButton,
  ...props
}) => {
  let disabledButton = selectedVehicles.length === 4 ? false : true;

  return (
    <div className="main-container">
      {loading ? (
        <div className="loading">
          <h2>Loading...</h2>
        </div>
      ) : (
        <>
          <div className="paragraph">
            <p>Select planets you want to search in</p>
          </div>
          <PlanetAndVehicle
            {...props}
            planets={planets}
            vehicles={vehicles}
            handleSelectChange={handleSelectChange}
            handleVehicleChange={handleVehicleChange}
          />

          <div className="time-container">
            {" "}
            <Time timeTaken={timeTaken} />
            <button
              className="button-findFalcone button"
              onClick={handleSubmitButton}
              disabled={disabledButton}
            >
              Find Falcone
            </button>
          </div>
        </>
      )}
    </div>
  );
};
export default MainContent;
