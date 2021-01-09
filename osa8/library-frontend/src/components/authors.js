import React from 'react';
import uniqid from 'uniqid';

const authors = ({ result }) => {
  return (
    <tbody>
      {result
        ? result.data.allAuthors.map((a) => (
            <tr key={uniqid()}>
              <td key={a.name}>{a.name}</td>
              <td key={a.born}>{a.born}</td>
              <td key={a.bookCount}>{a.bookCount}</td>
            </tr>
          ))
        : null}
    </tbody>
  );
};

export default authors;
