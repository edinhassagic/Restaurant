import React from "react";
import Group from "../components/Group";
import Room from "../components/Room";
import Table from "../components/Table";
import styles from "./Home.module.css";
import { groupData } from "../Data/GroupPeopleData";
import { useState } from "react";
import { TableData } from "../Data/TablesData";
import { v4 as uuidv4 } from "uuid";

const Home = () => {
  const [droppedElementGroup, setDroppedElementGroup] = useState([]);
  const [droppedElementTable, setDroppedElementTable] = useState([]);

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
    console.log(TableData);
    console.log("drop");
    e.preventDefault();
    const tableName = e.dataTransfer.getData("tableName");
    const tableIndex = TableData.findIndex((table) => table.name === tableName);

    if (tableIndex != -1)
      setDroppedElementTable([
        ...droppedElementTable,
        { ...TableData[tableIndex], id: uuidv4() },
      ]);
  };
  const handleTableDropTable = (event, id) => {
    event.preventDefault();
    const groupName = event.dataTransfer.getData("groupName");
    const droppedGroup = groupData.find((group) => group.groupName === groupName);
  
    if (!droppedGroup) return;
  
    let updatedDroppedElementGroup = [...droppedElementGroup];
    let updatedDroppedElementTable = [...droppedElementTable];
  
    const tableIndex = updatedDroppedElementTable.findIndex((table) => table.id === id);
    if (tableIndex === -1) return;
  
    const tableCapacity = updatedDroppedElementTable[tableIndex].capacity;
  
    const totalGroupSize = updatedDroppedElementGroup.reduce((total, group) => total + group.groupSize, 0);
  
   
    if (droppedGroup.groupSize <= tableCapacity - totalGroupSize) {
      updatedDroppedElementGroup = [
        ...updatedDroppedElementGroup,
        { ...droppedGroup, targetedTable: id },
      ];
      setDroppedElementGroup(updatedDroppedElementGroup);
      console.log(updatedDroppedElementGroup);
    } else {
      console.log("Kapacitet stola je premali za grupu!");
    }
  };
  
  
  
  return (
    <div className={styles.home}>
      <Group handleDragStart={handleDragStart} />
      <Room
        handleDragOver={handleDragOver}
        handleDragStart={handleDragStart}
        handleDrop={handleDrop}
        handleDropTable={handleTableDropTable}
        droppedElementTable={droppedElementTable}
        droppedElementGroup={droppedElementGroup}
      />
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
