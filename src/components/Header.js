import './Header.css';
import React from 'react';
import { Link } from 'react-router';

const Navigation = ({ items }) => (
  <nav className='Navigation'>
    <ul>{items.map(([href, label]) => <li><Link to={href}>{label}</Link></li>)}</ul>
  </nav>
);

export default () => (
  <div className='Header'>
    <Navigation items={[
      ['', 'Hjem'],
      ['', 'About'],
      ['', 'Hello']
    ]} />
  </div>
);
