import React from 'react';
import classes from './Notification.module.css';

const Notification = ({ message, type }) => {
  return (
    <div className={type === 'error' ? classes.error : classes.notification}>
      {message}
    </div>
  );
};

export default Notification;
