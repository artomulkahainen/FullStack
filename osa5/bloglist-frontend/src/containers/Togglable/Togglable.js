import React, { useState } from 'react';
import Button from '../../components/Button/Button';

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      {visible ? (
        <div>
          {props.children}
          <Button text={props.cancel} clicked={() => setVisible(false)} />
        </div>
      ) : (
        <Button text={props.login} clicked={() => setVisible(true)} />
      )}
    </div>
  );
};

export default Togglable;
