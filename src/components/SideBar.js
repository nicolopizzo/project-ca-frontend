import { Button } from "./Button";
import { Legend, POILegend } from "./Legend";
import { Header } from "./Header";
import { ClusterOptions } from "./ClusterOptions";
import { useState } from "react";
import { ClusteringModal } from "./ClusteringModal";

export const SideBar = ({
  handleDefault,
  handlePOI,
  handleActivity,
  handleClustering,
  showLegend = false,
}) => {
  const [time, setTime] = useState("all");
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div style={{ backgroundColor: "#30475E", height: "100%" }}>
      <Header />
      <Button text="DEFAULT" onClick={handleDefault} />
      <Button text="DENSITÀ POI" onClick={handlePOI} />
      <Button text="DENSITÀ UTENTI" onClick={handleActivity} />
      <Button
        text="CLUSTERING SPAZIALE"
        onClick={(e) => {
          setIsOpen(true);
        }}
      />
      {/* <ClusterOptions handleChange={setTime} /> */}
      <POILegend />
      <ClusteringModal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        onSubmit={(startTime, endTime) => {
          setIsOpen(false);
          handleClustering(startTime, endTime);
        }}
      />
      {showLegend && <Legend />}
    </div>
  );
};
