import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };
  let text = 'You voted ' + notification.notification;
  return <div style={style}>{notification ? text : null}</div>;
};

export default Notification;
