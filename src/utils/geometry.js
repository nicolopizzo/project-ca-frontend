import { Polygon } from "react-leaflet";
/** Colors: */
const colors = ["#754E23", "#FFC180", "#C2894D", "#175C75", "#4EA3C2"];

const colorMap = (count) => {
  if (count < 1) {
    return colors[0];
  } else if (count < 2) {
    return colors[1];
  } else if (count < 4) {
    return colors[2];
  } else if (count < 6) {
    return colors[3];
  }

  return colors[4];
};

let counter = 0;

export const areaToGeoJSON = (hm) => {
  return (
    <Polygon
      key={counter++}
      positions={hm.area.map((c) => [c[1], c[0]])}
      color={colorMap(hm.count)}
    />
  );
};
