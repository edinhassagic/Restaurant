import React from 'react'
import Group from '../components/Group'
import Room from '../components/Room'
import Table from '../components/Table'
import styles from "./Home.module.css"
const Home = () => {
  return (
    <div className={styles.home}>
        <Group/>
        <Room/>
        <Table/>

    </div>
  )
}

export default Home