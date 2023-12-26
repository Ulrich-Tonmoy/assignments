import { Period } from "../../lib/types";
import "./Tab.css";
import { useState, useEffect } from "react";

interface TabProps {
  handleChangeSelection: (givenPeriod: Period) => void;
}

const Tab = ({ handleChangeSelection }: TabProps) => {
  const [active, setActive] = useState("");

  const handleClick = (period: Period) => {
    handleChangeSelection(period);
    setActive(period);
  };

  useEffect(() => {
    handleClick(Period.ALL_TIME);

    return handleClick(Period.ALL_TIME);
  }, []);

  return (
    <nav className="tab-container">
      {Object.values(Period).map((value: Period, index: number) => (
        <div
          key={index}
          className={`tab-title ${active === value ? "active" : ""}`}
          onClick={() => handleClick(value)}
        >
          {value}
        </div>
      ))}
    </nav>
  );
};

export default Tab;
