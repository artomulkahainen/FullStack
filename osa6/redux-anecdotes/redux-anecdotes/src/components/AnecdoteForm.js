import React from 'react';
import { anecdoteCreator } from '../reducers/anecdoteReducer';
import { useDispatch } from 'react-redux';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const createAnecdote = async (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    event.target.anecdote.value = '';
    dispatch(anecdoteCreator(anecdote));
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div>
          <input name='anecdote' />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
