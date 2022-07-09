import { Marker, Popup } from "react-leaflet";
import { toIcon } from "../assets/Icons";

export const POIMarker = ({ poi, disabled = false }) => {
  const { id, position, name, rank, type } = poi;
  const coordinates = [position.coordinates[1], position.coordinates[0]];

  let icon = toIcon(type);

  return (
    <Marker key={id} position={coordinates} icon={icon} opacity={disabled && 0.6}>
      <Popup>
        {name} <br /> Rank: {rank}
      </Popup>
    </Marker>
  );
};
