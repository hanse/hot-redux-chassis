// @flow

import styles from './Header.css';
import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';
import cx from 'classnames';
import HamburgerButton from 'app/components/HamburgerButton';

const navigationItems = [{
  to: '/',
  label: 'Home',
  LinkComponent: IndexLink
}, {
  to: '/about',
  label: 'About',
  LinkComponent: Link
}, {
  to: '/contact',
  label: 'Contact',
  LinkComponent: Link
}];


/**
 * A responsive header component with titles and menus.
 * On small screens the menu collapses into an animated hamburger menu.
 */
class Header extends Component {
  state = {
    isOpen: false
  };

  render() {
    return (
      <div className={styles.root}>
        <div className={styles.header}>
          <div className={styles.mobileMenu}>
            <Link to="/" className={styles.mobileTitle}>hanse</Link>
            <HamburgerButton
              onClick={() => this.setState({ isOpen: !this.state.isOpen })}
              open={this.state.isOpen}
            />
          </div>

          <Link to="/" className={styles.desktopTitle}>hanse</Link>
          <ul className={cx(styles.navigationItems, this.state.isOpen && styles.openMenu)}>
            {navigationItems.map(({ LinkComponent, to, label }, index) => (
              <li key={index}>
                <LinkComponent
                  to={to}
                  activeClassName={styles.activeItem}
                  onClick={() => this.setState({ isOpen: false })}
                >{label}</LinkComponent>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Header;
