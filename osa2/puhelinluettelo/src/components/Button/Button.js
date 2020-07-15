import React from 'react';

const Button = ({ formSend, text }) => (
  <button onClick={formSend}>{text}</button>
);

export default Button;
