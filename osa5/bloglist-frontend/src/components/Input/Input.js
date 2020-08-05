import React from 'react';
import classes from './Input.module.css';

const Input = ({ type, value, name, onChange }) => (
  <div className={classes.Input}>
    <p>
      {name}{' '}
      <input type={type} value={value} name={name} onChange={onChange}></input>
    </p>
  </div>
);

export default Input;
