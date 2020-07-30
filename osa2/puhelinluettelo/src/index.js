import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Form from './components/Form/Form';
import Numbers from './components/Numbers/Numbers';
import personService from './services/personService';
//import uniqid from 'uniqid';
import Notification from './components/Notification/Notification';

const App = () => {
  // State of the app
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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
    if (searchSimilar.length === 0) {
      let personObject = { name: newName, number: newNumber };
      addPerson(personObject);
    } else {
      let updatedPerson = {
        name: searchSimilar[0].name,
        number: newNumber,
        id: searchSimilar[0].id,
      };
      let confirm = window.confirm(
        newName + ' is already on the list, do you want to update the number?'
      );
      confirm
        ? updatePerson(updatedPerson, searchSimilar[0].id)
        : console.log();
    }
  };

  const personRemoveHandler = (person) => {
    let confirm = window.confirm('Delete ' + person.name + '?');
    if (confirm) {
      personService
        .deleteObject(person)
        .then(() => {
          let updatedList = persons.filter((prs) => prs.id !== person.id);
          setPersons(updatedList);
        })
        .catch((error) => {
          setErrorMessage(
            `Person ${person.name} was already removed from the server`
          );
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    }
  };

  const getPersons = () => {
    personService.getAll().then((persons) => setPersons(persons));
  };

  const addPerson = (newObject) => {
    personService
      .add(newObject)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNotificationMessage(`Person ${returnedPerson.name} was added`);
        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
      })
      .catch((error) => {
        setErrorMessage(error.response.data.error);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  const updatePerson = (updatedPerson, personId) => {
    let updatedList = [...persons];
    updatedList.find((person) =>
      person.id === updatedPerson.id
        ? (person.number = updatedPerson.number)
        : console.log()
    );
    setPersons(updatedList);
    personService.update(updatedPerson, personId).catch((error) => {
      setErrorMessage(
        `Person ${updatedPerson.name} was already removed from the server`
      );
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    });
  };

  useEffect(getPersons, []);

  return (
    <div>
      {notificationMessage ? (
        <Notification message={notificationMessage} type='notification' />
      ) : null}
      {errorMessage ? (
        <Notification message={errorMessage} type='error' />
      ) : null}
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
