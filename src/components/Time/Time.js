import React from "react";
import "./Time.styles.scss";

const Time = ({ timeTaken }) => {
  return (
    <div className="time-container">
      <h2>Time Taken : {timeTaken}</h2>
    </div>
  );
};

export default Time;
