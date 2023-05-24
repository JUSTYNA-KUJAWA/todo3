
import React from 'react';
import NavBar from '../NavBar/NavBar';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <div className={styles.root}>
      <NavBar/>
    </div>
  );
};

export default Header;