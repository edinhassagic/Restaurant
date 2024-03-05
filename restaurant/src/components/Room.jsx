import React, { useEffect, useState } from "react";
import styles from "./Room.module.css";
import stylesGroup from "./Group.module.css";

const Room = ({
  handleDragOver,

  handleDrop,
  handleDropTable,
  droppedElementTable,
  droppedElementGroup,
  setDroppedElementTable,
  setDroppedElementGroup,
  isGroupClicked,
  setIsGroupClicked,
  handleDeleteGroup,
}) => {
  const handleDragTable = async (event, elementId) => {
    if (!isGroupClicked) {
      event.dataTransfer.setData("TableID", elementId);
    }
  };

  const handleDragGroup = (event, groupId) => {
    setIsGroupClicked(true);
    console.log(groupId);
    event.dataTransfer.setData("groupId", groupId);
  };
  const handleDragOverGroup = (event) => {
    event.preventDefault();
  };
  const deleteGroup = (groupId) => {
    handleDeleteGroup(groupId);
  };

  const handleDropGroup = async (event, droppedGroupId) => {
    const draggedGroupId = await event.dataTransfer.getData("groupId");
    console.log(draggedGroupId);

    const draggedGroupIndex = droppedElementGroup.findIndex(
      (group) => group.id === draggedGroupId
    );
    const droppedGroupIndex = droppedElementGroup.findIndex(
      (group) => group.id === droppedGroupId
    );

    if (draggedGroupIndex !== -1 && droppedGroupIndex !== -1) {
      const updatedGroups = [...droppedElementGroup];

      [updatedGroups[draggedGroupIndex], updatedGroups[droppedGroupIndex]] = [
        updatedGroups[droppedGroupIndex],
        updatedGroups[draggedGroupIndex],
      ];

      setDroppedElementGroup(updatedGroups);
    }
    setIsGroupClicked(false);
  };

  return (
    <div
      className={styles.room}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div
        className={styles.mainbox}
        onClick={(e) => {
          console.log(e.clientX, e.clientY, "koordinate");
        }}
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
                position: "absolute",
                left: element.position ? `${element.position.x}px` : "0px",
                top: element.position ? `${element.position.y}px` : `0px`,
              }}
              draggable
              onDragStart={(event) => handleDragTable(event, element.id)}
              onDrop={handleDrop}
            >
              {console.log(element.position, "position")}
              {console.log(`Table ${element.name} has ID: ${element.id}`)}
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
                  droppedElementGroup.map((elementGroup, index) =>
                    elementGroup.targetedTable === element.id ? (
                      <div
                        key={index}
                        draggable
                        onDragStart={(event) =>
                          handleDragGroup(event, elementGroup.id)
                        }
                        onDragOver={(event) => handleDragOverGroup(event)}
                        onDrop={(event) =>
                          handleDropGroup(event, elementGroup.id)
                        }
                        className={stylesGroup.draggedGroupItem}
                        style={{
                          width:
                            element.orientation === "horizontalno"
                              ? `${
                                  Math.ceil(elementGroup.groupSize / 2) * 50
                                }px`
                              : "50px",
                          height:
                            element.orientation === "horizontalno"
                              ? "50px"
                              : `${
                                  Math.ceil(elementGroup.groupSize / 2) * 50
                                }px`,
                        }}
                      >
                        <p>Group:{elementGroup.groupName}</p>
                        <span
                          className={stylesGroup.deleteIcon}
                          onClick={() => deleteGroup(elementGroup.id)}
                        >
                          X
                        </span>
                      </div>
                    ) : null
                  )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Room;
