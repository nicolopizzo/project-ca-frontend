// import { Icon } from "leaflet";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { DefaultIcon, GreenIcon, RestaurantIcon } from "../assets/Icons";
import { CreateModal } from "./CreatePOIModal";

const center = [44.4938203, 11.3426327];

const toMarker = (position) => {
  let icon = DefaultIcon;
  switch (position.type) {
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
    <Marker key={position.id} position={position.position} icon={icon}>
      <Popup>
        {position.id} <br /> Rank: {position.rank}
      </Popup>
    </Marker>
  );
};

const bounds = [
  [44.582083, 11.202776],
  [44.533569, 11.462743],
  [44.431262, 11.449332],
  [44.456303, 11.208966],
];

const windowHeight = window.innerHeight;
const height = windowHeight - 80 + "px";

const myPois = [
  {
    id: "Tamburini",
    position: [44.4937354, 11.3454177],
    type: "restaurant",
    rank: 7.8,
  },
  {
    id: "Giardini Margherita",
    position: [44.4822181, 11.3526779],
    type: "green",
    rank: 6.5,
  },
  {
    id: "Piazza Maggiore",
    position: [44.49364306741059, 11.3429425701172],
    type: "green",
    rank: 8.9,
  },
];

const randomType = () => (Math.random() > 0.3 ? "green" : "restaurant");
const toForm = ({ id, rank, type, position }) => ({
  id,
  rank,
  type,
  position: [position.latitude, position.longitude],
});

export const MyMap = () => {
  const [pois, setPois] = useState(myPois);
  const [openModal, setOpenModal] = useState(false);
  const [marker, setMarker] = useState(null);

  // const NewMarker = () => {

  // };

  useEffect(() => {
    const fetchData = async () => {
      const pois = await (
        await axios.get("http://localhost:3001/poi")
      ).data.map(toForm);
      setPois(pois);
    };

    // fetchData();
    // const pois = fetchData();
    // setPositions(pois)
  }, []);

  const showModal = () => {
    setOpenModal(true);
  };

  const handleSubmit = (poi) => {
    setPois([...pois, poi]);
  }

  const DisplayMarker = () => {
    useMapEvents({
      click(e) {
        const latlon = [e.latlng.lat, e.latlng.lng];
        setMarker(latlon);
      },
    });
  };

  return (
    <MapContainer
      style={{ height: height, width: "100%", zIndex: 0 }}
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
      {pois.map((position) => toMarker(position))}
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
          eventHandlers={{ click: () => showModal() }}
        ></Marker>
      )}
      <DisplayMarker />
    </MapContainer>
  );
};
