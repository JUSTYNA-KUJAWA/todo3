import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { teal } from '@material-ui/core/colors';

const CommonButton = (props) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      fontWeight: "bold",
      background: teal[700],
      borderRadius: 3,
      border: 0,
      height: 48,
      padding: '0 30px',
      boxShadow: '0 5px 7px 2px teal[500]',
      margin: '15px 15px',
      '&:hover': {
        backgroundColor: 'teal[900]',
        boxShadow: 'teal[900]',
      },
    button:{
      '&:hover': {
        backgroundColor: 'teal[500]',
        boxShadow: 'teal[900]',
        color: 'cyan[400]',
      }, 
    },
    label: {
      color: `${theme.palette.common.white}`,
    },
  }
  }));

  const classes = useStyles();
  return (
    <Button
      classes={{
        root: classes.root,
        label: classes.label,
      }}
      type={props.type}
      onClick={props.onClick}
    >
      {props.children}
    </Button>
  );
};

CommonButton.propTypes = {
  children: PropTypes.string.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func,
};

export default CommonButton;