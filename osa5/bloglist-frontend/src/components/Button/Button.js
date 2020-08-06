import React from 'react';
import classes from './Button.module.css';

const Button = ({ clicked, text, type }) => {
  const textPhrase = 'LoginCreateEnterCreate blog';
  return (
    <button
      onClick={clicked}
      type={type}
      className={
        textPhrase.includes(text)
          ? text === 'Login' || text === 'Enter'
            ? classes.LoginButton
            : classes.CreateButton
          : classes.LogoutButton
      }
    >
      {text}
    </button>
  );
};

export default Button;
