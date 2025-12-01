import "./WeatherApp.css";
import InfoBox from "./InfoBox";
import SearchBox from "./SearchBox";
import { useState } from "react";

export default function WeatherApp() {
  const [weatherInfo, setWeatherInfo] = useState(null);

  let updateInfo = (newInfo) => {
    setWeatherInfo(newInfo);
  };

  return (
    <div className="weatherAppContainer">
      <h2 className="appHeading">
        <span className="icon">🌦️</span>
        Weather Forecast
        <span className="sub">by Yuvraj</span>
      </h2>

      <SearchBox updateInfo={updateInfo} />

      {weatherInfo && <InfoBox info={weatherInfo} />}

      {!weatherInfo && (
        <p className="welcomeText">🔍 Search any city to view weather details</p>
      )}
    </div>
  );
}
