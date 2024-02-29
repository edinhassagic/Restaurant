import React, { useEffect, useState } from "react";
import styles from "./Room.module.css";
import stylesGroup from "./Group.module.css";
import { groupData } from "../Data/GroupPeopleData";
import Group from "./Group";
const Room = ({
  handleDragOver,
  handleDragStart,
  handleDrop,
  handleDropTable,
  droppedElementTable,
  droppedElementGroup
}) => {
  useEffect(() => {
    console.log(droppedElementTable, droppedElementGroup);
  }, [ droppedElementTable, droppedElementGroup]);
  return (
    <div
      className={styles.room}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className={styles.mainbox}>
      
           {droppedElementTable &&
          droppedElementTable.map((element, index) => (
            <div key={index} className={stylesGroup.groupItem}  onDragOver={handleDragOver} onDrop={handleDropTable}>
              <p>Table Name: {element.name}</p>
              <p>Capacity: {element.capacity}</p>
              {droppedElementGroup &&
              droppedElementGroup.map((element, index) => (
                <div key={index} className={stylesGroup.groupItem}>
                  <p>Group Name: {element.groupName}</p>
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
