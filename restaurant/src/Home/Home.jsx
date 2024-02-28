import React from 'react'
import Draggable from 'react-draggable';
import styles from "./Home.module.css";
const Home = () => {
  return (
    <>
    <div  className={styles.mainbox}>
        <Draggable bounds="parent">
          <div className={styles.drag_div}>
            Drag me within the parent div
          </div>
        </Draggable>
      </div>
    </>
  )
}

export default Home
