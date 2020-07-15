import React from 'react';
import uniqid from 'uniqid';

const DisplayCountries = ({ query, queryOn }) => {
  let nameArray = query.map((el) => <p key={uniqid()}>{el.name}</p>);
  let results = null;

  console.log(nameArray.length);
  //console.log(query[0].languages);

  nameArray.length === 1
    ? (results = (
        <div>
          <h2 style={{ marginBottom: '30px' }}>{query[0].name}</h2>
          <p>Hello!</p>
          <img src={query[0].flag} style={{ width: '10%' }} alt='country' />
        </div>
      ))
    : (results = null);

  if (nameArray.length > 1 && nameArray.length <= 10) {
    results = nameArray;
  } else if (nameArray.length > 10) {
    results = <p>Too many results, specify your query!</p>;
  } else if (nameArray.length === 1 && queryOn) {
    results = (
      <div>
        <h2 style={{ marginBottom: '30px' }}>{query[0].name}</h2>
        <p style={{ fontSize: '90%' }}>Capital city: {query[0].capital}</p>
        <p style={{ fontSize: '90%' }}>Population: {query[0].population}</p>
        <h3>Languages</h3>
        <ul>
          {query[0].languages.map((el) => (
            <li key={uniqid()}>{el.name}</li>
          ))}
        </ul>
        <img src={query[0].flag} style={{ width: '10%' }} alt='country' />
      </div>
    );
  } else {
    results = null;
  }

  return <div>{results}</div>;
};

export default DisplayCountries;
