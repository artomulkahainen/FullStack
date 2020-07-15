import React from 'react';
import ReactDOM from 'react-dom';
import Course from './components/Course/Course';

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        { id: 1, name: 'Fundamentals of React', exerciseCount: 10 },
        { id: 2, name: 'Using props to pass data', exerciseCount: 7 },
        { id: 3, name: 'State of a component', exerciseCount: 14 },
      ],
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exerciseCount: 3,
          id: 1,
        },
        {
          name: 'Middlewares',
          exerciseCount: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <div>
      <Course course={courses} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
