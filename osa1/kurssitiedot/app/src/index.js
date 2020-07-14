import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
  return <h1>{props.title.name}</h1>;
};

const Content = (props) => {
  let itemsAsParagraphs = [];
  props.items.parts.forEach((el) => {
    itemsAsParagraphs.push(<p>{el.name + ' ' + el.exerciseCount}</p>);
  });
  return itemsAsParagraphs;
};

const Total = (props) => {
  let total = 0;
  props.items.parts.forEach((el) => {
    total += el.exerciseCount;
  });
  return <p style={{ color: 'red' }}>Number of exercises {total}</p>;
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      { name: 'Fundamentals of React', exerciseCount: 10 },
      { name: 'Using props to pass data', exerciseCount: 7 },
      { name: 'State of a component', exerciseCount: 14 },
    ],
  };

  return (
    <div>
      <Header title={course} />
      <Content items={course} />
      <Total items={course} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
