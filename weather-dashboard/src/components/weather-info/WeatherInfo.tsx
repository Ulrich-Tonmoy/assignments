import { CurrentWeatherModel } from "../../models/Weather";
import "./WeatherInfo.css";

interface WeatherInfoProps {
  data: CurrentWeatherModel;
}

const WeatherInfo = ({ data }: WeatherInfoProps) => {
  return (
    <div className="weather-container">
      <div className="top">
        <div>
          <p className="city">{new Date().toDateString()}</p>
          <p className="city">{data?.city}</p>
          <p className="weather-description">{data?.weather[0].description}</p>
        </div>
        <img
          alt="weather"
          className="weather-icon"
          src={`icons/${data?.weather[0].icon}.png`}
        />
      </div>
      <div className="bottom">
        <p className="temperature">{Math.round(data?.main.temp - 273.15)}°C</p>
        <div className="details">
          <div className="parameter-row">
            <span className="parameter-label">Details</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Feels like</span>
            <span className="parameter-value">
              {Math.round(data?.main.feels_like - 273.15)}°C
            </span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Wind</span>
            <span className="parameter-value">
              {Math.round(data?.wind.speed * 3.6)} km/h
            </span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Humidity</span>
            <span className="parameter-value">{data?.main.humidity}%</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Pressure</span>
            <span className="parameter-value">{data?.main.pressure} hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;
