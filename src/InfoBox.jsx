import "./InfoBox.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

export default function InfoBox({ info }) {
  const { city, temp, humidity, tempMin, tempMax, weather, feelsLike } = info;

  const getWeatherImage = () => {
    if (!weather) return INIT_URL;

    const w = weather.toLowerCase();
    if (w.includes("cloud")) return CLOUDY_URL;
    if (w.includes("rain")) return RAINY_URL;
    if (w.includes("storm") || w.includes("thunder")) return STORM_URL;
    if (w.includes("snow")) return SNOW_URL;
    if (w.includes("clear")) return CLEAR_URL;
    return INIT_URL;
  };

  const getTempChip = () => {
    if (temp == null) return null;

    let label = "Mild";
    let color = "default";

    if (temp <= 15) {
      label = "Cold";
      color = "primary";
    } else if (temp > 15 && temp <= 30) {
      label = "Comfort";
      color = "success";
    } else {
      label = "Hot";
      color = "error";
    }

    return <Chip label={label} size="small" color={color} />;
  };

  const INIT_URL =
    "https://images.unsplash.com/photo-1708552592233-5934a64eaec0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0";
  const CLOUDY_URL =
    "https://images.unsplash.com/photo-1435224654926-ecc9f7fa028c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0";
  const RAINY_URL =
    "https://images.unsplash.com/photo-1601297183305-6df142704ea2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0";
  const STORM_URL =
    "https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0";
  const SNOW_URL =
    "https://images.unsplash.com/photo-1604537466573-5db19de54178?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0";
  const CLEAR_URL =
    "https://images.unsplash.com/photo-1524594154908-edd335d5842d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0";

  return (
    <div className="InfoBox">
      <div className="cardContainer">
        <Card
          className="infoCard"
          elevation={6}
          sx={{
            maxWidth: 380,
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          <CardMedia
            sx={{ height: 180 }}
            image={getWeatherImage()}
            title={weather || "Weather image"}
          />

          <CardContent>
            {/* Top: City + Temp */}
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mb={1.5}
            >
              <Box>
                <Typography variant="h5" component="div">
                  {city || "Your City"}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  {weather || "Weather details"}
                </Typography>
              </Box>

              <Box textAlign="right">
                <Typography variant="h3" component="p">
                  {temp != null ? `${Math.round(temp)}°` : "--"}
                </Typography>
                {getTempChip()}
              </Box>
            </Stack>

            {/* Middle: feels like */}
            <Typography
              variant="body2"
              color="text.secondary"
              className="feelsLikeText"
            >
              Feels like{" "}
              <strong>
                {feelsLike != null ? `${Math.round(feelsLike)}°C` : "--"}
              </strong>
            </Typography>

            {/* Bottom: grid stats */}
            <div className="infoGrid">
              <div className="infoItem">
                <span className="label">Min</span>
                <span className="value">
                  {tempMin != null ? `${Math.round(tempMin)}°C` : "--"}
                </span>
              </div>
              <div className="infoItem">
                <span className="label">Max</span>
                <span className="value">
                  {tempMax != null ? `${Math.round(tempMax)}°C` : "--"}
                </span>
              </div>
              <div className="infoItem">
                <span className="label">Humidity</span>
                <span className="value">
                  {humidity != null ? `${humidity}%` : "--"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
