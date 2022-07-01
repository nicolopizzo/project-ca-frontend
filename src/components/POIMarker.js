import { Marker, Popup } from "react-leaflet";
import { DefaultIcon, GreenIcon, RestaurantIcon, toIcon } from "../assets/Icons";

export const POIMarker = ({ poi }) => {
  const { id, position, name, rank, type } = poi;
  const coordinates = [position.coordinates[1], position.coordinates[0]];

  // TODO: color the icon i.r. to the type of the poi
  let icon = toIcon(type);

  return (
    <Marker key={id} position={coordinates} icon={icon}>
      <Popup>
        {name} <br /> Rank: {rank}
      </Popup>
    </Marker>
  );
};