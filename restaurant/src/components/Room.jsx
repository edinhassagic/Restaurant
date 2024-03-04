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
}) => {
  useEffect(() => {
    console.log(droppedElementTable, droppedElementGroup, "elements");
  }, [droppedElementTable, droppedElementGroup]);

  useEffect(() => {
    console.log(droppedElementGroup, "elements");
  }, [droppedElementGroup]);

  return (
    <div
      className={styles.room}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className={styles.mainbox}>
        {droppedElementTable &&
          droppedElementTable.map((element, index) => (
            <div
              key={index}
              className={styles.TableWrapper}
              style={{
                width:
                  element.orientation === "vertikalno"
                    ? `${Math.ceil(element.capacity / 2) * 50}px`
                    : "60px",
                height:
                  element.orientation === "vertikalno"
                    ? "60px"
                    : `${Math.ceil(element.capacity / 2) * 50}px`,
              }}
            >
              {console.log(`Table ${element.name} has ID: ${element.id}`)}
              <p>Table Name: {element.name}</p>{" "}
              {/* Changed here: Added closing tag for <p> */}
              <div
                key={element.id}
                className={stylesGroup.draggedGroupItem}
                style={{
                  margin: "20px",
                  width:
                    element.orientation === "vertikalno"
                      ? `${Math.ceil(element.capacity / 2) * 50}px`
                      : "50px",
                  height:
                    element.orientation === "vertikalno"
                      ? "50px"
                      : `${Math.ceil(element.capacity / 2) * 50}px`,
                  display: "flex",
                  flexDirection:
                    element.orientation === "vertikalno" ? "row" : "column",
                  border: "0.5px solid black",
                }}
                onDragOver={handleDragOver}
                onDrop={(event) => handleDropTable(event, element.id)}
              >
                {droppedElementGroup &&
                  droppedElementGroup[element.id] &&
                  droppedElementGroup[element.id].map((elementGroup, index) => (
                    <div
                      key={index}
                      className={stylesGroup.draggedGroupItem}
                      style={{
                        width:
                          element.orientation === "vertikalno"
                            ? `${Math.ceil(elementGroup.groupSize / 2) * 50}px`
                            : "50px",
                        height:
                          element.orientation === "vertikalno"
                            ? "50px"
                            : `${Math.ceil(elementGroup.groupSize / 2) * 50}px`,
                      }}
                    >
                      <p>Group: {elementGroup.groupName}</p>
                    </div>
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Room;
