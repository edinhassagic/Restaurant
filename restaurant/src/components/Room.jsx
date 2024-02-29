import React, { useState } from "react";
import styles from "./Room.module.css";
import stylesGroup from "./Group.module.css";
import { groupData } from "../Data/GroupPeopleData";
import Group from "./Group";
const Room = ({
  handleDragOver,
  handleDragStart,
  handleDrop,
  droppedElement,
}) => {
  console.log(droppedElement);

  return (
    <div
      className={styles.room}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className={styles.mainbox}>
        {droppedElement.map((element, index) => (
          <div key={index} className={stylesGroup.groupItem}>
            <p>Group Name: {element.groupName}</p>
            <p>Number of People: {element.groupSize}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Room;
