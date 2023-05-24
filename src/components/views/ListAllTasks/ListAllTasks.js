import React, { useEffect } from "react";
import PropTypes from "prop-types";
import TaskTitle from "../../features/TaskTitle/TaskTitle";
import Container from "@material-ui/core/Container";
import styles from "./ListAllTasks.module.scss";

const ListAllTasks = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Container className={styles.root}>
      <TaskTitle />
    </Container>
  );
};
ListAllTasks.propTypes = {
  className: PropTypes.string,
};

export default ListAllTasks;
