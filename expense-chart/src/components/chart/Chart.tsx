import Doughnut from "../Doughnut/Doughnut";
import Label from "../label/Label";
import Tab from "../tab/Tab";
import data from "../../lib/expense-data.json";
import "./Chart.css";
import { useState } from "react";
import { ChartData, Period } from "../../lib/types";

const Chart = () => {
  const [selectedData, setSelectedData] = useState<ChartData>();

  const handleChangeSelection = (givenPeriod: Period) => {
    const filteredData = data.filter((item) => item.period === givenPeriod)[0];
    setSelectedData(filteredData);
  };

  return (
    <div className="chart-container">
      <h1 className="chart-title">Expenses</h1>
      <Tab handleChangeSelection={handleChangeSelection} />
      {selectedData && (
        <>
          <div className="donut_chart">
            <Doughnut {...selectedData} />
          </div>
          <Label {...selectedData} />
        </>
      )}
    </div>
  );
};

export default Chart;
