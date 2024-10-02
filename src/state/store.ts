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

const insertCellAfter = (cellType:string) => {
  store.dispatch({
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
      id: null,
      type: cellType,
    },
  });
};

['code', 'text', 'code', 'text'].forEach(insertCellAfter);