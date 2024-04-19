import React, { useState } from "react";
import infoIcon from "./info.png";

const Flag = ({ flagData, input }) => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="">
      <div className="flag-container" onClick={togglePopup}>
        {flagData.map((flag) => (
          <div className="block">
            <img
              className="flagimg"
              src={flag.flag}
              alt={`${flag.name} flag`}
            />
            <span className="">{flag.name}</span>
          </div>
        ))}
      </div>
      {showPopup && (
        <div className="overlay">
          <div className="popup">
            <span class="">
              <img src={infoIcon} alt="User Icon" className="info-icon" />
              {input}
            </span>

            <div className="flag-container">
              {flagData.map((flag) => (
                <div className="block">
                  <img
                    className="flagimg"
                    src={flag.flag}
                    alt={`${flag.name} flag`}
                  />
                  <span className="">{flag.name}</span>
                </div>
              ))}
            </div>
            <button className="close" onClick={togglePopup}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Flag;
