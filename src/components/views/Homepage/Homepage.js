import React, { useEffect } from "react";
import Welcome from "../Welcome/Welcome";
import ListAllTasks from "../ListAllTasks/ListAllTasks";
import styles from "./Homepage.module.scss";

const Homepage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={styles.root}>
      <Welcome />
      <ListAllTasks />
    </div>
  );
};

export default Homepage;
