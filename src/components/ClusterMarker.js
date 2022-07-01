import { Marker } from "react-leaflet";
import L from "leaflet";
import "./ClusterMarker.css";
import {renderToStaticMarkup} from 'react-dom/server'

export const ClusterMarker = ({ centroid, count }) => {
  // circular div
  // const div = L.DomUtil.create('div', 'cluster-marker');
  //   const div = renderToStatic
  const div = renderToStaticMarkup(<div className="cluster-marker">{count}</div>)
  const customIcon = L.divIcon({
    // html: `<div class="cluster-marker">${count}</div>`,
    html: div,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
 
  return <Marker position={centroid} icon={customIcon} autoPan={false} autoPanPadding={false} />;
};
