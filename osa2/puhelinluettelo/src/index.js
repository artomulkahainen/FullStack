import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Form from './components/Form/Form';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('');

  const inputChangeHandler = (event) => {
    setNewName(event.target.value);
  };

  const formSendHandler = (event) => {
    event.preventDefault();
    let searchSimilar = persons.filter((el) => el.name === newName);
    if (searchSimilar.length === 0) {
      let updatedList = [...persons];
      updatedList.push({ name: newName });
      setPersons(updatedList);
    } else {
      alert(`${newName} is already on the list!`);
    }
  };

  return (
    <div>
      <Form inputChange={inputChangeHandler} formSend={formSendHandler} />
      {/*<form>
        <div>
          name: <input />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>*/}
      <h2>Numbers</h2>
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
