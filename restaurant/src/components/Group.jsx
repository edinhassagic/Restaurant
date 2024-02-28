import React from 'react'
import styles from "./Group.module.css"
import InputGroup from './Modal/InputGroup'
import { useState } from 'react';
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
      <h3>Grupe ljudi</h3>
      <div className={styles.groupList}>
        {groupData.map((group, index) => (
          <div className={styles.groupItem} key={index}>
            <p>Ime grupe: {group.groupName}</p>
            <p>Kapacitet grupe: {group.groupSize}</p>
          </div>
        ))}
      </div>
      <button className={styles.addButton} onClick={() => setShowModal(true)}>
        Dodaj Grupu
      </button>
      {showModal && <InputGroup onSave={onSave} setShowModal={setShowModal} />}
    </div>
  )
}

export default Group
