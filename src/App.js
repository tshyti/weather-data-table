import React, { useLayoutEffect, useState } from "react";
import weatherDataApi from "./util/weatherDataApi";
import WeatherDataTable from "./components/WeatherDataTable/WeatherDataTable";
import CitiesDropdown from "./components/CitiesDropdown/CitiesDropdown";
import MainLayout from "./components/Layout/Layout";
import { PageHeader } from "antd";

export default function App() {
  const [weatherDataLoading, setWeatherDataLoading] = useState(false);
  const [weatherData, setWeatherData] = useState([]);
  const [weatherDataError, setWeatherDataError] = useState(null);

  async function getWeatherData(cityId) {
    setWeatherDataLoading(true);
    try {
      const { data } = await weatherDataApi.get("/daily", {
        params: { cnt: 16, id: cityId, units: "imperial" }
      });
      setWeatherData(data);
    } catch (error) {
      setWeatherDataError(error.response);
    } finally {
      setWeatherDataLoading(false);
    }
  }

  function handleCitySelect(cityId) {
    getWeatherData(cityId);
  }

  if (weatherDataError) {
    return <h1>error</h1>;
  }

  return (
    <MainLayout>
      <PageHeader
        style={{
          backgroundColor: "#ffffff",
          margin: "24px 0px",
          padding: "10px 24px"
        }}
        title="Select city"
      >
        <CitiesDropdown onSelectCity={handleCitySelect} />
      </PageHeader>
      <WeatherDataTable data={weatherData.list} loading={weatherDataLoading} />
    </MainLayout>
  );
}
