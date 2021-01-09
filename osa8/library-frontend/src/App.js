import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK, UPDATE_AUTHOR } from './queries';
import Author from './components/authors';
import Book from './components/books';
import styles from './App.module.css';
import uniqid from 'uniqid';

const App = () => {
  const result = useQuery(ALL_AUTHORS);
  const resultBooks = useQuery(ALL_BOOKS);
  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
  });
  const [updateAuthor] = useMutation(UPDATE_AUTHOR);
  const [currentPage, changeCurrentPage] = useState(0);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);
  const [selectedValue, setSelectedValue] = useState('Robert Martin');
  const [born, setBorn] = useState('');

  if (result.loading) {
    return <div>loading...</div>;
  }

  const addGenreHandler = () => {
    const newGenres = genres;
    newGenres.push(genre);
    console.log(newGenres);
    setGenre('');
    setGenres(newGenres);
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    createBook({ variables: { title, author, published, genres } });
    setTitle('');
    setAuthor('');
    setPublished(null);
    setGenre('');
    setGenres([]);
    console.log('form submitted');
  };

  const setAuthorBornYear = async () => {
    let name = selectedValue;
    let setBornTo = Number(born);
    updateAuthor({ variables: { name, setBornTo } });
    console.log('jeaa');
  };

  const page = [
    <div>
      <h2>Authors</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Author</th>
            <th>Born</th>
            <th>Book count</th>
          </tr>
        </thead>
        {result ? <Author result={result} /> : null}
      </table>
      <div style={{ marginTop: '20px', paddingBottom: '5px' }}>
        <select
          value={selectedValue}
          onChange={(event) => setSelectedValue(event.target.value)}>
          {result
            ? result.data.allAuthors.map((a) => (
                <option key={uniqid()} value={a.name}>
                  {a.name}
                </option>
              ))
            : null}
        </select>
        <p>
          born{' '}
          <input
            value={born}
            onChange={(event) => setBorn(event.target.value)}></input>
        </p>
        <button onClick={() => setAuthorBornYear()}>update author</button>
      </div>
    </div>,
    <div>
      <h2>Books</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Book</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
        </thead>
        {resultBooks ? <Book result={resultBooks} /> : null}
      </table>
    </div>,
    <div>
      <h2>Add book</h2>
      <form onSubmit={(event) => formSubmitHandler(event)}>
        <p>
          title{' '}
          <input
            onChange={(event) => setTitle(event.target.value)}
            value={title}></input>
        </p>
        <p>
          author{' '}
          <input
            onChange={(event) => setAuthor(event.target.value)}
            value={author}></input>
        </p>
        <p>
          published{' '}
          <input
            type='text'
            onInput={(event) => setPublished(parseInt(event.target.value))}
            value={published}></input>
        </p>
        <div>
          <input
            onChange={(event) => setGenre(event.target.value)}
            value={genre}></input>
          <button type='button' onClick={() => addGenreHandler()}>
            add genre
          </button>
        </div>
        <div>
          <p>genres:</p>
          <ul>
            {genres.map((g) => (
              <li key={uniqid()}>{g}</li>
            ))}
          </ul>
        </div>
        <button type='submit'>Add book</button>
      </form>
    </div>,
  ];

  return (
    <div>
      <button onClick={() => changeCurrentPage(0)}>authors</button>
      <button onClick={() => changeCurrentPage(1)}>books</button>
      <button onClick={() => changeCurrentPage(2)}>add book</button>
      {page[currentPage]}
    </div>
  );
};

export default App;
