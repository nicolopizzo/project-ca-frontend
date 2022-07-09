import { useState } from "react";
import Modal from "react-modal";
import "./Modal.css";
import Switch from "react-switch";
import { toFormattedType } from "../utils/poi";

export const UpdateModal = ({ isOpen, onRequestClose, onSubmit, poi }) => {
  Modal.setAppElement("#main");
  const [name, setName] = useState(poi.name);
  // const [type, setType] = useState(poi.type);
  const [rank, setRank] = useState(poi.rank);
  const [active, setActive] = useState(poi.active);

  const { type } = poi;
  const [longitude, latitude] = poi.position.coordinates;

  const handleCancel = () => {
    onRequestClose();
  };

  const handleSubmit = async () => {
    const poi = { name, type, rank, position: [latitude, longitude], active };
    await onSubmit(poi);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        content: {
          height: "auto",
        },
      }}
    >
      <form>
        <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
          <div className="textField" style={{ width: "100%" }}>
            <label>Nome</label>
            <input
              type={"text"}
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
            ></input>
          </div>
        </div>

        <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
          <div className="textField" style={{ flex: 3 }}>
            <label>Tipologia POI</label>
            <input readOnly value={toFormattedType(type)} />
          </div>

          <div className="textField" style={{ flex: 1 }}>
            <label>Rank</label>
            <input
              type={"number"}
              min={0}
              max={10}
              value={rank}
              onChange={(e) => {
                setRank(e.target.value);
              }}
            ></input>
          </div>
        </div>

        <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
          <div className="textField" style={{ flex: 4 }}>
            <label>Latitudine</label>
            <input readOnly={true} type={"number"} value={latitude}></input>
          </div>

          <div className="textField" style={{ flex: 4 }}>
            <label>Longitudine</label>
            <input readOnly={true} type={"number"} value={longitude}></input>
          </div>

          <div className="textField" style={{ flex: 1 }}>
            <label>{active ? "Abilitato" : "Disabilitato"}</label>
            <Switch
              checked={active}
              uncheckedIcon
              checkedIcon
              height={16}
              handleDiameter={14}
              onColor={"#387bb5"}
              offColor={"#b53838"}
              onChange={() => setActive(!active)}
            />
          </div>
        </div>
      </form>

      <div style={{ display: "flex", justifyContent: "end" }}>
        <div className="buttonContainer">
          <button className="cancelButton" onClick={handleCancel}>
            Annulla
          </button>
          <button className="saveButton" onClick={handleSubmit}>
            Salva
          </button>
        </div>
      </div>
    </Modal>
  );
};
