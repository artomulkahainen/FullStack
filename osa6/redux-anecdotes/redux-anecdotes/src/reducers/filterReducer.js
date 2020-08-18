import { updateObject } from './utility';

const initialState = {
  filteredItems: null,
};

const setFilteredItems = (state, action) => {
  const updatedObject = action.data;
  const newState = {
    filteredItems: updatedObject,
  };
  return updateObject(state, newState);
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FILTERED_ITEMS':
      return setFilteredItems(state, action);
    default:
      return state;
  }
};

export default filterReducer;
