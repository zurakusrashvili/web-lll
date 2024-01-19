import React from 'react';
import clsx from 'clsx';
import styles from './copyright.module.css'

export default function FooterCopyright({ copyright }) {
  let copy = copyright.split('\n')
  return (
    <div className={clsx(styles["footer__copyright"])}>
      <div className={clsx(styles['footer__copyright__left'])}>
        <img className={clsx(styles['footer__copyright__left__img'])} src='/img/logo.svg'/>
        <div className={clsx(styles['footer__copyright__left__textcontent'])}>
          <p>{copy[0]}</p>
          <p>{copy[1]}</p>
        </div>
      </div>
      <p className={clsx(styles['footer__copyright__right'])}>
        Made with <img src='/img/heart.png' />  in Germany <img src='/img/germany.png' />
      </p>
    </div>
  );
}
