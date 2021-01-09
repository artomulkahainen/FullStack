import React from 'react';
import uniqid from 'uniqid';

const books = ({ result }) => {
  return (
    <tbody>
      {result
        ? result.data.allBooks.map((b) => (
            <tr key={uniqid()}>
              <td key={b.title}>{b.title}</td>
              <td key={b.author}>{b.author}</td>
              <td key={b.published}>{b.published}</td>
            </tr>
          ))
        : null}
    </tbody>
  );
};

export default books;
