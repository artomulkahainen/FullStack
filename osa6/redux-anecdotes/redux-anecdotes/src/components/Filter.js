import React from 'react';

const Filter = ({ setFilterText, filter }) => {
  const handleChange = (event) => {
    if (event.target.value === '') {
      setFilterText(null);
    }
    filter(event.target.value);
    setFilterText(event.target.value);
  };
  return (
    <div>
      <p>
        filter <input onChange={handleChange}></input>
      </p>
    </div>
  );
};

export default Filter;
