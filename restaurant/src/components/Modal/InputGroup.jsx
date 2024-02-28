import React, { useState } from 'react';
import styles from "./modal.module.css"

function InputGroup({ onSave, setShowModal }) {
  const [groupName, setGroupName] = useState('');
  const [groupSize, setGroupSize] = useState('');

  const handleSave = () => {
    onSave({ groupName, groupSize: parseInt(groupSize) });
    setGroupName('');
    setGroupSize('');
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick= {()=> {  setShowModal(false)}}>&times;</span>
        <h2>Create Group</h2>
        <label htmlFor="groupName">Group Name:</label>
        <input
          type="text"
          id="groupName"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <label htmlFor="groupSize">Number of People:</label>
        <input
          type="number"
          id="groupSize"
          value={groupSize}
          onChange={(e) => setGroupSize(e.target.value)}
        />
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}

export default InputGroup;
