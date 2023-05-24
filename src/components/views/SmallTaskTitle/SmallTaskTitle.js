import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardHeader, CardActions } from "@material-ui/core";
import OutlinedButton from "../OfflineButton/OfflineButton";
import PropTypes from "prop-types";
import styles from "./SmallTaskTitle.module.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    paddingBottom: "20pt",
    marginBottom: "20pt",
  },
}));

const SmallTaskTitle = (props) => {
  console.log(props);
  const classes = useStyles();
  return (
    <Card className={classes.root} elevation={2}>
      <CardHeader
        className={classes.header}
        title={props.title}
        subheader={""}
      />

      <CardActions>
        <Link to={`/task2/${props.id}`} className={styles.link}>
          {" "}
          <OutlinedButton>Show more</OutlinedButton>
        </Link>
      </CardActions>
    </Card>
  );
};

SmallTaskTitle.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default SmallTaskTitle;
