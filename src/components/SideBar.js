import { Button } from "./Button";
import { Legend, POILegend } from "./Legend";
import { Header } from './Header'
import { ClusterOptions } from "./ClusterOptions";
import { useState } from "react";

export const SideBar = ({ handleDefault, handlePOI, handleActivity, handleClustering, showLegend = false }) => {
  const [time, setTime] = useState("all");
  return (
    <div style={{ backgroundColor: "#30475E", height: "100%" }}>
      <Header />
      <Button text="DEFAULT" onClick={handleDefault} />
      <Button text="DENSITÀ POI" onClick={handlePOI} />
      <Button text="DENSITÀ UTENTI" onClick={handleActivity} />
      <Button text="CLUSTERING SPAZIALE" onClick={e => handleClustering(time)} />
      <ClusterOptions handleChange={setTime} />
      <POILegend />
      {showLegend && <Legend />}
    </div>
  );
};
