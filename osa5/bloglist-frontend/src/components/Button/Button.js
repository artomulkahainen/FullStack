import React from 'react';
import classes from './Button.module.css';

const Button = ({ clicked, text, type }) => (
  <button
    onClick={clicked}
    type={type}
    className={
      text === 'Login' || text === 'Create'
        ? text === 'Login'
          ? classes.LoginButton
          : classes.CreateButton
        : classes.LogoutButton
    }>
    {text}
  </button>
);

export default Button;
