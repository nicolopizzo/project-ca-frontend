import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const center = [44.496434, 11.34229];

const bounds = [
  [44.582083, 11.202776],
  [44.533569, 11.462743],
  [44.431262, 11.449332],
  [44.456303, 11.208966]
];

const windowHeight = window.innerHeight;
const height = (windowHeight - 80) + 'px';

export const MyMap = () => {
  return (
    <div className="leafletContainer">
      <MapContainer
        style={{ height: height, width: "100%" }}
        center={center}
        zoom={14}
        minZoom={13}
        scrollWheelZoom={false}
        bounds={bounds}
        maxBounds={bounds}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={center}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
