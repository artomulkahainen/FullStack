import React, { useState, useImperativeHandle } from 'react';
import Button from '../../components/Button/Button';

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

export default Togglable;
