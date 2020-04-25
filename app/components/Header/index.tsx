import styles from './Header.css';
import React, { useState } from 'react';
import { NavLink, Link, NavLinkProps } from 'react-router-dom';
import Modal from 'react-modal';
import cx from 'classnames';
import qs from 'query-string';
import HamburgerButton from 'app/components/HamburgerButton';
import Icon from 'app/components/Icon';
import Search from 'app/components/Search';

const ExactLink = (props: NavLinkProps) => <NavLink {...props} exact />;

const navigationItems = [
  {
    to: '/',
    label: 'Dashboard',
    LinkComponent: ExactLink,
  },
  {
    to: '/about',
    label: 'README',
    LinkComponent: NavLink,
  },
  {
    to: '/contact',
    label: 'Contact',
    LinkComponent: NavLink,
  },
];

type Props = {
  openSearch: () => void;
  closeSearch: () => void;
  searchOpen: boolean;
  location: {
    search: string;
  };
};

/**
 * A responsive header component with titles and menus.
 * On small screens the menu collapses into an animated hamburger menu.
 */

function Header(props: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((open) => !open);
  const closeMenu = () => setMenuOpen(false);
  const openSearch = () => {
    setMenuOpen(false);
    props.openSearch();
  };

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.mobileMenu}>
          <HamburgerButton onClick={toggleMenu} open={menuOpen} />
          <Link to="/" className={styles.mobileTitle}>
            hanse
          </Link>
        </div>

        <Link to="/" className={styles.desktopTitle}>
          hanse
        </Link>
        <ul className={cx(styles.navigationItems, menuOpen && styles.openMenu)}>
          {navigationItems.map(({ LinkComponent, to, label }) => (
            <li key={label}>
              <LinkComponent
                to={to}
                activeClassName={styles.activeItem}
                onClick={closeMenu}
              >
                {label}
              </LinkComponent>
            </li>
          ))}
        </ul>

        <button className={styles.searchButton} onClick={openSearch}>
          <Icon name="search" />
        </button>
      </div>

      <Modal
        isOpen={props.searchOpen}
        onRequestClose={props.closeSearch}
        className={styles.modalContent}
        overlayClassName={styles.backdrop}
        contentLabel="Search"
      >
        <Search
          query={qs.parse(props.location.search).q as string | undefined}
          onClose={props.closeSearch}
        />
      </Modal>
    </div>
  );
}

export default Header;
