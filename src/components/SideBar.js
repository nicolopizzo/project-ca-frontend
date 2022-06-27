import { Button } from "./Button";
import { Legend } from "./Legend";

export const SideBar = ({ handleDefault, handlePOI, showLegend = false }) => {
  return (
    <div style={{ backgroundColor: "#30475E", height: "100%" }}>
      <Button text="DEFAULT" onClick={handleDefault} />
      <Button text="DENSITÀ POI" onClick={handlePOI} />
      <Button text="DENSITÀ UTENTI" onClick={handlePOI} />
      <Button text="CLUSTERING SPAZIALE" onClick={handlePOI} />
      {showLegend && <Legend />}
    </div>
  );
};
