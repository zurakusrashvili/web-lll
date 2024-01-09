import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import {
  isRegexpStringMatch,
  useCollapsible,
  Collapsible,
} from '@docusaurus/theme-common';
import { isSamePath, useLocalPathname } from '@docusaurus/theme-common/internal';
import NavbarNavLink from '@theme/NavbarItem/NavbarNavLink';
import NavbarItem from '@theme/NavbarItem';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

function isItemActive(item, localPathname) {
  if (isSamePath(item.to, localPathname)) {
    return true;
  }
  if (isRegexpStringMatch(item.activeBaseRegex, localPathname)) {
    return true;
  }
  if (item.activeBasePath && localPathname.startsWith(item.activeBasePath)) {
    return true;
  }
  return false;
}

function containsActiveItems(items, localPathname) {
  return items.some((item) => isItemActive(item, localPathname));
}

function DropdownNavbarItemDesktop({
  items,
  position,
  className,
  menuType,
  ...props
}) {
  const dropdownRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!dropdownRef.current || dropdownRef.current.contains(event.target)) {
        return;
      }
      setShowDropdown(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('focusin', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('focusin', handleClickOutside);
    };
  }, [dropdownRef]);

  // Render grid item
  const renderGridItem = (item, index) => (
    <div key={index} className="dropdown__menu-item-grid">
      <a href={useBaseUrl(item.href)} className="dropdown__menu-item-grid-link">
        <img src={useBaseUrl(item.img)} alt={item.label} className="dropdown__menu-item-grid-image" />
        <div className="dropdown__menu-item-grid-content">
          <h4 className="dropdown__menu-item-grid-title">{item.label}</h4>
          <p className="dropdown__menu-item-grid-description">{item.description}</p>
        </div>
      </a>
    </div>
  );

  //Render Category-Grid Layout
   const renderCategoryGridItem = (item, index) => {
    return (
      <div key={index} className="category-grid__item">
        {item.icon && (
          <img src={useBaseUrl(item.icon)} alt={item.label} className="category-grid__icon" />
        )}
        <div className="category-grid__label">{item.label}</div>
      </div>
    );
  };

  return (
    <div
      ref={dropdownRef}
      className={clsx('navbar__item', 'dropdown', 'dropdown--hoverable', {
        'dropdown--right': position === 'right',
        'dropdown--show': showDropdown,
        [styles.dropdownGrid]: menuType === 'grid', // Apply grid styles conditionally,
        [styles.dropdownCategoryGrid]: menuType === 'category-grid'
      }, className)}
      {...props}
    >
      <NavbarNavLink
        aria-haspopup="true"
        aria-expanded={showDropdown}
        role="button"
        href={props.to ? undefined : '#'}
        className={clsx('navbar__link', styles.navbarLink)}
        {...props}
        onClick={props.to ? undefined : (e) => {
          e.preventDefault();
          setShowDropdown(!showDropdown);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            setShowDropdown(!showDropdown);
          }
        }}
      >
        {props.children ?? props.label}
      </NavbarNavLink>
      <ul className={clsx('dropdown__menu', styles.dropdownMenu, { [styles.dropdownGridMenu]: menuType === 'grid' })}>
        {menuType === 'grid'
          ? items.map(renderGridItem) : 
          menuType === 'category-grid'
          ? items.map(renderCategoryGridItem) 
          : items.map((childItemProps, i) => (
              <NavbarItem
                isDropdownItem
                activeClassName="dropdown__link--active"
                {...childItemProps}
                key={i}
              />
            ))}
      </ul>
    </div>
  );
}

function DropdownNavbarItemMobile({
  items,
  className,
  position, // Need to destructure position from props so that it doesn't get passed on.
  onClick,
  ...props
}) {
  const localPathname = useLocalPathname();
  const containsActive = containsActiveItems(items, localPathname);
  const {collapsed, toggleCollapsed, setCollapsed} = useCollapsible({
    initialState: () => !containsActive,
  });
  // Expand/collapse if any item active after a navigation
  useEffect(() => {
    if (containsActive) {
      setCollapsed(!containsActive);
    }
  }, [localPathname, containsActive, setCollapsed]);
  return (
    <li
      className={clsx('menu__list-item', {
        'menu__list-item--collapsed': collapsed,
      })}>
      <NavbarNavLink
        role="button"
        className={clsx(
          styles.dropdownNavbarItemMobile,
          'menu__link menu__link--sublist menu__link--sublist-caret',
          className,
        )}
        {...props}
        onClick={(e) => {
          e.preventDefault();
          toggleCollapsed();
        }}>
        {props.children ?? props.label}
      </NavbarNavLink>
      <Collapsible lazy as="ul" className="menu__list" collapsed={collapsed}>
        {items.map((childItemProps, i) => (
          <NavbarItem
            mobile
            isDropdownItem
            onClick={onClick}
            activeClassName="menu__link--active"
            {...childItemProps}
            key={i}
          />
        ))}
      </Collapsible>
    </li>
  );
}
export default function DropdownNavbarItem({mobile = false, ...props}) {
  const Comp = mobile ? DropdownNavbarItemMobile : DropdownNavbarItemDesktop;
  return <Comp {...props} />;
}
