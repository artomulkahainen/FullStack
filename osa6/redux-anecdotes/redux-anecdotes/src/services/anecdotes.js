import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  console.log(response.data);
  return response.data;
};

const createAnecdote = async (anecdote) => {
  const object = { content: anecdote, votes: 0 };
  const res = await axios.post(baseUrl, object);
  return res.data;
};

const voteAnecdote = async (updatedAnecdote) => {
  const res = await axios.put(
    `${baseUrl}/${updatedAnecdote.id}`,
    updatedAnecdote
  );
  return res.data;
};

export default { getAll, createAnecdote, voteAnecdote };
