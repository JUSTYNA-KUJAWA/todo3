import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addTaskRequest } from "../../../redux/tasksRedux";
import TaskForm from "../../features/TaskForm/TaskForm";
import styles from "./TaskAdd.module.scss";

const TaskAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (task) => {
    dispatch(addTaskRequest(task));
    navigate("/");
  };

  return (
    <div className={styles.root}>
      <TaskForm action={handleSubmit} actionText="add" />
    </div>
  );
};

export default TaskAdd;
