import React from 'react';
import classes from './Button.module.css';

const Button = ({ id, clicked, text, type }) => {
  const textPhrase = 'LoginCreateEnterCreate blogviewLike';
  return (
    <button
      id={id}
      onClick={clicked}
      type={type}
      className={
        textPhrase.includes(text)
          ? text === 'Login' || text === 'Enter'
            ? classes.LoginButton
            : classes.CreateButton
          : classes.LogoutButton
      }>
      {text}
    </button>
  );
};

export default Button;
