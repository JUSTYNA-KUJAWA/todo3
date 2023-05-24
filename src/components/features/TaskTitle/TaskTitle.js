import React from "react";
import styles from "./TaskTitle.module.scss";
import SmallTaskTitle from "../../views/SmallTaskTitle/SmallTaskTitle";
import { Grid } from "@material-ui/core/";
import { useSelector } from "react-redux";
import { getAllToDo } from "../../../redux/tasksRedux";
import { Link } from "react-router-dom";
import CommonButton from "../../views/CommonButton/CommonButton";

const TaskTitle = () => {
  const tasks = useSelector((state) => getAllToDo(state));
  const taskTitle = tasks.slice(0, 2);
  console.log(taskTitle);
  return (
    <div className={styles.root}>
      <Link to={"/task/add"} className={styles.link}>
        <CommonButton>Add Task</CommonButton>
      </Link>
      <Link to={`/tasks`} className={styles.link}>
        <CommonButton>View all tasks</CommonButton>
      </Link>
      <h2>The list of all Tasks to do !</h2>
      <Grid container spacing={3}>
        {taskTitle.map((task) => (
          <Grid item xs={12} sm={4} key={task._id}>
            <SmallTaskTitle id={task._id} title={task.title} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default TaskTitle;
