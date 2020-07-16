import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Form from './components/Form/Form';
import Numbers from './components/Numbers/Numbers';
import personService from './services/personService';
import uniqid from 'uniqid';

const App = () => {
  // State of the app
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [newNumber, setNewNumber] = useState('');

  // Different functions for the app
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
      let personObject = { name: newName, number: newNumber, id: uniqid() };
      addPerson(personObject);
      setPersons(persons.concat(personObject));
    } else {
      if (searchSimilar.length === 1) {
        let updatedPerson = {
          name: searchSimilar[0].name,
          number: newNumber,
          id: searchSimilar[0].id,
        };
        let confirm = window.confirm(
          newName + ' is already on the list, do you want to update the number?'
        );
        newNumber.length !== 10 ? (confirm = false) : console.log();
        newNumber.length !== 10
          ? alert('Phone number must be 10 characters long!')
          : console.log();
        confirm
          ? updatePerson(updatedPerson, searchSimilar[0].id)
          : console.log();
      } else {
        alert('Phone number must be 10 characters long!');
      }
    }
  };

  const personRemoveHandler = (person) => {
    let confirm = window.confirm('Delete ' + person.name + '?');
    if (confirm) {
      personService.deleteObject(person).then(() => {
        let updatedList = persons.filter((prs) => prs.id !== person.id);
        setPersons(updatedList);
      });
    }
  };

  const getPersons = () => {
    personService.getAll().then((persons) => setPersons(persons));
  };

  const addPerson = (newObject) => {
    personService
      .add(newObject)
      .then((returnedPerson) => setPersons(persons.concat(returnedPerson)));
  };

  const updatePerson = (updatedPerson, personId) => {
    //let updatePerson = persons.find(person => person.id === updatedPerson.id);
    let updatedList = [...persons];
    updatedList.find((person) =>
      person.id === updatedPerson.id
        ? (person.number = updatedPerson.number)
        : console.log()
    );
    setPersons(updatedList);
    personService.update(updatedPerson, personId);
  };

  useEffect(getPersons, []);

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
      <Numbers
        persons={nameFilter(persons, newFilter)}
        personRemove={personRemoveHandler}
      />
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
