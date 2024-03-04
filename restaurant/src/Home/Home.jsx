import React from "react";
import Group from "../components/Group";
import Room from "../components/Room";
import Table from "../components/Table";
import styles from "./Home.module.css";
import { groupData } from "../Data/GroupPeopleData";
import { useState } from "react";
import { TableData } from "../Data/TablesData";
const Home = () => {
  const [droppedElementGroup, setDroppedElementGroup] = useState([]);
  const [droppedElementTable, setDroppedElementTable] = useState([]);

  const [groups, setGroups] = useState([]);
  const handleDragOver = (e) => {
    e.preventDefault();
    console.log("test drag over");
    console.log(e.clientX, e.clientY, "koordinate")
  };

  const handleDragStart = (e, groupName, type) => {
    if (type == "group") {
      e.dataTransfer.setData("groupName", groupName);
    } else if (type == "table") {
      e.dataTransfer.setData("tableName", groupName);
    }
  };

  const handleDrop = (e) => {

    e.preventDefault();
    const elementId = e.dataTransfer.getData("TableID");

    if (e.dataTransfer.getData("tableName")) {
      const tableName = e.dataTransfer.getData("tableName");
      const tableIndex = TableData.findIndex(
        (table) => table.name === tableName
      );

      if (tableIndex != -1)
        setDroppedElementTable([
          ...droppedElementTable,
          { ...TableData[tableIndex], id: Date.now(), position: {} },
        ]);
    }
   if (elementId) {

    const targetClass = e.target.classList[0]; 
    const parentRect = e.target.getBoundingClientRect();
    setDroppedElementTable(prevState => prevState.map(element => {
      if (element.id == elementId) {
        const newX = e.clientX - parentRect.left 
        const newY = e.clientY - parentRect.top 
        return { ...element, position: { x: newX, y: newY } };
      }
      return element;
    }));
  }
  };

  const handleTableDropTable = (event, id) => {
    event.preventDefault();
    const groupName = event.dataTransfer.getData("groupName");
    const droppedGroup = groupData.find(
      (group) => group.groupName === groupName
    );

    if (!droppedGroup) return;

    const tableWidth = event.target.offsetWidth;

    const groupWidth = Math.ceil(droppedGroup.groupSize / 2) * 25;

    if (groupWidth <= tableWidth) {
      setDroppedElementGroup([
        ...droppedElementGroup,
        { ...droppedGroup, targetedTable: id },
      ]);
    } else {
      console.log("Grupa je preširoka za stol!");
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
        setDroppedElementTable={setDroppedElementTable}
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
