import React from "react";
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router";
import "./Result.styles.scss";

const Result = ({ status, timeTaken, planetFound }) => {
  let history = useHistory();

  function reloadComponent() {
    history.go(0);
  }
  function pushPageToHome() {
    history.push("/");
  }

  return (
    <div className="result-container">
      {status === "success" ? (
        <div className="result-success">
          <h1>Success !</h1>
          <h2>
            {" "}
            Congratulations on Finding Falcone. King Shan will be pleased
          </h2>
          <h3>Time Taken: {timeTaken}</h3>
          <h3>Planet Found: {planetFound}</h3>
        </div>
      ) : (
        <div className="result-failure">
          <h1>Oops ! Couldn't find Falcone on these Planets</h1>
        </div>
      )}

      <button
        onClick={() => {
          pushPageToHome();
          reloadComponent();
        }}
        className="button-startAgain button"
      >
        Start Again
      </button>
    </div>
  );
};
export default withRouter(Result);
