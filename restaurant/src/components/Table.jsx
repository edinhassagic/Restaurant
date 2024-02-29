import React, { useState } from "react";
import styles from "./Table.module.css";
import Modal from "react-modal";
import { TableData } from "../Data/TablesData";
Modal.setAppElement("#root");

const Table = ({handleDragStart}) => {
  const [tables, setTables] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [tableName, setTableName] = useState("");
  const [orientation, setOrientation] = useState("vertikalno");
  const [capacity, setCapacity] = useState(1);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const addTable =async () => {
    const newTable = {
      name: tableName,
      orientation: parseInt(capacity),
      capacity: capacity,
    };

    const setT = async() =>  setTables([...tables, { ...newTable, draggableItem: null }]);
    await setT();
    console.log(newTable)
    TableData.push({...newTable})
    closeModal();
    console.log(TableData)
  };

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add Table Modal"
        className={styles.modal}
      >
        <h2> Dodajte Sto </h2>

        <div className={styles.table_modal_input_container}>
          <label className={styles.input_title}> Ime Stola: </label>
          <input
            className={styles.modal_input}
            type="text"
            placeholder="Ime Stola"
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
            required
          />
        </div>

        <div className={styles.table_modal_input_container}>
          <label className={styles.input_title}> Orijentacija: </label>
          <select
            className={styles.modal_input}
            value={orientation}
            onChange={(e) => setOrientation(e.target.value)}
          >
            <option value="vertikalno"> Vertikalno </option>
            <option value="horizontalno"> Horizontalno </option>
          </select>
        </div>

        <div className={styles.table_modal_input_container}>
          <label className={styles.input_title}> Kapacitet: </label>
          <input
            className={styles.modal_input}
            type="number"
            placeholder="Kapacitet"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            required
          />
        </div>

        <div className={styles.modal_action_container}>
          <button className={styles.add_modal_btn} onClick={addTable}>
            {" "}
            ADD{" "}
          </button>
          <button className={styles.cancel_modal_btn} onClick={closeModal}>
            {" "}
            CANCEL{" "}
          </button>
        </div>
      </Modal>
      <div className={styles.container}>
        <div className={styles.container_title}>
          <h2> STOLOVI </h2>
        </div>

        <div className={styles.tables_container}>
          {tables.map((table, index) => (
            
            <div
              key={index}
              className={styles.table_details}
              draggable
              onDragStart={(e) => handleDragStart(e, table.name, "table")}
            >
              <p>
                <label className={styles.table_details_title}>
                  Table Name:{" "}
                </label>{" "}
                {table.name}
              </p>
              <p>
                <label className={styles.table_details_title}>
                  Orientation:{" "}
                </label>{" "}
                {table.orientation}
              </p>
              <p>
                <label className={styles.table_details_title}>Capacity: </label>{" "}
                {table.capacity}
              </p>
            </div>
          ))}
        </div>

        <div className={styles.action_container}>
          <button className={styles.add_table_btn} onClick={openModal}>
            {" "}
            DODATI STO{" "}
          </button>
        </div>
      </div>
    </>
  );
};

export default Table;
