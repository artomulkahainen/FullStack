import React, { useState, useEffect } from 'react';
import Input from './components/Input/Input';
import classes from './App.module.css';
import DisplayCountries from './components/DisplayCountries/DisplayCountries';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [queryOn, setQueryOn] = useState(false);

  const hook = () => {
    axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
      console.log('Effect fired up');
      setData(response.data);
      console.log('promise fulfilled');
    });
  };

  useEffect(hook, []);

  const queryChangeHandler = (event) => {
    if (event.target.value.length > 0) {
      setQueryOn(true);
    } else {
      setQueryOn(false);
    }
    setQuery(event.target.value);
  };

  const queryCountries = (data, query) => {
    if (query === '') {
      return [''];
    } else {
      let countries = data.filter((el) =>
        el.name.toLowerCase().includes(query.toLowerCase())
      );
      return countries;
    }
  };

  return (
    <div className={classes.App}>
      <div>
        find countries: <Input queryChange={queryChangeHandler} />
      </div>
      <DisplayCountries queryOn={queryOn} query={queryCountries(data, query)} />
    </div>
  );
};

export default App;
