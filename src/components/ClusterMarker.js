import { Marker } from "react-leaflet";
import L from "leaflet";
import "./ClusterMarker.css";
import { renderToStaticMarkup } from "react-dom/server";

export const ClusterMarker = ({ centroid, count }) => {
  const div = renderToStaticMarkup(
    <div className="cluster-marker">{count}</div>
  );
  const customIcon = L.divIcon({
    html: div,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });

  return (
    centroid[0] &&
    centroid[1] && (
      <Marker
        position={centroid}
        icon={customIcon}
        autoPan={false}
        autoPanPadding={false}
      />
    )
  );
};
