import React from "react";
import styles from "./NavBar.module.scss";
import HomeIcon from "@material-ui/icons/Home";
import { teal } from "@material-ui/core/colors";
import { Link } from "react-router-dom";
import { IconButton } from "@material-ui/core";

const NavBar = () => (
  <div className={styles.root}>
    <div>
      <IconButton
        edge="start"
        className={styles.link}
        color="inherit"
        aria-label="menu"
        component={Link}
        to={"/"}
      >
        <HomeIcon style={{ color: teal[800], fontSize: "40px" }} />
      </IconButton>
    </div>
    <h3>ToDoList</h3>
  </div>
);

export default NavBar;
