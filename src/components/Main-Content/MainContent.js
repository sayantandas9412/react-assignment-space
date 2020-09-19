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
  ...props
}) => {
  let disabledButton = selectedVehicles.length === 4 ? false : true;

  return (
    <div className="main-container">
      {loading ? (
        <div>
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
          <Time timeTaken={timeTaken} />
          <button
            className="button-findFalcone button"
            onClick={handleFindButton}
            disabled={disabledButton}
          >
            Find Falcone
          </button>
        </>
      )}
    </div>
  );
};
export default MainContent;
