import React from 'react';
import uniqid from 'uniqid';

const Numbers = ({ persons }) => {
  return (
    <div>
      <h2>Numbers</h2>
      {persons.map((el) => (
        <p key={uniqid()}>
          {el.name} {el.number}
        </p>
      ))}
    </div>
  );
};

export default Numbers;
