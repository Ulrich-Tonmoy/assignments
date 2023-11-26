import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { ForecastListModel } from "../../../models/Forecast";
import "./ForecastChart.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

interface ForecastChartProps {
  data: ForecastListModel[];
}

const ForecastChart = ({ data }: ForecastChartProps) => {
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

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 2,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Weather Forecast For next five days",
      },
    },
  };

  const labels = forecastDays.slice(0, 5);

  const formattedData = {
    labels,
    datasets: [
      {
        label: "Temperature (°C)",
        data: data?.map((item: ForecastListModel) =>
          Math.round(item.main.feels_like - 273.15),
        ),
        borderColor: "rgb(255, 108, 0)",
        backgroundColor: "rgba(255, 108, 0, 0.5)",
      },
      {
        label: "Wind Speed (km/h)",
        data: data?.map((item: ForecastListModel) => Math.round(item?.wind.speed * 3.6)),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Humidity (%)",
        data: data?.map((item: ForecastListModel) => item.main.humidity),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Cloud (%)",
        data: data?.map((item: ForecastListModel) => item.clouds.all),
        borderColor: "rgb(115, 204, 216)",
        backgroundColor: "rgba(115, 204, 216, 0.5)",
      },
    ],
  };

  return (
    <div className="chart-container">
      <Line options={options} data={formattedData} />
    </div>
  );
};

export default ForecastChart;
