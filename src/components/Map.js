import { toContainElement } from "@testing-library/jest-dom/dist/matchers";
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
import { DefaultIcon } from "../assets/Icons";
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
  const [users, setUsers] = useState([]);
  const mapRef = useRef(null);

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
    console.log(mapRef.current);

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

  const setActive = async (poi) => {
    const tmp = [...pois];
    const index = tmp.findIndex((p) => p.id === poi.id);
    tmp[index].active = !tmp[index].active;
    setPois(tmp);
  };

  return (
    <MapContainer
      ref={(m) => (mapRef.current = m)}
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
      {/* TODO: Layers per POI e Utenti */}
      <LayersControl collapsed={false} position="topright">
        {/* BaseLayers */}
        <LayersControl.BaseLayer name="OpenStreetMap" checked={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name="MapBox Basic">
          <TileLayer
            url="https://api.mapbox.com/styles/v1/nicolopizzo/cl5elo75o002514mvxjlg4gcs/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoibmljb2xvcGl6em8iLCJhIjoiY2w1ZWp4dWhnMHhqZzNlbnpvd2ZscXA0YSJ9.ajhpIwLw2FwhidIhTuL9Fg"
            attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
          />
        </LayersControl.BaseLayer>
        mapbox://styles/nicolopizzo/

        <LayersControl.BaseLayer name="MapBox Streets">
          <TileLayer
            url="https://api.mapbox.com/styles/v1/nicolopizzo/cl5ejzk7i002414mv8wqojqhl/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoibmljb2xvcGl6em8iLCJhIjoiY2w1ZWp4dWhnMHhqZzNlbnpvd2ZscXA0YSJ9.ajhpIwLw2FwhidIhTuL9Fg"
            attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name="MapBox Satellite">
          <TileLayer
            url="https://api.mapbox.com/styles/v1/nicolopizzo/cl5ekayjf005i14rz1sobkuo3/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoibmljb2xvcGl6em8iLCJhIjoiY2w1ZWp4dWhnMHhqZzNlbnpvd2ZscXA0YSJ9.ajhpIwLw2FwhidIhTuL9Fg"
            attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
          />
        </LayersControl.BaseLayer>

        {/* Overlays */}
        <LayersControl.Overlay checked name="POI abilitati">
          <LayerGroup>
            {/* Visualizzazione di tutti i POI */}
            {pois &&
              pois
                .filter((p) => p.active)
                .map((poi) => (
                  <POIMarker key={poi.id} poi={poi} changeActive={setActive} />
                ))}
          </LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="POI disabilitati">
          <LayerGroup>
            {/* Visualizzazione di tutti i POI */}
            {pois &&
              pois
                .filter((p) => !p.active)
                .map((poi) => (
                  <POIMarker key={poi.id} poi={poi} changeActive={setActive} />
                ))}
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
          icon={DefaultIcon}
        >
          <Tooltip direction="bottom" opacity={1}>
            Clicca per aggiungere un POI
          </Tooltip>
        </Marker>
      )}
      <DisplayMarker />
    </MapContainer>
  );
};
