import { ForecastListModel } from "../../../models/Forecast";
import "./Forecast.css";

interface ForecastProps {
  item: ForecastListModel;
  forecastDays: Array<string>;
  index: number;
}

const Forecast = ({ item, forecastDays, index }: ForecastProps) => {
  return (
    <div className="card">
      <div className="daily-item">
        <img
          src={`icons/${item.weather[0].icon}.png`}
          className="icon-small"
          alt="weather"
        />
        <label className="day">{forecastDays[index]}</label>
        <div className="desc-container">
          <label className="description">{item.weather[0].description}</label>
          <label className="min-max">
            {Math.round(item.main.temp_max - 273.15)}°C /
            {Math.round(item.main.temp_min - 273.15)}°C
          </label>
        </div>
      </div>
      <div>
        <div className="daily-details-grid">
          <div className="daily-details-grid-item">
            <label>Pressure:</label>
            <label>{item.main.pressure}</label>
          </div>
          <div className="daily-details-grid-item">
            <label>Humidity:</label>
            <label>{item.main.humidity}%</label>
          </div>
          <div className="daily-details-grid-item">
            <label>Clouds:</label>
            <label>{item.clouds.all}%</label>
          </div>
          <div className="daily-details-grid-item">
            <label>Wind speed:</label>
            <label>{Math.round(item?.wind.speed * 3.6)} km/h</label>
          </div>
          <div className="daily-details-grid-item">
            <label>Sea level:</label>
            <label>{item.main.sea_level}m</label>
          </div>
          <div className="daily-details-grid-item">
            <label>Feels like:</label>
            <label>{Math.round(item.main.feels_like - 273.15)}°C</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forecast;
