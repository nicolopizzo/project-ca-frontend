import axios from "axios";
import { useState } from "react";
import { MyMap } from "./Map";
import { SideBar } from "./SideBar";

export const Container = () => {
  const [poisHm, setPoisHm] = useState([]);
  const [activityHm, setActivityHm] = useState([]);
  const [clusters, setClusters] = useState([]);
  const [showLegend, setShowLegend] = useState(false);

  const setAllToNull = () => {
    setPoisHm([]);
    setActivityHm([]);
    setClusters([])
    setShowLegend(false);
  };

  const handleDefault = () => {
    setAllToNull();
    setShowLegend(false);
  };

  const handlePOIHm = async () => {
    setAllToNull();
    setShowLegend(true);
    const poisHeatMap = (await axios.get("http://localhost:3001/poi/zone"))
      .data;

    setPoisHm(poisHeatMap);
  };

  const handleActivityHM = async () => {
    setAllToNull();
    setShowLegend(true);
    const activityHeatMap = (
      await axios.get("http://localhost:3001/activity/zone")
    ).data;

    setActivityHm(activityHeatMap);
  };

  const handleClustering = async () => {
    setAllToNull();

    const res = (await axios.get("http://localhost:3001/activity/users"))
      .data;

    setClusters(res);
  };

  return (
    <div style={{ float: "left", width: "100%", display: "flex" }}>
      <div style={{ flex: 1 }}>
        <SideBar
          showLegend={showLegend}
          handleDefault={handleDefault}
          handlePOI={handlePOIHm}
          handleActivity={handleActivityHM}
          handleClustering={handleClustering}
        />
      </div>
      <div style={{ flex: 4 }}>
        <MyMap areaPois={poisHm} aeraUsers={activityHm} cloakedArea={clusters} />
      </div>
    </div>
  );
};
