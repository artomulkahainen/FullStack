import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ handleClick, name }) => (
  <button onClick={handleClick}>{name}</button>
);

const StatisticLine = ({ type, value }) => {
  return (
    <tr>
      <td>{type}</td>
      <td>
        {value}
        {type === 'Positive' ? ' %' : null}
      </td>
    </tr>
  );
};

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [clicksCount, setClicksCount] = useState(0);
  const [reviewsGiven, setReviewsGiven] = useState(false);

  const handleGoodClick = () => {
    setTotal(total + 1);
    setClicksCount(clicksCount + 1);
    setReviewsGiven(true);
    return setGood(good + 1);
  };

  const handleNeutralClick = () => {
    setClicksCount(clicksCount + 1);
    setReviewsGiven(true);
    return setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setTotal(total - 1);
    setClicksCount(clicksCount + 1);
    setReviewsGiven(true);
    return setBad(bad + 1);
  };

  return (
    <div>
      <h1>Give feedback!</h1>
      <Button handleClick={handleGoodClick} name='Good' />
      <Button handleClick={handleNeutralClick} name='Neutral' />
      <Button handleClick={handleBadClick} name='Bad' />
      <h1>Stats:</h1>
      {reviewsGiven === false ? (
        <p>No feedbacks given</p>
      ) : (
        <table>
          <tbody>
            <StatisticLine key='0' type='Good' value={good} />
            <StatisticLine key='1' type='Neutral' value={neutral} />
            <StatisticLine key='2' type='Bad' value={bad} />
            <StatisticLine key='3' type='All' value={clicksCount} />
            <StatisticLine
              key='4'
              type='Average'
              value={
                reviewsGiven === false ? 0 : (total / clicksCount).toFixed(2)
              }
            />

            <StatisticLine
              key='5'
              type='Positive'
              value={good === 0 ? 0 : ((good / clicksCount) * 100).toFixed(2)}
            />
          </tbody>
        </table>
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
