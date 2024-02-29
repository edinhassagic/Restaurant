import React, { useEffect, useState } from "react";
import styles from "./Room.module.css";
import stylesGroup from "./Group.module.css";
import { groupData } from "../Data/GroupPeopleData";
import Group from "./Group";
const Room = ({
  handleDragOver,
  handleDragStart,
  handleDrop,
  droppedElementGroup,
  droppedElementTable,
}) => {
  useEffect(() => {
    console.log(droppedElementGroup);
    console.log(droppedElementTable);
  }, [droppedElementGroup, droppedElementTable]);
  return (
    <div
      className={styles.room}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className={styles.mainbox}>
        {droppedElementGroup &&
          droppedElementGroup.map((element, index) => (
            <div key={index} className={stylesGroup.groupItem}>
              <p>Group Name: {element.groupName}</p>
              <p>Number of People: {element.groupSize}</p>
            </div>
          ))}
      </div>
      <div className={styles.mainbox}>
        {droppedElementTable &&
          droppedElementTable.map((element, index) => (
            <div key={index} className={stylesGroup.groupItem}>
              <p>Table Name: {element.name}</p>
              <p>Number of People: {element.capacity}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Room;
