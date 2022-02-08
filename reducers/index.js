import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux-immutable';

import pairs from './pairs';
import lists from './lists';

const reducers = {
  lists,
  pairs
};

export default configureStore({
  reducer: combineReducers(reducers)
});