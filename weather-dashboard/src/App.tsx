import Search from "./components/Search";
import "./App.css";
import WeatherInfo from "./components/weather-info/WeatherInfo";
import { fetchWeather } from "./api/weatherApi";
import { useState } from "react";
import Forecasts from "./components/forecasts/Forecasts";
import Loader from "./components/loader/Loader";
import Empty from "./components/empty/Empty";
import { CurrentWeatherModel } from "./models/Weather";
import { ForecastModel } from "./models/Forecast";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeatherModel>();
  const [forecasts, setForecasts] = useState<ForecastModel>();
  const [isLoading, setIsLoading] = useState(false);

  const onSearchChange = async (searchData: { label: string; value: string }) => {
    setIsLoading(true);
    const [lat, lon] = searchData.value.split(" ");

    try {
      const weatherRes = await fetchWeather(`/weather?lat=${lat}&lon=${lon}`);
      const forecastRes = await fetchWeather(`/forecast?lat=${lat}&lon=${lon}`);

      setCurrentWeather({ city: searchData.label, ...weatherRes.data });
      setForecasts({ city: searchData.label, ...forecastRes.data });

      if (!weatherRes.data || !forecastRes.data) {
        toast.warn(`No data available for city: ${searchData.label}.`, {
          theme: "colored",
        });
      }
      setIsLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response.data.message, {
        theme: "colored",
      });
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container">
        <Search onSearchChange={onSearchChange} />
        {!currentWeather && !forecasts && !isLoading && <Empty />}
        {isLoading && <Loader />}
        {currentWeather && !isLoading && <WeatherInfo data={currentWeather} />}
        {forecasts && !isLoading && <Forecasts data={forecasts} />}
      </div>
    </>
  );
}

export default App;
