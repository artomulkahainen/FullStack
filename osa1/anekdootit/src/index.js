import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ handleClick, type }) => (
  <button onClick={handleClick}>{type}</button>
);

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
  const [highest, setHighest] = useState(0);

  const anecdoteHandler = () => {
    return setSelected(
      Math.floor(Math.random() * Math.floor(anecdotes.length))
    );
  };

  const voteHandler = () => {
    let updatedPoints = { ...points };
    updatedPoints[selected] += 1;
    setPoints(updatedPoints);
    let array = Object.keys(updatedPoints).map((key) => updatedPoints[key]);
    setHighest(array.indexOf(Math.max.apply(null, array)));
    console.log(highest);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} points</p>
      <Button handleClick={voteHandler} type='VOTE' />
      <Button handleClick={anecdoteHandler} type='NEXT ANECDOTE' />
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[highest]}</p>
      <p>has {points[highest]} votes</p>
    </div>
  );
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
