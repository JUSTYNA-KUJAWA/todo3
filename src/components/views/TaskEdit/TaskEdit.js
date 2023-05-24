import React from "react";
import { useParams } from "react-router";
import { useNavigate, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateTaskRequest } from "../../../redux/tasksRedux";
import { getTaskById } from "../../../redux/tasksRedux";
import TaskForm from "../../features/TaskForm/TaskForm";
import styles from "./TaskEdit.module.scss";

const TaskEdit = () => {
  const { id } = useParams();
  const taskData = useSelector((state) => getTaskById(state, id));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (task) => {
    dispatch(updateTaskRequest(task, id));
    navigate("/mytasks");
  };

  if (!taskData) return <Navigate to="/" />;
  return (
    <div className={styles.root}>
      <TaskForm
        action={handleSubmit}
        actionText="edit"
        title={taskData.title}
        text={taskData.text}
        category={taskData.category}
        status={taskData.status}
        priority={taskData.priority}
        created={taskData.created}
        updated={taskData.updated}
        mail={taskData.mail}
        nickname={taskData.nickname}
      />
    </div>
  );
};

export default TaskEdit;
