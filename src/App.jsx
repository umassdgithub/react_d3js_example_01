import "./App.css";
import * as d3 from "d3";
import React, { useEffect, useState } from "react";
import LineChart from "./components/LineChart";
function App() {
  const [tempData, setTempData] = useState([]);

  useEffect(() => {
    d3.csv(
      "https://raw.githubusercontent.com/umassdgithub/Sample_Data/main/Boston_temperature_2021.csv",
      (d) => {
        return {
          DATE: new Date(d.DATE),
          TAVG: +d.TAVG,
          TMAX: +d.TMAX,
          TMIN: +d.TMIN
        };
      }
    ).then((data) => {
      setTempData(data);
    });
  }, []);

  return (
    <div>
      <LineChart data={tempData} />
    </div>
  );
}

export default App;
