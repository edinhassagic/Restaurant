import React from 'react'
import Draggable from 'react-draggable';

import styles from "./Group.module.css"
import InputGroup from './Modal/InputGroup'
import { useState } from 'react';
import { groupData } from '../Data/GroupPeopleData';

const Group = () => {
  const [showModal, setShowModal] = useState(false);

  const [groups, setGroups] = useState(groupData);
  const [selectedGroup, setSelectedGroup] = useState([]);

  const onSave = ({ groupName, groupSize }) => {
    const newGroup = {
      groupName: groupName,
      groupSize: parseInt(groupSize),
    };
    setGroups([...groups, newGroup]);
    console.log('Group data:', groups);
    setShowModal(false)
  };

  const handleGroupItemClick = (index) => {
    setSelectedGroup(index);
  };


  return (
    <>
   
    <div className={styles.group}>
    <div className={styles.wrap}>
      <h3>Grupe ljudi</h3>
      <div className={styles.groupList}>
      {groups.map((group, index) => (
          <div key={index}>
            <div
              className={selectedGroup === index ? styles.selectedGroupItem : styles.groupItem}
              onClick={() => handleGroupItemClick(index)}
            >
              <p>Group Name: {group.groupName}</p>
              <p>Number of People: {group.groupSize}</p>
            </div>
            {selectedGroup === index && (
              <Draggable defaultPosition={{ x: 0, y: 0 }}>
                <div className={styles.draggableItem} style={{ width: `${Math.ceil(group.groupSize / 2)*25}px`, height: '50px' , position: 'absolute'}}>
                  Draggable Div
                </div>
              </Draggable>
            )}
          </div>
        ))}
      </div>
      <button className={styles.addButton} onClick={() => setShowModal(true)}>
        Dodaj Grupu
      </button>
      {showModal && <InputGroup onSave={onSave} setShowModal={setShowModal} />}
    </div>
    </div>
    </>
  );
};

export default Group;
