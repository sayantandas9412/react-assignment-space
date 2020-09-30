import React from "react";
import { useHistory } from "react-router-dom";
import "./Story.styles.scss";

const Story = () => {
  let history = useHistory();
  return (
    <div className="story-container">
      <div className="story">
        {" "}
        <p>
          Our problem is set in the planet of Lengaburu…in the distant galaxy of
          Tara B. After the recent war with neighbouring planet Falicornia, King
          Shan has exiled the Queen of Falicornia for 15 years. Queen Al Falcone
          is now in hiding. But if King Shan can find her before the years are
          up, she will be exiled for another 15 years….
        </p>
        <p>
          King Shan has received intelligence that Al Falcone is in hiding in
          one of these 6 planets - DonLon, Enchai, Jebing, Sapir, Lerbin &
          Pingasor. However he has limited resources at his disposal & can send
          his army to only 4 of these planets.
        </p>
        <p>We have to help King Shan find Al Falcone.</p>
      </div>
      <button
        className="letsStart-button button"
        onClick={() => history.push("/")}
      >
        Lets Start
      </button>
    </div>
  );
};

export default Story;
