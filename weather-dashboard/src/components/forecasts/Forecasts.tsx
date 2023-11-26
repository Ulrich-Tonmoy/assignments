import { ForecastListModel, ForecastModel } from "../../models/Forecast";
import "./Forecasts.css";
import ForecastChart from "./chart/ForecastChart";
import Forecast from "./forecast/Forecast";

interface ForecastsProps {
  data: ForecastModel;
}

const Forecasts = ({ data }: ForecastsProps) => {
  const WEEK_DAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInAWeek),
  );

  const fiveDaysData = data?.list.splice(0, 5);

  return (
    <div className="forecast-container">
      <label className="title">Next 5 Days Forecast</label>
      <div className="card-container">
        {fiveDaysData?.map((item: ForecastListModel, i: number) => (
          <Forecast key={i} item={item} forecastDays={forecastDays} index={i} />
        ))}
      </div>

      {fiveDaysData && <ForecastChart data={fiveDaysData} />}
    </div>
  );
};

export default Forecasts;
