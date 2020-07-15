import React from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';

const Form = ({ inputChange, formSend }) => {
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={formSend}>
        <div>
          name: <Input inputChange={inputChange} />
        </div>
        <Button formSend={formSend} type='SEND' />
      </form>
    </div>
  );
};

export default Form;
