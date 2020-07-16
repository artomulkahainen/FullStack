import React from 'react';
import uniqid from 'uniqid';

const Numbers = ({ persons, personRemove }) => {
  return (
    <div>
      <h2>Numbers</h2>
      {persons.map((el) => (
        <p
          key={uniqid()}
          onClick={() => personRemove(el)}
          style={{ width: '250px' }}>
          {el.name} {el.number}
        </p>
      ))}
    </div>
  );
};

export default Numbers;
