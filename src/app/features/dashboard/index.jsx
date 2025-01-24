"use client";
import React  from "react";
import styles from "./styles.module.scss";
import Sidebar from "../sidebar";
import StudentPage from "../student-page";


const Dashboard = () => {

  return (
    <div className={styles.wrapper}>
      <div className={styles.container_wrap}>
        <div className={styles.student_wrap}>
          <Sidebar />
        </div>
        <div className={styles.container}>
          <StudentPage />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
