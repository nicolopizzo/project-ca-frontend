import axios from "axios";
import { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  Tooltip,
  LayersControl,
  LayerGroup,
} from "react-leaflet";
import { areaToGeoJSON } from "../utils/geometry";
import { ClusterMarker } from "./ClusterMarker";
import { CreateModal } from "./CreatePOIModal";
import { POIMarker } from "./POIMarker";
import { UserMarker } from "./UserMarker";

const center = [44.4938203, 11.3426327];

const bounds = [
  [44.556717, 11.45064],
  [44.457799, 11.432108],
  [44.413673, 11.347684],
  [44.420049, 11.266005],
  [44.47838, 11.27836],
  [44.506055, 11.21855],
  [44.560631, 11.239827],
];

const height = window.innerHeight + "px";

export const MyMap = ({ areaPois, aeraUsers, cloakedArea: clusteredUsers }) => {
  const [pois, setPois] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [marker, setMarker] = useState(null);
  const [users, setUsers] = useState([center]);

  const setUserInterval = useRef(null);

  const fetchPois = async () => {
    const pois = await (await axios.get("http://localhost:3001/poi")).data;
    setPois(pois);
  };

  const fetchUsers = async () => {
    const users = (await axios.get("http://localhost:3001/activity/user")).data;
    setUsers(users);
  };

  useEffect(() => {
    fetchPois();
    fetchUsers();

    // Aggiorno le informazioni relative agli utenti ogni due minuti
    setInterval(fetchUsers, 120000);
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
      minZoom={12}
      doubleClickZoom={false}
      scrollWheelZoom={true}
      bounds={bounds}
      maxBounds={bounds}
      // children={}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* TODO: Layers per POI e Utenti */}
      <LayersControl collapsed={false} position="topright">
        <LayersControl.Overlay checked name="POI">
          <LayerGroup>
            {/* Visualizzazione di tutti i POI */}
            {pois && pois.map((poi) => <POIMarker key={poi.id} poi={poi} />)}
          </LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay checked name="Utenti">
          <LayerGroup>
          {/* Visualizzazione degli utenti attivi */}
          {users && users.map((pos) => <UserMarker position={pos} />)}
          </LayerGroup>
        </LayersControl.Overlay>
      </LayersControl>

      {/* Visualizzazione della heatmap basata sulla densità dei POI */}
      {areaPois && areaPois.map(areaToGeoJSON)}

      {/* Visualizzazione della heatmap basata sui checkin ai POI degli utenti */}
      {aeraUsers && aeraUsers.map(areaToGeoJSON)}

      {/* Visualizzazione della posizione degli utenti clusterizzata */}
      {/* <ClusterMarker centroid={center} count={10}/> */}
      {clusteredUsers &&
        clusteredUsers.map((c) => (
          <ClusterMarker centroid={c.centroid} count={c.count} />
        ))}

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
