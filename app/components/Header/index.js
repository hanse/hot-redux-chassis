// @flow

import styles from './Header.css';
import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Modal } from 'react-overlays';
import cx from 'classnames';
import qs from 'query-string';
import HamburgerButton from 'app/components/HamburgerButton';
import Icon from 'app/components/Icon';
import Search from 'app/components/Search';

const navigationItems = [
  {
    to: '/',
    label: 'Home',
    LinkComponent: props => <NavLink {...props} exact />
  },
  {
    to: '/about',
    label: 'About',
    LinkComponent: NavLink
  },
  {
    to: '/contact',
    label: 'Contact',
    LinkComponent: NavLink
  }
];

/**
 * A responsive header component with titles and menus.
 * On small screens the menu collapses into an animated hamburger menu.
 */
class Header extends Component {
  state = {
    menuOpen: false
  };

  render() {
    return (
      <div className={styles.root}>
        <div className={styles.header}>
          <div className={styles.mobileMenu}>
            <HamburgerButton
              onClick={() => this.setState({ menuOpen: !this.state.menuOpen })}
              open={this.state.menuOpen}
            />
            <Link to="/" className={styles.mobileTitle}>
              React
            </Link>
          </div>

          <Link to="/" className={styles.desktopTitle}>
            hanse
          </Link>
          <ul
            className={cx(
              styles.navigationItems,
              this.state.menuOpen && styles.openMenu
            )}
          >
            {navigationItems.map(({ LinkComponent, to, label }) =>
              <li key={label}>
                <LinkComponent
                  to={to}
                  activeClassName={styles.activeItem}
                  onClick={() => this.setState({ menuOpen: false })}
                >
                  {label}
                </LinkComponent>
              </li>
            )}
          </ul>

          <button
            className={styles.searchButton}
            onClick={this.props.toggleSearch}
          >
            <Icon name="search" />
          </button>
        </div>

        <Modal
          show={this.props.searchOpen}
          onHide={this.props.toggleSearch}
          backdropClassName={styles.backdrop}
          backdrop
        >
          <Search
            query={qs.parse(this.props.location.search).q}
            onClose={this.props.toggleSearch}
          />
        </Modal>
      </div>
    );
  }
}

export default Header;
