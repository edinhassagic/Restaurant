import React, { useEffect } from "react";
import styles from "./Room.module.css";
import stylesGroup from "./Group.module.css";
import { groupData } from "../Data/GroupPeopleData";

const Room = ({
  handleDragOver,
  handleDragStart,
  handleDrop,
  handleDropTable,
  droppedElementTable,
  droppedElementGroup,
  droppedElementGroup,
}) => {
  useEffect(() => {
    console.log(droppedElementTable, droppedElementGroup);
  }, [droppedElementTable, droppedElementGroup]);

  return (
    <div className={styles.room} onDragOver={handleDragOver} onDrop={handleDrop}>
      <div className={styles.mainbox}>
        {droppedElementTable &&
          droppedElementTable.map((element, index) => (
            <div key={index} className={stylesGroup.groupItem}  onDragOver={handleDragOver} onDrop={handleDropTable}>
              <p>Table Name: {element.name}</p>
              <p>Number of People: {element.capacity}</p>
              {droppedElementGroup &&
              droppedElementGroup.map((element, index) => (
                <div key={index} className={stylesGroup.groupItem}>
                  <p>Table Name: {element.groupName}</p>
                  <p>Number of People: {element.groupSize}</p>
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Room;
