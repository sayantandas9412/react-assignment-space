import React from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import "./Header.styles.scss";

const Header = ({ selectedPlanets }) => {
  const history = useHistory();
  return (
    <div className="heading-container">
      <div className="heading-primary">
        <h1>Finding Falcone!</h1>
      </div>
      <Link className="header-navlink" to="/story">
        The Story
      </Link>
      {selectedPlanets.length ? (
        <button className="reset-button button" onClick={() => history.go(0)}>
          Reset
        </button>
      ) : null}
    </div>
  );
};

export default Header;
