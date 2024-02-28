import React from "react";
import styles from "./Room.module.css";
import Draggable from "react-draggable";

const Room = ()=> {


  return (
    <div>
      <div className={styles.mainbox}>
        <Draggable bounds="parent">
          <div className={styles.drag_div}>Drag me within the parent div</div>
        </Draggable>
      </div>
    </div>


  );
}

export default Room;
