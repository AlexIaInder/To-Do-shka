const API_KEY = "32ecb709352faa3615946c510a69be8b";

const createIconURL = (iconId) =>
  `https://openweathermap.org/img/wn/${iconId}@2x.png`;

const getFormattedWeatherDate = (city, units = "metric") => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;

  return fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      if (!data?.weather) return null;

      const {
        weather,
        main: { temp, temp_max, temp_min, feels_like, humidity, pressure },
        wind: { speed },
        sys: { country },
        name,
      } = data;

      const { description, icon } = weather[0];
      return {
        temp,
        temp_max,
        temp_min,
        feels_like,
        humidity,
        pressure,
        speed,
        country,
        description,
        iconURL: createIconURL(icon),
        name,
      };
    });
};

export default getFormattedWeatherDate;
