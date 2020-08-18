import React, { useEffect } from 'react';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import { useDispatch } from 'react-redux';
import { initAnecdotes } from './reducers/anecdoteReducer';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initAnecdotes());
  }, [dispatch]);

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
