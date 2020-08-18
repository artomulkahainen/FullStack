import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Notification from './Notification';
import Filter from './Filter';

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state.anecdotes);
  const filteredAnecdotes = useSelector((state) => state.filter.filteredItems);
  const notif = useSelector((state) => state.notification.notification);
  //const [notification, setNotification] = useState(null);
  const [filterText, setFilterText] = useState(null);

  const fireVote = async (id) => {
    const anecdote = await anecdotes.find((anecdote) => anecdote.id === id);
    dispatch({ type: 'VOTE', data: { anecdote } });
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { anecdote },
      time: 10,
    });
    console.log(notif);
  };

  const filter = (text) => {
    dispatch({
      type: 'SET_FILTERED_ITEMS',
      data: anecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(text.toLowerCase())
      ),
    });
  };

  return (
    <div>
      {notif ? <Notification /> : null}
      <Filter setFilterText={setFilterText} filter={filter} />
      {!filterText
        ? anecdotes
            .sort((a, b) => (a.votes > b.votes ? -1 : 1))
            .map((anecdote) => (
              <div key={anecdote.id}>
                <div>{anecdote.content}</div>
                <div>
                  has {anecdote.votes}
                  <button onClick={() => fireVote(anecdote.id)}>vote</button>
                </div>
              </div>
            ))
        : filteredAnecdotes
            .sort((a, b) => (a.votes > b.votes ? -1 : 1))
            .map((anecdote) => (
              <div key={anecdote.id}>
                <div>{anecdote.content}</div>
                <div>
                  has {anecdote.votes}
                  <button onClick={() => fireVote(anecdote.id)}>vote</button>
                </div>
              </div>
            ))}
    </div>
  );
};

export default AnecdoteList;
