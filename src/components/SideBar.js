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
  const [ranges, setRanges] = useState([4, 9, 14, 15]);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div style={{ backgroundColor: "#30475E", height: "100%" }}>
      <Header />
      <Button text="DEFAULT" onClick={handleDefault} />
      <Button text="DENSITÀ POI" onClick={(e) => {handlePOI(); setRanges([0.15, 0.3, 0.45])}} />
      <Button text="CHECK-IN UTENTI" onClick={(e) => {handleActivity(); setRanges([10, 20, 30, 40])}} />
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
      {showLegend && <Legend ranges={ranges} />}
    </div>
  );
};
