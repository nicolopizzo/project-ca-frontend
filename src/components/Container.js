import axios from "axios";
import { useRef, useState } from "react";
import { MyMap } from "./Map";
import { SideBar } from "./SideBar";

export const Container = () => {
  const [poisHm, setPoisHm] = useState([]);
  const [activityHm, setActivityHm] = useState([]);
  const [clusters, setClusters] = useState([]);
  const [showLegend, setShowLegend] = useState(false);

  const fetchPOI = async () => {
    const poisHeatMap = (await axios.get("http://localhost:3001/poi/zone"))
      .data;
    setPoisHm(poisHeatMap);
  };

  const fetchUsersHm = async () => {
    const activityHeatMap = (
      await axios.get("http://localhost:3001/activity/zone")
    ).data;

    setActivityHm(activityHeatMap);
  };

  const fetchCluster = async (interval) => {
    console.log(interval);
    const res = (await axios.get(`http://localhost:3001/activity/clustering?interval=${interval}`)).data;

    setClusters(res);
  };

  const invokeEveryTwoMinutes = (f) => setInterval(f, 120000);

  const poisInterval = useRef(null);
  const activityInterval = useRef(null);

  const setAllToNull = () => {
    setPoisHm([]);
    setActivityHm([]);
    setClusters([]);
    setShowLegend(false);
    clearInterval(poisInterval.current);
    clearInterval(activityInterval.current);
    clearInterval(clusters.current);
  };

  const handleDefault = () => {
    setAllToNull();
    setShowLegend(false);
  };

  const handlePOIHm = async () => {
    setAllToNull();
    setShowLegend(true);
    fetchPOI();
    poisInterval.current = invokeEveryTwoMinutes(fetchPOI);
    // poisInterval();
  };

  const handleActivityHM = async () => {
    setAllToNull();
    setShowLegend(true);
    fetchUsersHm();
    activityInterval.current = invokeEveryTwoMinutes(fetchUsersHm);
  };

  const handleClustering = async (interval) => {
    setAllToNull();
    fetchCluster(interval);
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
        <MyMap
          areaPois={poisHm}
          aeraUsers={activityHm}
          cloakedArea={clusters}
        />
      </div>
    </div>
  );
};
