import React from 'react'
import Group from '../components/Group'
import Room from '../components/Room'
import Table from '../components/Table'
import styles from "./Home.module.css"
import { groupData } from '../Data/GroupPeopleData'
import { useState } from 'react'
const Home = () => {


  const [droppedElement, setDroppedElement] = useState([]);

const [groups, setGroups] = useState([])
const handleDragOver = (e) => {
  e.preventDefault();

}

const handleDragStart = (e, groupName) => {
  e.dataTransfer.setData("groupName", groupName);
};


const handleDrop = (e) => {
 console.log(groupData)
  e.preventDefault();
    const groupName = e.dataTransfer.getData("groupName");

    const groupIndex = groupData.findIndex(group => group.groupName === groupName);
  console.log(groupData[groupIndex])
    if (groupIndex === -1) {
      const newGroup = {
        groupName: groupName,
        groupSize: 0,
      };
      setGroups([...groups, newGroup]);
      setDroppedElement([...droppedElement, newGroup]);
    }
    setDroppedElement([...droppedElement, groupData[groupIndex]]);

};



  return (
    <div className={styles.home} >
        <Group  handleDragStart={handleDragStart} />
        <Room handleDragOver={handleDragOver} handleDragStart={handleDragStart} handleDrop = {handleDrop} droppedElement={droppedElement}/>
        <Table/>

    </div>
  )
}

export default Home
