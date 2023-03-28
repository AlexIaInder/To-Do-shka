import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import TagFacesOutlinedIcon from "@mui/icons-material/TagFacesOutlined";
import CompressOutlinedIcon from "@mui/icons-material/CompressOutlined";
import OpacityOutlinedIcon from "@mui/icons-material/OpacityOutlined";
import WindPowerOutlinedIcon from "@mui/icons-material/WindPowerOutlined";
import getFormattedWeatherDate from "../../api/weatherApi";
import { useDebounce } from "../../hooks/useDebounce";

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [city, setCity] = useState("Kyiv");
  const debouncedCity = useDebounce(city, 500);

  useEffect(() => {
    getFormattedWeatherDate(debouncedCity, units).then((data) => {
      setWeather(data);
    });
  }, [units, debouncedCity]);

  const changeMetric = () => {
    setUnits((prev) => (prev === "metric" ? "imperial" : "metric"));
  };

  const value = units === "metric" ? "C" : "F";

  return (
    <Box sx={{ color: "white" }}>
      <Box>
        <TextField
          label="city"
          variant="filled"
          placeholder="Enter City..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          inputProps={{ sx: { color: "white" } }}
        />
        <Button
          onClick={changeMetric}
          variant="contained"
          sx={{ height: "55px" }}
        >
          °{units === "metric" ? "F" : "C"}
        </Button>
      </Box>
      {weather && (
        <Box>
          <Box>
            <Typography>{`${weather.name}, ${weather.country}`}</Typography>
            <img src={weather.iconURL} alt="image weather" />
            <Typography>{weather.description.toUpperCase()}</Typography>
          </Box>
          <Box>
            <Typography>
              {weather.temp.toFixed()}°{value}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <ArrowDownwardOutlinedIcon sx={{ color: "#d2d5e1" }} />
              <Typography>Min</Typography>
              <Typography>
                {weather.temp_min.toFixed()}°{value}
              </Typography>
            </Box>

            <Box>
              <ArrowUpwardOutlinedIcon sx={{ color: "#d2d5e1" }} />
              <Typography>Max</Typography>
              <Typography>
                {weather.temp_max.toFixed()}°{value}
              </Typography>
            </Box>

            <Box>
              <TagFacesOutlinedIcon sx={{ color: "#d2d5e1" }} />
              <Typography>Feel good</Typography>
              <Typography>
                {weather.feels_like.toFixed()}°{value}
              </Typography>
            </Box>

            <Box>
              <CompressOutlinedIcon sx={{ color: "#d2d5e1" }} />
              <Typography>Pressure</Typography>
              <Typography>{weather.pressure} hPa</Typography>
            </Box>
            <Box>
              <OpacityOutlinedIcon sx={{ color: "#d2d5e1" }} />
              <Typography>Humidity</Typography>
              <Typography>{weather.humidity}%</Typography>
            </Box>
            <Box>
              <WindPowerOutlinedIcon sx={{ color: "#d2d5e1" }} />
              <Typography>Wind Speed</Typography>
              <Typography>
                {weather.speed.toFixed(1)}
                {units === "metric" ? "m/s" : "ft/s"}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Weather;
