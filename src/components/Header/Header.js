import React from "react";
import { useHistory } from "react-router";
import "./Header.styles.scss";

const Header = (props) => {
  const history = useHistory();
  return (
    <div className="heading-container">
      <div className="heading-primary">
        <h1>Finding Falcone!</h1>
      </div>

      <button className="reset-button" onClick={() => history.go(0)}>
        Reset
      </button>
    </div>
  );
};

export default Header;
