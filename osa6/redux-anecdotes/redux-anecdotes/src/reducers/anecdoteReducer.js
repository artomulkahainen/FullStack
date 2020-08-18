import anecdoteService from '../services/anecdotes';

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const vote = async (changedAnecdote) => {
  return await anecdoteService.voteAnecdote(changedAnecdote);
};

export const anecdoteCreator = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createAnecdote(anecdote);
    dispatch({ type: 'CREATE_ANECDOTE', newAnecdote });
  };
};

export const initAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({ type: 'INIT_ANECDOTES', data: anecdotes });
  };
};

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const changedAnecdote = {
        ...action.data.anecdote,
        votes: action.data.anecdote.votes + 1,
      };
      vote(changedAnecdote);
      return state.map((anecdote) =>
        anecdote.id !== action.data.anecdote.id ? anecdote : changedAnecdote
      );
    case 'CREATE_ANECDOTE':
      const anecdoteAsObject = asObject(action.anecdote);
      console.log(anecdoteAsObject);
      return state.concat(anecdoteAsObject);
    case 'INIT_ANECDOTES':
      return action.data;
    default:
      return state;
  }
};

export default anecdoteReducer;
