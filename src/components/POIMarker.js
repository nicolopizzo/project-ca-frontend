import axios from "axios";
import { useState } from "react";
import { Marker, Popup } from "react-leaflet";
import { toIcon } from "../assets/Icons";
import "./Button.css";
import { UpdateModal } from "./UpdatePOIModal";
export const POIMarker = ({ poi, changeActive }) => {
  const [name, setName] = useState(poi.name);
  const [rank, setRank] = useState(poi.rank);
  // const [type, setType] = useState(poi.type);
  const [active, setActive] = useState(poi.active);
  const { id, position, type } = poi;
  const coordinates = [position.coordinates[1], position.coordinates[0]];
  const [isOpen, setIsOpen] = useState(false);

  let icon = toIcon(type);

  const handleEdit = () => {
    setIsOpen(true);
  };

  const handleSubmit = async (poi) => {
    setIsOpen(false);
    setName(poi.name);
    setRank(poi.rank);
    if (active != poi.active) {
      changeActive({ ...poi, id });
    }
    setActive(poi.active);

    // console.log();
    const postedPoi = { name: poi.name, rank: poi.rank, active: poi.active };
    await axios.post(`http://localhost:3001/poi/${id}`, postedPoi);
    // setEditPOI(poi);
  };
  return (
    <Marker
      key={id}
      position={coordinates}
      icon={icon}
      opacity={!active && 0.6}
    >
      <Popup>
        {name} <br /> Rank: {rank} <br />
        <button
          // className="btn"
          style={{
            backgroundColor: "#F05454",
            border: "none",
            borderRadius: "5px",
            padding: "5px 10px",
            cursor: "pointer",
          }}
          onClick={handleEdit}
        >
          Modifica
        </button>
      </Popup>
      <UpdateModal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
        poi={poi}
      />
    </Marker>
  );
};
