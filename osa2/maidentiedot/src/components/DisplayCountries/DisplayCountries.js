import React, { useState, useEffect } from 'react';
import axios from 'axios';
import uniqid from 'uniqid';

const DisplayCountries = ({ query, queryOn }) => {
  const [weather, setWeather] = useState(null);
  const [newWeatherQuery, setNewWeatherQuery] = useState(false);
  const api_key = process.env.REACT_APP_API_KEY;

  const getWeather = (city) => {
    let formatCity = city.replace(/ /g, '+');
    axios
      .get(
        'http://api.weatherstack.com/current?access_key=' +
          api_key +
          '&query=' +
          formatCity
      )
      .then((response) => {
        console.log('axios fired up in weather');
        setWeather(response.data.current);
        console.log('promise solved with weather');
      });
  };

  useEffect(() => setNewWeatherQuery(false), [query]);

  let nameArray = query.map((el) => <p key={uniqid()}>{el.name}</p>);
  let results = null;
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
    if (!newWeatherQuery) {
      getWeather(query[0].capital);
      setNewWeatherQuery(true);
    }

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
        <h3>Weather in {query[0].capital}</h3>
        <p style={{ fontWeight: 500 }}>
          Temperature: {weather === null ? null : weather.temperature}
        </p>
        <img
          src={weather === null ? null : weather.weather_icons}
          style={{ width: '10%' }}
          alt='weather'
        />
        <p style={{ fontWeight: 500 }}>
          Wind: {weather === null ? null : weather.wind_speed} mph direction{' '}
          {weather === null ? null : weather.wind_dir}
        </p>
      </div>
    );
  } else {
    results = null;
  }

  return <div>{results}</div>;
};

export default DisplayCountries;
