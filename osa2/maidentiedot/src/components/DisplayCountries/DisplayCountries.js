import React, { useState, useEffect } from 'react';
import axios from 'axios';
import uniqid from 'uniqid';
import Button from '../Button/Button';

const DisplayCountries = ({ query, queryOn }) => {
  // weather state is used for storing the details from json-file
  const [weather, setWeather] = useState(null);

  // newWeatherQuery state is checking, if
  const [newWeatherQuery, setNewWeatherQuery] = useState(false);

  // showElement state is for the situations, when end user chooses country by pressing the button
  const [showElement, setShowElement] = useState(false);

  // currentEl state stores the element, what end user chose by pressing the button
  const [currentEl, setCurrentEl] = useState(null);

  const api_key = process.env.REACT_APP_API_KEY;

  // nameArray stores the search query of countries
  let nameArray = null;

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

  // Every time query is updated, check that newWeatherQuery and showElement is false
  useEffect(() => setNewWeatherQuery(false), [query]);
  useEffect(() => setShowElement(false), [query]);

  // function to show the chosen country
  let showOneElement = (el) => {
    setShowElement(true);
    setCurrentEl(el);
  };

  // when query is updated, nameArray stores the new results of the query
  nameArray = query.map((el) => (
    <div key={uniqid()}>
      {el.name}: <Button showElement={() => showOneElement(el)} />
    </div>
  ));

  // results variable displays the chosen result.
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

  if (showElement) {
    if (!newWeatherQuery) {
      getWeather(currentEl.capital);
      setNewWeatherQuery(true);
    }

    results = (
      <div>
        <h2 style={{ marginBottom: '30px' }}>{currentEl.name}</h2>
        <p style={{ fontSize: '90%' }}>Capital city: {currentEl.capital}</p>
        <p style={{ fontSize: '90%' }}>Population: {currentEl.population}</p>
        <h3>Languages</h3>
        <ul>
          {currentEl.languages.map((el) => (
            <li key={uniqid()}>{el.name}</li>
          ))}
        </ul>
        <img src={currentEl.flag} style={{ width: '10%' }} alt='country' />
        <h3>Weather in {currentEl.capital}</h3>
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
  }

  if (nameArray.length > 1 && nameArray.length <= 10) {
    if (!showElement) {
      results = nameArray;
    }
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
