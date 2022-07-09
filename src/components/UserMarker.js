import { CircleMarker } from "react-leaflet";
let count = 0;
export const UserMarker = ({ position }) => {
  return (
    position[0] &&
    position[1] && (
      <CircleMarker key={count++} center={position} autoPan={false} radius={10} autoPanPadding={false} />
    )
  );
};
