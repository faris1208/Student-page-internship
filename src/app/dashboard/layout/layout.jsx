import React, { useContext } from 'react'
// import Sidebar from '../sidebar/sidebar'
import styles from './layout.module.scss'
import LevelContext from '@/context/LevelContext';
import { redirect } from 'next/navigation';

const Layout = ({children}) => {
  // const { getTokenFromLocalStorage } = useContext(LevelContext);

  // const userToken = getTokenFromLocalStorage();
  // if (!userToken){
  //   redirect("/")
  // }

  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.container}>
        {children}
      </div>
    </div>
  )
}



export default Layout