import React, { useEffect, useState } from "react";
import styles from "./Room.module.css";
import stylesGroup from "./Group.module.css";
import { groupData } from "../Data/GroupPeopleData";
import Group from "./Group";
<<<<<<< HEAD

const Room = ( {handleDragOver, handleDragStart, handleDrop, droppedElement}) => {
  
  const [groupPositions, setGroupPositions] = useState({})

  const handleDrag = ( groupName, position) => {
    setGroupPositions({
      ...groupPositions,
      [groupName]: position,
    });
  };

=======
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
>>>>>>> c78d0a56f963a69bef63c2d40922bd10a5761ab8
  return (
    <div
      className={styles.room}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className={styles.mainbox}>
<<<<<<< HEAD
        {droppedElement.map((element, index) => (
          <div 
            key={index}
            className={stylesGroup.groupItem}
            draggable
            style={{
              position: "absolute",
              left: groupPositions[element.groupName]?.x,
              top: groupPositions[element.groupName]?.y,
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
=======
      
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
>>>>>>> c78d0a56f963a69bef63c2d40922bd10a5761ab8
      </div>

    </div>
  );
};

export default Room;