import React from "react";
import styles from "./Group.module.css";
import InputGroup from "./Modal/InputGroup";
import { useState } from "react";
import { groupData } from "../Data/GroupPeopleData";

const Group = ({ handleDragStart }) => {
  const [showModal, setShowModal] = useState(false);

  const [groups, setGroups] = useState(
    groupData.map((group) => ({ ...group, draggableItem: null }))
  );

  const onSave = ({ groupName, groupSize }) => {
    const newGroup = {
      groupName: groupName,
      groupSize: parseInt(groupSize),
    };
    setGroups([...groups, { ...newGroup, draggableItem: null }]);
    console.log("Group data:", groups);
    groupData.push({ ...newGroup, draggableItem: null });
    setShowModal(false);
  };

  return (
    <>
      <div className={styles.group}>
        <div className={styles.wrap}>
          <h3>Grupe ljudi</h3>
          <div className={styles.groupList}>
            {groups.map((group, groupName) => (
              <div
                key={groupName}
                className={styles.groupItem}
                onDragStart={(e) =>
                  handleDragStart(e, group.groupName, "group")
                }
                draggable
              >
                <p>Group Name: {group.groupName}</p>
                <p>Number of People: {group.groupSize}</p>
              </div>
            ))}
          </div>
          <button
            className={styles.addButton}
            onClick={() => setShowModal(true)}
          >
            Dodaj Grupu
          </button>
          {showModal && (
            <InputGroup onSave={onSave} setShowModal={setShowModal} />
          )}
        </div>
      </div>
    </>
  );
};

export default Group;
