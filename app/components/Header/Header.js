import styles from './Header.css';
import React from 'react';
import { Link, IndexLink } from 'react-router';

const Navigation = () => (
  <nav className={styles.navigation}>
    <ul>
      <li><IndexLink to='/' activeClassName='active'>Home</IndexLink></li>
      <li><Link to='/about' activeClassName='active'>About</Link></li>
      <li><Link to='/contact' activeClassName='active'>Contact</Link></li>
    </ul>
  </nav>
);

export default () => (
  <div className={styles.root}>
    <Navigation />
  </div>
);