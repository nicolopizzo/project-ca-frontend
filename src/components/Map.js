import axios from "axios";
import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  Tooltip,
} from "react-leaflet";
import { DefaultIcon, GreenIcon, RestaurantIcon } from "../assets/Icons";
import { areaToGeoJSON } from "../utils/geometry";
import { CreateModal } from "./CreatePOIModal";

const center = [44.4938203, 11.3426327];

const toMarker = (poi) => {
  let icon = DefaultIcon;
  switch (poi.type) {
    case "restaurant":
      icon = RestaurantIcon;
      break;
    case "green":
      icon = GreenIcon;
      break;
    default:
      icon = DefaultIcon;
  }
  return (
    <Marker key={poi.id} position={poi.position} icon={icon}>
      <Popup>
        {poi.name} <br /> Rank: {poi.rank}
      </Popup>
    </Marker>
  );
};

const bounds = [
  [44.514929, 11.320226],
  [44.481688, 11.320055],
  [44.480281, 11.360481],
  [44.510466, 11.366318],
];

const windowHeight = window.innerHeight;
const height = windowHeight - 78 + "px";

const toForm = ({ id, name, rank, type, position }) => ({
  id,
  name,
  rank,
  type,
  position: [position.coordinates[1], position.coordinates[0]],
});

export const MyMap = ({ areaPois, aeraUsers, cloakedArea }) => {
  const [pois, setPois] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    const fetchPois = async () => {
      const pois = await (
        await axios.get("http://localhost:3001/poi")
      ).data.map(toForm);
      setPois(pois);
    };

    fetchPois();
  }, []);

  const showModal = () => {
    setOpenModal(true);
  };

  const handleSubmit = async (poi) => {
    const { name, rank, type, position } = poi;
    const [latitude, longitude] = position;
    const tmpPOI = { name, rank, type, position: { latitude, longitude } };

    const newPOI = (await axios.put("http://localhost:3001/poi", tmpPOI)).data;
    setPois([...pois, toForm(newPOI)]);
  };

  const DisplayMarker = () => {
    useMapEvents({
      dblclick(e) {
        const latlon = [e.latlng.lat, e.latlng.lng];
        setMarker(latlon);
      },
    });
  };

  return (
    <MapContainer
      style={{ height: height, zIndex: 0, flex: 3 }}
      center={center}
      zoom={14}
      minZoom={13}
      doubleClickZoom={false}
      scrollWheelZoom={true}
      bounds={bounds}
      maxBounds={bounds}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Visualizzazione di tutti i POI */}
      {pois && pois.map((position) => toMarker(position))}

      {/* Visualizzazione della heatmap basata sulla densità dei POI */}
      {areaPois && areaPois.map(areaToGeoJSON)}

      <CreateModal
        isOpen={openModal}
        onRequestClose={() => setOpenModal(false)}
        latitude={marker && marker[0]}
        longitude={marker && marker[1]}
        onSubmit={handleSubmit}
      />
      {marker === null ? null : (
        <Marker
          position={marker}
          eventHandlers={{
            click: () => showModal(),
          }}
        >
          <Tooltip direction="bottom" offset={[-14.5, 20]} opacity={1}>
            Clicca per aggiungere un POI
          </Tooltip>
        </Marker>
      )}
      <DisplayMarker />
    </MapContainer>
  );
};
