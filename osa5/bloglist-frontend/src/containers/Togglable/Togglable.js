import React, { useState, useImperativeHandle } from 'react';
import Button from '../../components/Button/Button';
import PropTypes from 'prop-types';

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      {visible ? (
        <div>
          {props.children}
          <Button text={props.buttonText2} clicked={() => setVisible(false)} />
        </div>
      ) : (
        <Button text={props.buttonText1} clicked={() => setVisible(true)} />
      )}
    </div>
  );
});

Togglable.propTypes = {
  buttonText1: PropTypes.string.isRequired,
  buttonText2: PropTypes.string.isRequired,
};

Togglable.displayName = 'Togglable';

export default Togglable;
