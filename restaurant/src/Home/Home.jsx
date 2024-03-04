import React from 'react'
import Group from '../components/Group'
import Room from '../components/Room'
import Table from '../components/Table'
import styles from "./Home.module.css"
import { groupData } from '../Data/GroupPeopleData'
import { useState } from 'react'
import { TableData } from '../Data/TablesData'
const Home = () => {





  const [droppedElementGroup, setDroppedElementGroup] = useState([]);
  const [droppedElementTable, setDroppedElementTable] = useState([]);

const [groups, setGroups] = useState([])
const handleDragOver = (e) => {
  e.preventDefault();
console.log("test drag over")
}

const handleDragStart = (e, groupName, type) => {
  if (type == "group") {
    e.dataTransfer.setData("groupName", groupName);
  } else if (type == "table") {
    console.log(1)
    e.dataTransfer.setData("tableName", groupName);
  }
};


const handleDrop = (e) => {
 console.log(TableData)
 console.log("drop")
  e.preventDefault();
    const tableName = e.dataTransfer.getData("tableName")
    const tableIndex = TableData.findIndex(table => table.name === tableName )

    if (tableIndex != -1 )setDroppedElementTable([...droppedElementTable, {...TableData[tableIndex], id: Date.now()}]);

};


const handleTableDropTable = (event, id) => {
  event.preventDefault();
  const groupName = event.dataTransfer.getData("groupName");
  const droppedGroup = groupData.find((group) => group.groupName === groupName);
  
  if (!droppedGroup) return; 

  const tableWidth = event.target.offsetWidth; 

  const groupWidth = Math.ceil(droppedGroup.groupSize / 2) * 25;

  if (groupWidth <= tableWidth) {
    setDroppedElementGroup([...droppedElementGroup, { ...droppedGroup, targetedTable: id }]);
    console.log(droppedElementGroup)
  } else {
    console.log("Grupa je preširoka za stol!");
  }
};




  return (
    <div className={styles.home} >
        <Group  handleDragStart={handleDragStart} />
        <Room handleDragOver={handleDragOver} handleDragStart={handleDragStart} handleDrop = {handleDrop} handleDropTable={handleTableDropTable} droppedElementTable={droppedElementTable} droppedElementGroup={droppedElementGroup} />
        <Table handleDragStart={handleDragStart} droppedElementGroup={droppedElementGroup}  handleDrop = {handleTableDropTable} handleDragOver={handleDragOver}/>

    </div>
  )
}

export default Home
