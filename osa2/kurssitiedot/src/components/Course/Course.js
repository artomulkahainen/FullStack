import React from 'react';
import uniqid from 'uniqid';

const Header = ({ title }) => {
  return <h1>{title}</h1>;
};

const Content = ({ items }) => {
  let itemsAsParagraphs = items.map((el) => {
    return <p key={el.name}>{el.name + ' ' + el.exerciseCount}</p>;
  });
  return itemsAsParagraphs;
};

const Total = ({ items }) => {
  let total = items.reduce((sum, el) => {
    return (sum += el.exerciseCount);
  }, 0);
  return (
    <p style={{ color: 'red', fontWeight: '800' }}>
      Number of exercises {total}
    </p>
  );
};

const Course = ({ course }) => {
  let courses = course.map((el) => (
    <div key={uniqid()}>
      <Header title={el.name} />
      <Content items={el.parts} />
      <Total items={el.parts} />
    </div>
  ));

  return <div>{courses}</div>;
};

export default Course;
