import axios from "axios";

const WEATHER_API = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
});

export const fetchWeather = async (query: string) =>
  WEATHER_API.get(`${query}&appid=${import.meta.env.VITE_WEATHER_API_KEY}`);

const LOC_API = axios.create({
  baseURL: "https://api.openweathermap.org/geo/1.0",
});

export const fetchLocations = async (city: string) =>
  LOC_API.get(`/direct?q=${city}&appid=${import.meta.env.VITE_WEATHER_API_KEY}`);
