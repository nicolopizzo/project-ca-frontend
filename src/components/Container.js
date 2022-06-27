import axios from "axios";
import { useState } from "react";
import { MyMap } from "./Map";
import { SideBar } from "./SideBar";

export const Container = () => {
  const [poisHm, setPoisHm] = useState([]);
  const [showLegend, setShowLegend] = useState(false);

  const setAllToNull = () => {
    setPoisHm([]);
    setShowLegend(false);
  }

  const handleDefault = () => {
    setAllToNull();
    setShowLegend(false);
  }
  
  const handlePOIHm = async () => {
    setAllToNull();
    setShowLegend(true);
    const poisHeatMap = (await axios.get("http://localhost:3001/poi/zone"))
    .data;
    
    setPoisHm(poisHeatMap);
  };

  return (
    <div style={{ float: "left", width: "100%", display: "flex" }}>
      <div style={{ flex: 4 }}>
        <MyMap areaPois={poisHm} />
      </div>
      <div style={{ flex: 1 }}>
        <SideBar showLegend={showLegend} handleDefault={handleDefault} handlePOI={handlePOIHm} />
      </div>
    </div>
  );
};
