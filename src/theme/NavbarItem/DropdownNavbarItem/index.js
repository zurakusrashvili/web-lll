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
import Link from '@docusaurus/Link';


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
  needhelp,
  additionaltags,
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
    <div key={index} className={clsx(styles['dropdown__menu-item-grid'])}>
      <a href={useBaseUrl(item.href)} className={clsx(styles['dropdown__menu-item-grid-link'])}>
        <img src={useBaseUrl(item.img)} alt={item.label} className={clsx(styles['dropdown__menu-item-grid-image'])} />
        <div className={clsx(styles['dropdown__menu-item-grid-content'])}>
          <h4 className={clsx(styles['dropdown__menu-item-grid-title'])}>{item.label}</h4>
          <p className={clsx(styles['dropdown__menu-item-grid-description'])}>{item.description}</p>
        </div>
      </a>
    </div>
  );





  // Function to categorize and render items for category-grid layout
  const renderCategoryGridItems = () => {
    const categories = items.reduce((acc, item) => {
      acc[item.category] = acc[item.category] || [];
      acc[item.category].push(item);
      return acc;
    }, {});

    const renderedCategories = Object.entries(categories).map(([category, categoryItems], index) => (
      <div key={index} className={clsx(styles['category-section'])}>
        <h3 className={clsx(styles['category-section__title'])}>{category}</h3>
        <div className={clsx(styles['category-grid'])}>
          {categoryItems.map((item, itemIndex) => (
            <a href={useBaseUrl(item.to)} key={itemIndex} className={clsx(styles['category-grid__item'])}>
              {item.icon && (
                <i className={clsx(item.icon, styles['category-grid__item__icon'])}></i> // Using class names for icons
              )}
              <span className={clsx(styles['category-grid__label'])}>{item.label}</span>
            </a>
          ))}
        </div>
      </div>
    ));

    // If needHelp property exists, render it
    const needHelpSection = needhelp && (
      <div className={clsx(styles['need-help'])}>
        <div className={clsx(styles['need-help__textwrapper'])}>
          <h3 className={clsx(styles['need-help__title'])}>{needhelp.title}</h3>
          <p className={clsx(styles['need-help__description'])}>{needhelp.description}</p>
        </div>
        <a href={useBaseUrl(needhelp.to)} className={clsx(styles['need-help__action'])}>
          <i className={clsx(needhelp.icon, styles['need-help__icon'])}></i>
        </a>
      </div>
    );

    const renderAdditionalTags = () => {
      return (
        <div className={clsx(styles['additional-tags-wrapper'])}>
          {additionaltags.map((tag, index) => (
            <a href={useBaseUrl(tag.to)} key={index} className={clsx(styles['additional-tag'])}>
              <h3 className={clsx(styles['additional-tag__title'])}>{tag.title}</h3>
              <p className={clsx(styles['additional-tag__description'])}>{tag.description}</p>
            </a>
          ))}
        </div>
      );
    };

    return (
      <>
        {renderedCategories}
        {needHelpSection}
        {additionaltags && renderAdditionalTags()}
      </>
    );
  };



  return (
    <div
      ref={dropdownRef}
      className={clsx('navbar__item', 'dropdown', 'dropdown--hoverable', {
        'dropdown--right': position === 'right',
        'dropdown--show': showDropdown,
        [menuType]: menuType
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
      <ul className={clsx('dropdown__menu', styles.dropdownMenu, { [styles[`dropdown__${menuType}`]]: menuType })}>
        {menuType === 'grid'
          ? items.map(renderGridItem) :
          menuType === 'category-grid'
            ? renderCategoryGridItems()
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
  menuType,
  additionaltags,
  needhelp,
  ...props
}) {
  const localPathname = useLocalPathname();
  const containsActive = containsActiveItems(items, localPathname);
  const { collapsed, toggleCollapsed, setCollapsed } = useCollapsible({
    initialState: () => !containsActive,
  });
  // Expand/collapse if any item active after a navigation
  useEffect(() => {
    if (containsActive) {
      setCollapsed(!containsActive);
    }
  }, [localPathname, containsActive, setCollapsed]);

  // Render grid item
  const renderGridItem = (item, index) => (
    <div key={index} className={clsx(styles['dropdown__menu-item-grid'])}>
      <a href={useBaseUrl(item.href)} className={clsx(styles['dropdown__menu-item-grid-link'])}>
        <img src={useBaseUrl(item.img)} alt={item.label} className={clsx(styles['dropdown__menu-item-grid-image'])} />
        <div className={clsx(styles['dropdown__menu-item-grid-content'])}>
          <h4 className={clsx(styles['dropdown__menu-item-grid-title'])}>{item.label}</h4>
          <p className={clsx(styles['dropdown__menu-item-grid-description'])}>{item.description}</p>
        </div>
      </a>
    </div>
  );





  // Function to categorize and render items for category-grid layout
  const renderCategoryGridItems = () => {
    const categories = items.reduce((acc, item) => {
      acc[item.category] = acc[item.category] || [];
      acc[item.category].push(item);
      return acc;
    }, {});

    const renderedCategories = Object.entries(categories).map(([category, categoryItems], index) => (
      <div key={index} className={clsx(styles['category-section'])}>
        <h3 className={clsx(styles['category-section__title'])}>{category}</h3>
        <div className={clsx(styles['category-grid'])}>
          {categoryItems.map((item, itemIndex) => (
            <a href={useBaseUrl(item.to)} key={itemIndex} className={clsx(styles['category-grid__item'])}>
              {item.icon && (
                <i className={clsx(item.icon, styles['category-grid__item__icon'])}></i> // Using class names for icons
              )}
              <span className={clsx(styles['category-grid__label'])}>{item.label}</span>
            </a>
          ))}
        </div>
      </div>
    ));

    // If needHelp property exists, render it
    const needHelpSection = needhelp && (
      <div className={clsx(styles['need-help'])}>
        <div className={clsx(styles['need-help__textwrapper'])}>
          <h3 className={clsx(styles['need-help__title'])}>{needhelp.title}</h3>
          <p className={clsx(styles['need-help__description'])}>{needhelp.description}</p>
        </div>
        <a href={useBaseUrl(needhelp.to)} className={clsx(styles['need-help__action'])}>
          <i className={clsx(needhelp.icon, styles['need-help__icon'])}></i>
        </a>
      </div>
    );

    const renderAdditionalTags = () => {
      return (
        <div className={clsx(styles['additional-tags-wrapper'])}>
          {additionaltags.map((tag, index) => (
            <a href={useBaseUrl(tag.to)} key={index} className={clsx(styles['additional-tag'])}>
              <h3 className={clsx(styles['additional-tag__title'])}>{tag.title}</h3>
              <p className={clsx(styles['additional-tag__description'])}>{tag.description}</p>
            </a>
          ))}
        </div>
      );
    };

    return (
      <>
        {renderedCategories}
        {needHelpSection}
        {additionaltags && renderAdditionalTags()}
      </>
    );
  };


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

        {menuType === 'grid'
          ? items.map(renderGridItem) :
          menuType === 'category-grid'
            ? renderCategoryGridItems()
            : items.map((childItemProps, i) => (
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
export default function DropdownNavbarItem({ mobile = false, ...props }) {
  const Comp = mobile ? DropdownNavbarItemMobile : DropdownNavbarItemDesktop;
  return <Comp {...props} />;
}
