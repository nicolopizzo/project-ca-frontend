import { useState } from "react";
import Modal from "react-modal";
import "./Modal.css";

// TODO: handleSubmit

export const CreateModal = ({
  isOpen,
  onRequestClose,
  onSubmit,
  latitude,
  longitude,
}) => {
  const [id, setId] = useState("");
  const [type, setType] = useState("restaurant");
  const [rank, setRank] = useState(0);

  const logAll = () => {
    console.log(id, type, rank);
  };

  const handleCancel = () => {
    setId('');
    setType('restaurant');
    setRank(0);
    onRequestClose();
  }

  const handleSubmit = () => {
    const poi = {id, type, rank, position: [latitude, longitude]};
    onSubmit(poi);
    setId('');
    setType('restaurant');
    setRank(0);
    onRequestClose();
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <form>
        <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
          <div className="textField" style={{ width: "100%" }}>
            <label>Nome</label>
            <input
              type={"text"}
              onChange={(e) => {
                setId(e.target.value);
              }}
              value={id}
            ></input>
          </div>
        </div>

        <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
          <div className="textField" style={{ flex: 3 }}>
            <label>Tipologia POI</label>
            <select
              name={"type"}
              id="type"
              onChange={(e) => {
                setType(e.target.value);
              }}
            >
              <option value="restaurant">Ristorante</option>
              <option value="green">Belvedere</option>
            </select>
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
          <div className="textField" style={{ flex: 1 }}>
            <label>Latitudine</label>
            <input readOnly={true} type={"number"} value={latitude}></input>
          </div>

          <div className="textField" style={{ flex: 1 }}>
            <label>Longitudine</label>
            <input
              readOnly={true}
              type={"number"}
              min={0}
              max={10}
              value={longitude}
            ></input>
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
