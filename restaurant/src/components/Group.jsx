import React from 'react'
import styles from "./Group.module.css"
import InputGroup from './Modal/InputGroup'
import {useState} from 
import { groupData } from '../Data/GroupPeopleData';

const Group = () => {
  const [showModal, setShowModal] = useState(false)

  const onSave = ({groupName, groupSize}) => {
    const newGroup = {
      groupName: groupName,
      groupSize: parseInt(groupSize)
    };
    groupData.push(newGroup);
    console.log('Group data:', groupData); 
    setShowModal(false)
   
  };
  return (
    <div className={styles.group}>
      <div className={styles.groupList}>
        {groups.map((group, index) => (
          <div className={styles.groupItem} key={index}>
            <p>Group Name: {group.groupName}</p>
            <p>Number of People: {group.groupSize}</p>
          </div>
        ))}
      </div>
      <button className={styles.addButton} onClick={() => setShowModal(true)}>
        Add Group
      </button>
      {showModal && <InputGroup onSave={onSave} />}
    </div>
  )
}

export default Group
