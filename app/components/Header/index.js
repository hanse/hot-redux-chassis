// @flow

import styles from './Header.css';
import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import Modal from 'react-modal';
import cx from 'classnames';
import qs from 'query-string';
import HamburgerButton from 'app/components/HamburgerButton';
import Icon from 'app/components/Icon';
import Search from 'app/components/Search';

const ExactLink = props => <NavLink {...props} exact />;

const navigationItems = [
  {
    to: '/',
    label: 'Home',
    LinkComponent: ExactLink
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

type Props = {
  openSearch: () => void,
  closeSearch: () => void,
  searchOpen: boolean,
  location: {
    search: string
  }
};

type State = {
  menuOpen: boolean
};

/**
 * A responsive header component with titles and menus.
 * On small screens the menu collapses into an animated hamburger menu.
 */
class Header extends Component<Props, State> {
  state = {
    menuOpen: false
  };

  handleToggleMenu = () => {
    this.setState(state => ({ menuOpen: !state.menuOpen }));
  };

  handleCloseMenu = () => {
    this.setState({ menuOpen: false });
  };

  handleOpenSearch = () => {
    this.setState({ menuOpen: false });
    this.props.openSearch();
  };

  render() {
    return (
      <div className={styles.root}>
        <div className={styles.header}>
          <div className={styles.mobileMenu}>
            <HamburgerButton
              onClick={this.handleToggleMenu}
              open={this.state.menuOpen}
            />
            <Link to="/" className={styles.mobileTitle}>
              hanse
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
            {navigationItems.map(({ LinkComponent, to, label }) => (
              <li key={label}>
                <LinkComponent
                  to={to}
                  activeClassName={styles.activeItem}
                  onClick={this.handleCloseMenu}
                >
                  {label}
                </LinkComponent>
              </li>
            ))}
          </ul>

          <button
            className={styles.searchButton}
            onClick={this.handleOpenSearch}
          >
            <Icon name="search" />
          </button>
        </div>

        <Modal
          isOpen={this.props.searchOpen}
          onRequestClose={this.props.closeSearch}
          className={{
            base: styles.modalContent
          }}
          overlayClassName={{
            base: styles.backdrop
          }}
          contentLabel="Search"
        >
          <Search
            query={qs.parse(this.props.location.search).q}
            onClose={this.props.closeSearch}
          />
        </Modal>
      </div>
    );
  }
}

export default Header;
