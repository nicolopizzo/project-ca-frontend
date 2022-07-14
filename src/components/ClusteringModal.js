import { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import Modal from "react-modal";
import "./Modal.css";
import Switch from "react-switch";

export const ClusteringModal = ({ isOpen, onRequestClose, onSubmit }) => {
  Modal.setAppElement("#main");

  // set default start time to the start of the day
  const [startTime, setStartTime] = useState(
    new Date(new Date().setHours(0, 0, 0))
  );

  // set default end time to the end of the day
  const [endTime, setEndTime] = useState(new Date());
  const [all, setAll] = useState(false);
  return (
    <Modal isOpen={isOpen}>
      <form>
        <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
          <div className="textField" style={{ flex: 1 }}>
            <label>Usa tutti i dati</label>
            <Switch
              checked={all}
              uncheckedIcon
              checkedIcon
              height={16}
              handleDiameter={14}
              onColor={"#387bb5"}
              offColor={"#b53838"}
              onChange={() => {
                if (!all) {
                  // set to all data ever
                  setStartTime(new Date(2022, 0, 1));
                } else {
                  setStartTime(new Date(new Date().setHours(0, 0, 0)));
                }
                setEndTime(new Date());
                setAll(!all);
              }}
            />
          </div>
        </div>

        <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
          {!all && (
            <div className="textField" style={{ flex: 3 }}>
              <label>Inizio</label>
              <DateTimePicker
                onChange={(e) => setStartTime(e)}
                value={startTime}
                maxDate={new Date()}
                minDate={new Date(2022, 0, 1)}
              />
            </div>
          )}

          {!all && (
            <div className="textField" style={{ flex: 3 }}>
              <label>Fine</label>
              <DateTimePicker
                onChange={(e) => setEndTime(e)}
                value={endTime}
                maxDate={new Date()}
                minDate={new Date(2022, 0, 1)}
              />
            </div>
          )}
        </div>

        <div style={{ display: "flex", justifyContent: "end" }}>
          <div className="buttonContainer">
            <button className="cancelButton" onClick={onRequestClose}>
              Annulla
            </button>
            <button
              className="saveButton"
              onClick={() => {
                onSubmit(startTime, endTime);
              }}
            >
              Salva
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
