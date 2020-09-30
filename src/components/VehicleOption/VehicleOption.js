import React from "react";
import "./VehicleOption.styles.scss";

const VehicleOption = ({
  vehicle,
  id,
  handleVehicleChange,
  vehicleDisabled,
  handleInputRadioClick,
  selectedVehicle,
}) => {
  let labelStyles = selectedVehicle === vehicle.name ? "selected" : "";

  return (
    <fieldset disabled={vehicleDisabled} className="fieldset-vehicle">
      <input
        type="radio"
        className="option-input radio"
        name="vehicle"
        value={vehicle.name}
        onChange={handleVehicleChange}
        onClick={handleInputRadioClick}
        disabled={vehicle.vehicleDisabled}
      />
      <label
        id={id}
        className={`label-vehicle  ${labelStyles} ${
          vehicle.vehicleDisabled ? "label-disabled" : ""
        }`}
      >
        {vehicle.name} ({vehicle.total_no >= 0 && vehicle.total_no})
      </label>
    </fieldset>
  );
};

export default VehicleOption;
