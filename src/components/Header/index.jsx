import React, { useEffect, useState } from "react";
import { Box, IconButton } from "@mui/material";
import img from "../../assets/weather.jpg";
import Weather from "../Weather";

const days = ["Sun", "Mon", "Tues", "Wed", "Thus", "Fri", "Sat"];

function time(date) {
  const toHours = date.getHours();
  const toMinutes = date.getMinutes();

  return `${toHours.toString().padStart(2, "0")}:${toMinutes
    .toString()
    .padStart(2, "0")}`;
}

const Header = () => {
  const [timeNow, setTimeNow] = useState(new Date());

  useEffect(() => {
    const code = setInterval(() => {
      setTimeNow(new Date());
    }, 1000);

    return () => clearInterval(code);
  }, [setTimeNow]);

  const today = timeNow.getDate();

  return (
    <Box
      sx={{
        position: "relative",
        margin: "20px 0px",
        padding: 3,
        background: `url(${img}) no-repeat center`,
        backgroundSize: "cover",
        width: 850,
        height: 340,
        borderRadius: "15px",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        <h2 style={{ color: "white", margin: "0px" }}>
          {days[timeNow.getDay()]} {today}
        </h2>
        <h3 style={{ color: "white", margin: "0px" }}>{time(timeNow)}</h3>
      </Box>
      <Weather />
    </Box>
  );
};

export default Header;
