import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Form from './components/Form/Form';
import Numbers from './components/Numbers/Numbers';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '0402223423' },
    { name: 'Kusti Markkanen', number: '0415552345' },
    { name: 'Helena Iivonen', number: '0451234512' },
    { name: 'Ada Lovelace', number: '0400001234' },
  ]);
  const [newName, setNewName] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const nameChangeHandler = (event) => {
    setNewName(event.target.value);
  };

  const numberChangeHandler = (event) => {
    setNewNumber(event.target.value);
  };

  const filterChangeHandler = (event) => {
    setNewFilter(event.target.value);
  };

  const nameFilter = (persons, filteredName) => {
    if (filteredName === '') {
      return persons;
    } else {
      return persons.filter((el) =>
        el.name.toLowerCase().includes(filteredName.toLowerCase())
      );
    }
  };

  const detailsSendHandler = (event) => {
    event.preventDefault();
    let searchSimilar = persons.filter((el) => el.name === newName);
    if (searchSimilar.length === 0 && newNumber.length === 10) {
      let updatedList = [...persons];
      updatedList.push({ name: newName, number: newNumber });
      setPersons(updatedList);
    } else {
      searchSimilar.length > 0
        ? alert('Similar name is added already!')
        : alert('Phone number must be ten characters long!');
    }
  };

  return (
    <div>
      <Form type='filter' filterHandler={filterChangeHandler} />
      <Form
        type='phonebook'
        nameChangeHandler={nameChangeHandler}
        numberChangeHandler={numberChangeHandler}
        filterHandler={filterChangeHandler}
        formSend={detailsSendHandler}
      />
      <Numbers persons={nameFilter(persons, newFilter)} />
    </div>
  );
};

export default App;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
