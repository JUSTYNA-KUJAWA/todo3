import React from 'react';
import Logo from '../../features/Logo/Logo';
import styles from './Welcome.module.scss';
const Welcome = () => {
  return (
    <div className={styles.root}>
      <Logo></Logo>
    </div>
  );
};
export default Welcome;