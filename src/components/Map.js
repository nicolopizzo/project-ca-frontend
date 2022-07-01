import axios from "axios";
import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  Tooltip,
} from "react-leaflet";
import { areaToGeoJSON } from "../utils/geometry";
import { ClusterMarker } from "./ClusterMarker";
import { CreateModal } from "./CreatePOIModal";
import { POIMarker } from "./POIMarker";

const center = [44.4938203, 11.3426327];

const bounds = [
  [44.514929, 11.320226],
  [44.481688, 11.320055],
  [44.480281, 11.360481],
  [44.510466, 11.366318],
];

const height = window.innerHeight + "px";

export const MyMap = ({ areaPois, aeraUsers, cloakedArea: clusteredUsers }) => {
  const [pois, setPois] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    const fetchPois = async () => {
      const pois = await (
        await axios.get("http://localhost:3001/poi")
      ).data;
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
    setPois([...pois, newPOI]);
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
      minZoom={10}
      doubleClickZoom={false}
      scrollWheelZoom={true}
      // bounds={bounds}
      // maxBounds={bounds}
      // children={}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* <ClusterMarker centroid={center} count={10} /> */}

      {/* Visualizzazione di tutti i POI */}
      {pois && pois.map((poi) => <POIMarker key={poi.id} poi={poi} />)}

      {/* Visualizzazione della heatmap basata sulla densità dei POI */}
      {areaPois && areaPois.map(areaToGeoJSON)}

      {/* Visualizzazione della heatmap basata sui checkin ai POI degli utenti */}
      {aeraUsers && aeraUsers.map(areaToGeoJSON)}

      {/* Visualizzazione della posizione degli utenti clusterizzata */}
      {/* <ClusterMarker centroid={center} count={10}/> */}
      {clusteredUsers && clusteredUsers.map(c => <ClusterMarker centroid={c.centroid} count={c.count} />)}

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
