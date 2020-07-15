import React from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';

const Form = ({
  type,
  nameChangeHandler,
  numberChangeHandler,
  filterHandler,
  formSend,
}) => {
  let form = null;
  type === 'phonebook'
    ? (form = (
        <form onSubmit={formSend}>
          <div>
            name: <Input valueChange={nameChangeHandler} />
          </div>
          <div>
            number: <Input valueChange={numberChangeHandler} />
          </div>
          <Button formSend={formSend} text='SEND' />
        </form>
      ))
    : (form = (
        <form onSubmit={formSend}>
          <div>
            filter shown with: <Input valueChange={filterHandler} />
          </div>
        </form>
      ));

  return (
    <div>
      {type === 'phonebook' ? <h2>Add a new number</h2> : <h2>Phonebook</h2>}
      {form}
    </div>
  );
};

export default Form;
