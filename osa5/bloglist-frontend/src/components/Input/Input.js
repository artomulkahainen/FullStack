import React from 'react'
import classes from './Input.module.css'
import PropTypes from 'prop-types'

const Input = ({ type, value, name, onChange }) => (
  <div className={classes.Input}>
    <p>
      {name}{' '}
      <input type={type} value={value} name={name} onChange={onChange}></input>
    </p>
  </div>
)

Input.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
}

export default Input
