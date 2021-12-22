import "./App.css";

import { useEffect, useState } from "react";

import optionsIcon from "./images/icon-ellipsis.svg";
import profilePic from "./images/image-jeremy.png";

function App() {
  const [data, setData] = useState([]);
  const [timePeriod, setTimePeriod] = useState("weekly");
  const [previousMessage, setPreviousMessage] = useState("Last Week");

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

  const periodChangeHandler = ({ target: { name } }) => {
    setTimePeriod(name);
    if (name === "daily") setPreviousMessage("Previous Day");
    if (name === "weekly") setPreviousMessage("Last Week");
    if (name === "monthly") setPreviousMessage("Last Month");
  };

  return (
    <div className="grid">
      <div className="user">
        <div className="profile">
          <img className="profile__img" src={profilePic} alt="profile pic" />
          <span>Report for</span>
          <h2 className="profile__name">Jeremy Robson</h2>
        </div>
        <div className="time-options">
          <button
            onClick={periodChangeHandler}
            className={timePeriod === "daily" ? "showing" : ""}
            name="daily"
            type="button"
          >
            Daily
          </button>
          <button
            onClick={periodChangeHandler}
            className={timePeriod === "weekly" ? "showing" : ""}
            name="weekly"
            type="button"
          >
            Weekly
          </button>
          <button
            onClick={periodChangeHandler}
            className={timePeriod === "monthly" ? "showing" : ""}
            name="monthly"
            type="button"
          >
            Monthly
          </button>
        </div>
      </div>
      {data.map((entry) => (
        <div
          key={Math.random() + entry.title}
          className={"card " + entry.title.toLowerCase().replace(/\s/g, "-")}
        >
          <h2 className="activity">{entry.title}</h2>
          <button className="btn" type="button">
            <img src={optionsIcon} alt="..." />
          </button>
          <h3 className="current-period">
            {entry.timeframes[timePeriod].current}hrs
          </h3>
          <p className="previous-period">
            {previousMessage} - {entry.timeframes[timePeriod].previous}
            hrs
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;
