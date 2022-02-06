import { fromJS } from 'immutable';
import { configureStore } from '@reduxjs/toolkit';

const defaultState = fromJS({});

const list = (state = defaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};


const store = configureStore({
  reducer: {
    list
  }
})
export default store