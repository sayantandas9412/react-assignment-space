import React from "react";
import { useHistory } from "react-router-dom";
import "./Error.styles.scss";

const Error = ({ message, token }) => {
  let history = useHistory();
  function pushPageToHome() {
    history.push("/");
  }
  function reloadComponent() {
    history.go(0);
  }
  return (
    <div className="error-container">
      <h1>Something went wrong !!!</h1>
      <p>{token.token || message ? message : "Invalid Token"}</p>
      <button
        onClick={() => {
          pushPageToHome();
          reloadComponent();
        }}
        className="button-home button"
      >
        Home
      </button>
    </div>
  );
};

export default Error;
