import React, { useState, useEffect } from "react";
import axios from "axios";
import CountrySelector from "./CountrySelector";
import Flag from "./Flag";
import sendImg from "./send.png";
import userIcon from "./user.png";
import systemIcon from "./system.png";

import "./Chat.css";

const Chat = () => {
  const [flagData, setFlagData] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [countryCart, setCountryCart] = useState([]);
  const [inputData, setInputData] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [messageInput, setMessagesInput] = useState("");

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        const countriesData = response.data.map((country) => ({
          name: country.name.common,
          flag: country.flags.svg,
        }));
        setCountries(countriesData);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  const handleCountryChange = (country) => {
    console.log("clicked country selection", country);
    setSelectedCountry(country);
    let countryInput = inputData + "," + country;
    setInputData(countryInput);
  };

  const handleMessageSubmit = (message) => {
    setMessages([...messages, { text: message, sender: "user" }]);
    setMessagesInput(message);
    const temp = [];
    const data = [];
    let messageSplit = message.split(",");
    console.log(message);
    messageSplit = messageSplit.map((a) => a.trim());
    for (let i = 0; i < countries.length; i++) {
      for (let j = 0; j < messageSplit.length; j++) {
        if (countries[i].name.toLowerCase() == messageSplit[j].toLowerCase()) {
          temp.push(countries[i].name);
        }
      }
    }
    console.log(temp);
    setCountryCart(temp);
    console.log(countryCart);
    for (let i = 0; i < countries.length; i++) {
      for (let j = 0; j < temp.length; j++) {
        if (countries[i].name.toLowerCase() == temp[j].toLowerCase()) {
          data.push(countries[i]);
        }
      }
    }

    setFlagData(data);
    console.log(data);
    setInputData("");
  };

  return (
    <div className={`chat-container ${expanded ? "expanded" : ""}`}>
      <div className="chatbot-header">
        <div className="heading">Country Flags</div>
        <button
          className="expand-button"
          id="expandButton"
          onClick={toggleExpand}
        >
          Expand
        </button>
      </div>
      <div className={`msg-block ${expanded ? "msgexpand" : ""}`}>
        <div className={`botmsg ${expanded ? "botexpand" : "botcollapse"}`}>
          <div
            className={`message-container ${
              expanded ? "expandmsg" : "collapsemsg"
            }`}
          >
            {messages.map((message, index) => (
              <div className="msg-box">
                <img
                  src={userIcon}
                  alt="User Icon"
                  className="icon user-icon"
                />
                <div key={index} className={`message ${message.sender}`}>
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <div className={`${expanded ? "expandmsg" : "collapsemsg"}`}>
            {flagData.length > 0 && (
              <div className="flag-box">
                <img
                  src={systemIcon}
                  alt="User Icon"
                  className="icon system-icon"
                />
                <Flag flagData={flagData} input={messageInput} />
              </div>
            )}
          </div>
        </div>
        <div className={`country-selector ${expanded ? "countrySelect" : ""}`}>
          {
            <CountrySelector
              countries={countries}
              selectedCountry={selectedCountry}
              onCountryChange={handleCountryChange}
              expandedFlag={expanded}
            />
          }
        </div>
      </div>
      <div className="chatbot-input">
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Type your message..."
            className="messageInput"
            value={inputData}
            onChange={(e) => {
              setInputData(e.target.value);
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleMessageSubmit(e.target.value);
                e.target.value = "";
              }
            }}
          />
          <button
            className="send-button"
            onClick={() => handleMessageSubmit(inputData)}
          >
            <img src={sendImg} alt="Send" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
