import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import reducers from './reducers';
import { ActionType } from './action-types';

// Create the Redux store with reducers, initial state, and middleware
export const store = createStore(
  reducers, 
  {}, // Initial state can be passed here if needed
  applyMiddleware(thunk)
);

store.dispatch({
  type: ActionType.INSERT_CELL,
  payload: {
    id: null,
    type: 'code'
  }
});

const id = store.getState().cells.order[0];

console.log(id);
