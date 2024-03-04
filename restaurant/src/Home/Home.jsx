import React, { useRef } from "react";
import Group from "../components/Group";
import Room from "../components/Room";
import Table from "../components/Table";
import styles from "./Home.module.css";
import { groupData } from "../Data/GroupPeopleData";
import { useState } from "react";
import { TableData } from "../Data/TablesData";
import { v4 as uuidv4 } from "uuid";

const Home = () => {
  const parent = useRef(null);
  const [droppedElementGroup, setDroppedElementGroup] = useState([]);
  const [droppedElementTable, setDroppedElementTable] = useState([]);
  const [droppedGroupsInTables, setDroppedGroupsInTables] = useState({});
  const [isGroupClicked, setIsGroupClicked] = useState(false);

  const [groups, setGroups] = useState([]);
  const handleDragOver = (e) => {
    e.preventDefault();
    console.log("test drag over");
  };

  const handleDragStart = (e, groupName, type) => {
    if (type == "group") {
      e.dataTransfer.setData("groupName", groupName);
    } else if (type == "table") {
      console.log(1);
      e.dataTransfer.setData("tableName", groupName);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (!isGroupClicked) {
      const elementId = e.dataTransfer.getData("TableID");

      if (e.dataTransfer.getData("tableName")) {
        const tableName = e.dataTransfer.getData("tableName");
        const tableIndex = TableData.findIndex(
          (table) => table.name === tableName
        );

        if (tableIndex != -1) {
          const tableAlreadyDropped = droppedElementTable.some(
            (element) => element.name === tableName
          );

          if (!tableAlreadyDropped) {
            setDroppedElementTable((prevState) => [
              ...prevState,
              { ...TableData[tableIndex], id: uuidv4(), position: {} },
            ]);
          }
        }
      }
      if (elementId) {
        const parentRect = parent.current.getBoundingClientRect();
        setDroppedElementTable((prevState) =>
          prevState.map((element) => {
            if (element.id == elementId) {
              const newX = e.clientX - parentRect.left;
              const newY = e.clientY - parentRect.top;
              return { ...element, position: { x: newX, y: newY } };
            }
            return element;
          })
        );
      }
    }
  };

  const handleDeleteGroup = (groupId) => {
    console.log("Deleting group with ID:", groupId);
    
    const updatedDroppedElementGroup = droppedElementGroup.filter(
      (group) => group.id !== groupId
    );
    console.log(updatedDroppedElementGroup, "updatedDroppedElementGroup")
    const updateddroppedGroupsInTables = droppedElementTable.filter(
      (group) => group.id !== groupId
    );
    setDroppedElementGroup(updatedDroppedElementGroup);
    setDroppedGroupsInTables(updateddroppedGroupsInTables)
  };
  const handleTableDropTable = (event, id) => {
    event.preventDefault();
    const groupName = event.dataTransfer.getData("groupName");
    const droppedGroup = groupData.find(
      (group) => group.groupName === groupName
    );
    console.log(droppedGroup);
    if (!droppedGroup || droppedGroupsInTables[groupName]) return;
    const postoji = droppedElementGroup.findIndex(
      (group) => group.targetedTable === id
    );
    if (postoji == -1) return
    console.log("postoji li", postoji)

    let updatedDroppedElementGroup = [...droppedElementGroup];
    let updatedDroppedElementTable = [...droppedElementTable];
    const tableIndex = updatedDroppedElementTable.findIndex(
      (table) => table.id === id
    );

    if (tableIndex === -1) return;
    console.log(droppedElementTable[tableIndex]);
    const tableCapacity = updatedDroppedElementTable[tableIndex].capacity;
    const totalGroupSize = updatedDroppedElementGroup
      .filter((group) => group.targetedTable === id)
      .reduce((total, group) => total + group.groupSize, 0);

    // Proveravamo da li nova grupa može stati u sto uzimajući u obzir preostali kapacitet stola nakon dodavanja prethodnih grupa
    console.log(tableCapacity, totalGroupSize);
    if (droppedGroup.groupSize <= tableCapacity - totalGroupSize + 1) {
      updatedDroppedElementGroup = [
        ...updatedDroppedElementGroup,
        { ...droppedGroup, targetedTable: id, id: uuidv4() },
      ];
      setDroppedElementGroup(updatedDroppedElementGroup);
      setDroppedGroupsInTables((prev) => ({ ...prev, [groupName]: id }));
    } else {
      console.log("Kapacitet stola je premali za grupu!");
    }
  };

  return (
    <div className={styles.home}>
      <Group handleDragStart={handleDragStart} />
      <div ref={parent}>
        <Room
          handleDragOver={handleDragOver}
          handleDragStart={handleDragStart}
          handleDrop={handleDrop}
          handleDropTable={handleTableDropTable}
          droppedElementTable={droppedElementTable}
          droppedElementGroup={droppedElementGroup}
          setDroppedElementTable={setDroppedElementTable}
          setDroppedElementGroup={setDroppedElementGroup}
          isGroupClicked={isGroupClicked}
          setIsGroupClicked={setIsGroupClicked}
          handleDeleteGroup={handleDeleteGroup}
        />
      </div>
      <Table
        handleDragStart={handleDragStart}
        droppedElementGroup={droppedElementGroup}
        handleDrop={handleTableDropTable}
        handleDragOver={handleDragOver}
      />
    </div>
  );
};

export default Home;
