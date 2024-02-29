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

  const [groups, setGroups] = useState([]);
  const handleDragOver = (e) => {
    e.preventDefault();
  };

const handleDragStart = (e, groupName, type) => {

  if(type === "group"){
  e.dataTransfer.setData("groupName", groupName);}
  else{
    e.dataTransfer.setData("tableName", groupName)
  }
};


  const handleDrop = (e) => {
    console.log(groupData);
    e.preventDefault();
    const groupName = e.dataTransfer.getData("groupName");
    const tableName = e.dataTransfer.getData("tableName")
    console.log(tableName)
    const groupIndex = groupData.findIndex(group => group.groupName === groupName);
    const tableIndex = TableData.findIndex(table => table.name === tableName )
    if (groupIndex != -1 )setDroppedElementGroup([...droppedElementGroup, groupData[groupIndex]]);
 console.log(TableData[tableIndex])

    if (tableIndex != -1 )setDroppedElementTable([...droppedElementTable, TableData[tableIndex]]);

};



  return (
    <div className={styles.home} >
        <Group  handleDragStart={handleDragStart} />
        <Room handleDragOver={handleDragOver} handleDragStart={handleDragStart} handleDrop = {handleDrop} droppedElementGroup={droppedElementGroup} droppedElementTable={droppedElementTable}/>
        <Table handleDragStart={handleDragStart} />

    </div>
  );
};

export default Home;
