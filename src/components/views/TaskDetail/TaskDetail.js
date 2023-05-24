import React from "react";
import { useParams } from "react-router";
import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getTaskById } from "../../../redux/tasksRedux";
import CommonButton from "../CommonButton/CommonButton";
import OfflineButton from "../OfflineButton/OfflineButton";
import Container from "@material-ui/core/Container";
import styles from "./TaskDetail.module.scss";
import utils from "../../../utils";

const TaskDetail = () => {
  const { id } = useParams();
  const task = useSelector((state) => getTaskById(state, id));

  const editButton = () => (
    <div className={styles.buttons}>
      <div className={styles.button}>
        <Link to={`/task2/${id}/edit`} className={styles.link}>
          <CommonButton>Edit Task</CommonButton>
        </Link>
      </div>
    </div>
  );

  if (!task) return <Navigate to="/" />;
  return (
    <Container>
      <div className={styles.infoContainer}>
        <h1>{task.title}</h1>
        <div className={styles.text}>
          <p>{task.text}</p>
        </div>
        <div className={styles.dates}>
          <p>
            Published: {utils.dateToStr(task.created)}{" "}
            {task.updated && (
              <span>Edited: {utils.dateToStr(task.updated)}</span>
            )}
          </p>
        </div>
        {editButton()}
        <Link to={`/mytasks`} className={styles.link}>
          <OfflineButton>Back to tasks</OfflineButton>
        </Link>
      </div>
    </Container>
  );
};

export default TaskDetail;
