import { Marker, Popup } from "react-leaflet";
import { toIcon } from "../assets/Icons";

export const POIMarker = ({ poi }) => {
  const { id, position, name, rank, type } = poi;
  const coordinates = [position.coordinates[1], position.coordinates[0]];

  let icon = toIcon(type);

  return (
    <Marker key={id} position={coordinates} icon={icon}>
      <Popup>
        {name} <br /> Rank: {rank}
      </Popup>
    </Marker>
  );
};
