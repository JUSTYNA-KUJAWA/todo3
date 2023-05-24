import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getIsLoading } from "../../../redux/tasksRedux";
import { TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";
import CommonButton from "../../views/CommonButton/CommonButton";
import { Link } from "react-router-dom";
import styles from "./TaskForm.module.scss";
import PropTypes from "prop-types";

const TaskForm = (props) => {
  // Form validation
  const {
    register,
    handleSubmit: validate,
    formState: { errors },
  } = useForm();

  // Get the load & error state
  const load = useSelector((state) => getIsLoading(state));

  // Post details
  const [title, setTitle] = useState(props.title || "");
  const [text, setDescription] = useState(props.text || "");
  const [category, setCategory] = useState(props.category || "");
  const [status, setStatus] = useState("draft");
  const [priority, setPriority] = useState(props.priority || "");
  const [users, setUsers] = useState(props.users || "");
  const [createdby, setCreatedby] = useState(props.createdby || "");

  const created = props.created || new Date();
  const datemax = props.created || new Date();
  const isUpdated = () =>
    props.actionText === "edit" ? new Date() : undefined;
  const updated = isUpdated();

  const handleStatusChange = (status) => {
    setStatus(status);
  };

  // Actions on form ubmit

  const handleSubmit = () => {
    const task = {
      created,
      updated,
      datemax,
      status,
      title,
      text,
      category,
      priority,
      createdby,
      users,
    };
    const formData = new FormData();

    for (let key of [
      "created",
      "updated",
      "datemax",
      "status",
      "title",
      "text",
      "category",
      "priority",
      "createdby",
      "users",
    ]) {
      formData.append(key, task[key]);
    }
    props.action(formData);
  };

  return (
    <div className={styles.root}>
      <form onSubmit={validate(handleSubmit)}>
        {load.success && !load.error && (
          <div className={styles.successMessage}>
            <p>Your task has been successfully submitted!</p>
          </div>
        )}
        {((!load.active && !load.success) || load.error) && (
          <div className={styles.form}>
            <TextField
              style={{ width: "100%", marginBottom: "10px" }}
              {...register("title", { required: true, maxLength: 200 })}
              type="text"
              label="title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              width="200px"
            />
            {errors.title && (
              <span className={styles.error}>
                This field is required. Title can have up to 200 characters.
              </span>
            )}

            <TextField
              style={{ width: "100%", marginTop: "30px", marginBottom: "10px" }}
              {...register("text", { required: true, maxLength: 1000 })}
              required
              type="text"
              multiline
              minRows={5}
              label="text"
              variant="outlined"
              value={text}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.text && (
              <span className={styles.error}>
                This field is required. Text can have up to 1000 characters.
              </span>
            )}
            <TextField
              style={{ width: "200px", margin: "5px" }}
              {...register("category", { required: true, maxLength: 20 })}
              required
              type="text"
              label="category"
              variant="outlined"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            {errors.category && (
              <span className={styles.error}>category is required.</span>
            )}

            <TextField
              style={{ width: "200px", margin: "5px" }}
              type="text"
              label="status"
              variant="outlined"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
            <div className={styles.buttons}>
              <div className={styles.button}>
                <CommonButton
                  onClick={() => handleStatusChange("in progres")}
                  type="submit"
                >
                  Save
                </CommonButton>
              </div>
              <Link to={`/tasks`} className={styles.link}>
                <CommonButton>Back Tasks</CommonButton>
              </Link>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

TaskForm.propTypes = {
  action: PropTypes.func.isRequired,
  actionText: PropTypes.string.isRequired,
  title: PropTypes.string,
  text: PropTypes.string,
  created: PropTypes.string,
  updated: PropTypes.string,
  status: PropTypes.string,
  category: PropTypes.string,
  priority: PropTypes.string,
  createdby: PropTypes.string,
  users: PropTypes.string,
  datemax: PropTypes.string,
};

export default TaskForm;
