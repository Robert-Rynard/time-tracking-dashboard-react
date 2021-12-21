import "./App.css";

import { useEffect, useState } from "react";

import profilePic from "./images/image-jeremy.png";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("data.json")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((data) => setData(data))
      .catch((err) => console.error("Error fetching data: ", err));
  }, []);

  return (
    <div className="grid">
      <div>
        <div className="profile">
          <img className="profile__img" src={profilePic} alt="profile pic" />
          <span>Report for</span>
          <h2 className="profile__name">Jeremy Robson</h2>
        </div>
        <div className="time-options">
          <button type="button">Daily</button>
          <button type="button">Weekly</button>
          <button type="button">Monthly</button>
        </div>
      </div>
      {data.map((entry) => (
        <div
          className={"card " + entry.title.toLowerCase().replace(/\s/g, "-")}
        >
          <h2>{entry.title}</h2>
          <button type="button">
            <img src="./images/icon-ellipsis.svg" alt="..." />
          </button>
          <h3>{entry.timeframes.weekly.current}hrs</h3>
          <p>Last Week - {entry.timeframes.weekly.previous}hrs</p>
        </div>
      ))}
    </div>
  );
}

export default App;
