import React from "react";
import Draggable from "react-draggable";

import styles from "./Group.module.css";
import InputGroup from "./Modal/InputGroup";
import { useState } from "react";
import { groupData } from "../Data/GroupPeopleData";

const Group = () => {
  const [showModal, setShowModal] = useState(false);

  const [groups, setGroups] = useState(
    groupData.map((group) => ({ ...group, draggableItem: null }))
  );


  const onSave = ({ groupName, groupSize }) => {
    const newGroup = {
      groupName: groupName,
      groupSize: parseInt(groupSize),
    };
    setGroups([...groups, {...newGroup, draggableItem: null }]);
    console.log("Group data:", groups);
    setShowModal(false);
  };

  const handleGroupItemClick = (index) => {
    const updatedGroups = [...groups];
    updatedGroups[index].draggableItem = (
      <Draggable defaultPosition={{ x: 0, y: 0 }} key={index}>
        <div
          className={styles.draggableItem}
          style={{
            width: `${Math.ceil(groups[index].groupSize / 2) * 25}px`,
            height: "50px",
            position: "absolute",
          }}
        >
          Draggable Div
        </div>
      </Draggable>
    );
    setGroups(updatedGroups);
  };

  return (
    <div className={styles.group}>
      <h3>Grupe ljudi</h3>
      <div className={styles.groupList}>
        {groups.map((group, index) => (
          <div key={index}>
            <div
              className={styles.groupItem}
              onClick={() => handleGroupItemClick(index)}
            >
              <p>Group Name: {group.groupName}</p>
              <p>Number of People: {group.groupSize}</p>
            </div>
            {group.draggableItem}
          </div>
        ))}
      </div>
      <button className={styles.addButton} onClick={() => setShowModal(true)}>
        Dodaj Grupu
      </button>
      {showModal && <InputGroup onSave={onSave} setShowModal={setShowModal} />}
    </div>
  );
};

export default Group;
