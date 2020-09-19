import React from "react";
import "./VehicleOption.styles.scss";

const VehicleOption = ({
  vehicle,
  id,
  handleVehicleChange,
  vehicleDisabled,
}) => {
  return (
    <fieldset disabled={vehicleDisabled} className="fieldset-vehicle">
      <input
        type="radio"
        className="option-input radio"
        name="vehicle"
        value={vehicle.name}
        onChange={handleVehicleChange}
        disabled={vehicle.vehicleDisabled}
      />
      <label
        className={`label-vehicle ${
          vehicle.vehicleDisabled ? "label-disabled" : ""
        }`}
      >
        {vehicle.name} ({vehicle.total_no >= 0 && vehicle.total_no})
      </label>
    </fieldset>
  );
};

export default VehicleOption;
