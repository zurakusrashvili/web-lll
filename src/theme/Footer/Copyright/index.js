import React from 'react';
import clsx from 'clsx';
import styles from './copyright.module.css'

export default function FooterCopyright({ copyright }) {
  let copy = copyright.split('\n')
  return (
    <div className={clsx(styles["footer__copyright"])}>
      <div className={clsx(styles['footer__copyright__left'])}>
        {/* <img src='img/logo.svg'/> */}
        <div>
          <p>{copy[0]}</p>
          <p>{copy[1]}</p>
        </div>
      </div>
      <p className={clsx(styles['footer__copyright__right'])}>
        Made with ❤ in <img src='img/germany.png' />
      </p>
    </div>
  );
}
