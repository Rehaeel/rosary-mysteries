import React from 'react';
import classes from './mystery-fragment.module.css';

export const Backdrop = props => {
  document.addEventListener('keydown', function (e) {
    if (e.code === 'Escape') {
      props.onClickHanddler();
    }
  });
  return (
    <div className={classes.backdrop} onClick={props.onClickHanddler}></div>
  );
};

export const MysteryFragment = props => {
  document.addEventListener('keydown', function (e) {
    if (e.code === 'Escape') {
      props.onClickHanddler();
    }
  });

  return (
    <div className={classes['mystery-fragment']}>
      <p className={classes.close} onClick={props.onClickHanddler}>
        X
      </p>
      {props.children}
    </div>
  );
};
