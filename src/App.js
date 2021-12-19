import "./App.css";

import { useEffect, useState } from "react";

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

  console.log(data);

  return (
    <div>
      {data.map((info) => (
        <div>{info.timeframes.daily.current}</div>
      ))}
    </div>
  );
}

export default App;
