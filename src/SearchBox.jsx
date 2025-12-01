import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import "./SearchBox.css";
import { useState } from "react";

export default function SearchBox({ updateInfo }) {
  let [city, setCity] = useState("");
  let [error, setError] = useState(false);
  let [loading, setLoading] = useState(false);

  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "d720536c882a6946ecff6d04b69b4524";

  const citySuggestions = [
    "Hyderabad",
    "Vijayawada",
    "Delhi",
    "Mumbai",
    "Bangalore",
    "Chennai",
    "Kolkata",
    "Pune",
    "Dubai",
    "New York",
  ];

  let getWeatherInfo = async () => {
    let res = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
    let jsonRes = await res.json();
    if (jsonRes.cod !== 200) throw new Error("City not found");

    return {
      city: jsonRes.name,
      temp: jsonRes.main.temp,
      tempMin: jsonRes.main.temp_min,
      tempMax: jsonRes.main.temp_max,
      humidity: jsonRes.main.humidity,
      feelsLike: jsonRes.main.feels_like,
      weather: jsonRes.weather[0].description,
      wind: jsonRes.wind.speed,
      country: jsonRes.sys.country,
    };
  };

  let handleSubmit = async (event) => {
    event.preventDefault();
    if (!city.trim()) return;
    try {
      setLoading(true);
      setError(false);
      let info = await getWeatherInfo();
      updateInfo(info);
      setCity("");
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="SearchBox">
      <form onSubmit={handleSubmit} className="searchForm">
        <div className="inputContainer">
          <Autocomplete
            freeSolo
            options={citySuggestions}
            value={city}
            onInputChange={(e, newVal) => {
              setCity(newVal);
              setError(false);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Search City" variant="outlined" required />
            )}
            sx={{ width: "100%" }} // makes input full width
          />
        </div>

        <Button
          variant="contained"
          type="submit"
          disabled={loading}
          className="searchButton"
        >
          {loading ? <CircularProgress size={26} /> : "Search"}
        </Button>

        {error && (
          <p className="errorText">🚫 No such city found — try a different spelling.</p>
        )}
      </form>
    </div>
  );
}
