import React from "react";
import styles from "./Room.module.css";
import Draggable from "react-draggable";

const Room = () => {
  return (
    <div>
      <div className={styles.mainbox}>
        <Draggable bounds="parent">
          <div className={styles.drag_div}>STOL ZA 4</div>
        </Draggable>
        <Draggable bounds="parent">
          <div className={styles.drag_div}>GRUPA LJUDI od 4</div>
        </Draggable>
      </div>
    </div>
  );
};

export default Room;
