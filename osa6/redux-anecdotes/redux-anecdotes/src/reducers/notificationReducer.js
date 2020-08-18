import { updateObject } from './utility';

const initialState = {
  notification: null,
};

const setNotification = (state, action) => {
  const updatedNotification = action.data.anecdote.content;
  const newState = {
    notification: updatedNotification,
  };
  console.log('uusi notif');
  console.log(newState);
  return updateObject(state, newState);
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return setNotification(state, action);
    default:
      return state;
  }
};

export default notificationReducer;
