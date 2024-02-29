import React, { useState } from "react";
import styles from "./Room.module.css";
import stylesGroup from "./Group.module.css"
import { groupData } from "../Data/GroupPeopleData" ;
import Group from "./Group";
const Room = ( {handleDragOver, handleDragStart, handleDrop, droppedElement}) => {
  console.log(droppedElement)
  const [groupPositions, setGroupPositions] = useState({})

  const handleDrag = ( groupName, position) => {
    setGroupPositions({
      ...groupPositions,
      [groupName]: position,
    });
  };

  return (
    <div className={styles.room} onDragOver={handleDragOver} onDrop={handleDrop}>
      <div className={styles.mainbox}>
        {droppedElement.map((element, index) => (
          <div 
            key={index}
            className={stylesGroup.groupItem}
            draggable
            style={{
              position: "absolute",
              left: groupPositions[element.groupName]?.x,
              top: groupPositions[element.groupName]?.y ,
            }}
            onDragStart={(e) => {
              e.dataTransfer.setData("groupName", element.groupName);
              handleDragStart(e, element.groupName);
            }}
            onDrag={(e) => {
              handleDrag( element.groupName, { x: e.clientX, y: e.clientY });
            }}
          >
            <p>Group Name: {element.groupName}</p>
            <p>Number of People: {element.groupSize}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Room;
