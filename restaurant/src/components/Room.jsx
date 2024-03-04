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
  droppedElementGroup,
  setDroppedElementTable
}) => {

  const [tables, setTables] = useState([])
  const [groups, setGroups] = useState([])


  useEffect(() => {
    setTables(droppedElementTable)
    setGroups(droppedElementGroup)
    console.log("promijenio nesto ")
    console.log(droppedElementGroup, "grupe")
}, [setDroppedElementTable]);
useEffect(() => {
  setTables(droppedElementTable)
  setGroups(droppedElementGroup)
  console.log(droppedElementGroup, "grupe")
}, []);


  const handleDragTable = (event, elementId) => {
    event.dataTransfer.setData("TableID", elementId);
  };

  return (
    <div
      className={styles.room}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className={styles.mainbox}
        onClick = { (e) => {console.log(e.clientX, e.clientY, "koordinate")}}
      >
        {droppedElementTable &&
          droppedElementTable.map((element, index) => (
            <div
              key={index}
              className={styles.TableWrapper}
              style={{
                width:
                  element.orientation === "horizontalno"
                    ? `${Math.ceil(element.capacity / 2) * 50}px`
                    : "60px",
                height:
                  element.orientation === "horizontalno"
                    ? "60px"
                    : `${Math.ceil(element.capacity / 2) * 50}px`,
                position: "relative",
                left: element.position ? `${element.position.x}px` : "0px",
                top: element.position ? `${element.position.y}px` : `0px`,  
              }}
              draggable
              onDragStart={(event) => handleDragTable(event, element.id)}
              onDrop={handleDrop}
            >
{              console.log(element.position, "position")
}              {console.log(`Table ${element.name} has ID: ${element.id}`)}
              <p style={{ fontSize: "10px" }}>Table Name: {element.name}</p>

              <div
                key={element.id}
                className={stylesGroup.draggedGroupItem}
                style={{
                  width:
                    element.orientation === "horizontalno"
                      ? `${Math.ceil(element.capacity / 2) * 50}px`
                      : "50px",
                  height:
                    element.orientation === "horizontalno"
                      ? "50px"
                      : `${Math.ceil(element.capacity / 2) * 50}px`,
                  display: "flex",
                  flexDirection:
                    element.orientation === "vertikalno" ? "column" : "row",
                }}
                draggable
                onDragOver={handleDragOver}
                onDrop={(event) => handleDropTable(event, element.id)}
              >
                {droppedElementGroup &&
                  droppedElementGroup.map((elementGroup, index) => (
                    elementGroup.targetedTable === element.id ? (
                    <div
                      key={index}
                      className={stylesGroup.draggedGroupItem}
                      style={{
                        width:
                          element.orientation === "horizontalno"
                            ? `${Math.ceil(elementGroup.groupSize / 2) * 50}px`
                            : "50px",
                        height:
                          element.orientation === "horizontalno"
                            ? "50px"
                            : `${Math.ceil(elementGroup.groupSize / 2) * 50}px`,
                      }}
                    >
                       {console.log(`Group: ${elementGroup.groupName}, Group ID: ${elementGroup.id}`)}
                      <p>Group:{elementGroup.groupName}</p>
                    </div>): null
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Room;
