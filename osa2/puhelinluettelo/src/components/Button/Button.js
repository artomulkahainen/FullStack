import React from 'react';

const Button = ({ formSend, type }) => (
  <button onClick={formSend}>{type}</button>
);

export default Button;
