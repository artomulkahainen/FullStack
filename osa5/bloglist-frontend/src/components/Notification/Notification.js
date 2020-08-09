import React from 'react'
import classes from './Notification.module.css'

const Notification = ({ type, message }) => {
  return (
    <div className={type === 'Error' ? classes.Error : classes.Success}>
      <p>{message}</p>
    </div>
  )
}

export default Notification
