import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  // defing state variable to store weather data
  const [weatherData, setWeatherData] = useState(null);

  // fetching data from heroku server
  // useing res.data == weather.json
  useEffect(() => {
    axios
      .get("https://deepu2560-weather.herokuapp.com/query")
      .then(({ data }) => {
        setWeatherData(() => data.results.channel);
      });
  }, []);

  console.log(weatherData);

  // returning HTML code to render on screen
  // div with class App is main div which contain element inside it
  if (weatherData) {
    return (
      <div className="App">
        <div className="weather">
          <div className="current-weather">
            <div>
              <p id="temperature">
                {weatherData.item.condition.temp} <span>°F</span>
              </p>
              <h2 style={{ margin: 0 }}>
                {weatherData.location.city}, {weatherData.location.country}
              </h2>
              <p style={{ margin: 0, fontSize: "medium" }}>
                {weatherData.item.condition.date}
              </p>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                class="bi bi-cloud-haze2"
                viewBox="0 0 16 16"
              >
                <path d="M8.5 3a4.002 4.002 0 0 0-3.8 2.745.5.5 0 1 1-.949-.313 5.002 5.002 0 0 1 9.654.595A3 3 0 0 1 13 12H4.5a.5.5 0 0 1 0-1H13a2 2 0 0 0 .001-4h-.026a.5.5 0 0 1-.5-.445A4 4 0 0 0 8.5 3zM0 7.5A.5.5 0 0 1 .5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm2 2a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-2 4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z" />
              </svg>
              <p id="breezy">{weatherData.item.condition.text}</p>
            </div>
          </div>
          <div className="forcast">
            {weatherData.item.forecast.map(
              ({ date, day, high, low, code }, id) => {
                if (id < 7) {
                  return (
                    <div key={code}>
                      <h3 className="for-day">{day}</h3>
                      <p className="for-date">{date}</p>
                      <p>
                        <strong>High : </strong> {high}°F
                      </p>
                      <p>
                        <strong>Low : </strong> {low}°F
                      </p>
                    </div>
                  );
                }
              },
            )}
          </div>
        </div>
        <div className="more-details">
          <h2 style={{ textAlign: "center" }}>More Details</h2>
          <div>
            <p>
              <strong>Humidity</strong> :- {weatherData.atmosphere.humidity} %
            </p>
            <p>
              <strong>Wind</strong> :- {weatherData.wind.speed} mph
            </p>
            <p>
              <strong>Sun rise</strong> :- {weatherData.astronomy.sunrise}
            </p>
            <p>
              <strong>Sun set</strong> :- {weatherData.astronomy.sunset}
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="App">
        <h1>Loading...</h1>
      </div>
    );
  }
}

export default App;
