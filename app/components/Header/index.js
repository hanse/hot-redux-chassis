/** @flow */

import styles from './Header.css';
import React from 'react';
import { Link, IndexLink } from 'react-router';

const Navigation = () => (
  <nav className={styles.navigation}>
    <ul>
      <li><IndexLink to="/" activeClassName={styles.activeItem}>Home</IndexLink></li>
      <li><Link to="/about" activeClassName={styles.activeItem}>About</Link></li>
      <li><Link to="/contact" activeClassName={styles.activeItem}>Contact</Link></li>
    </ul>
  </nav>
);

export default () => (
  <div className={styles.root}>
    <Navigation />
  </div>
);
