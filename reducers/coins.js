import { fromJS } from 'immutable';
import {
  ADD_COIN_DATA,
} from '../constants/actionTypes';

const defaultState = fromJS({});

export default (state = defaultState, action) => {
  switch (action.type) {
    case ADD_COIN_DATA:
      return _ADD_COIN_DATA(action.payload)(state);
    default:
      return state;
  }
};

/**
 * Add Coin Data
 * @kind reducer/actionType
 * @name ADD_COIN_DATA
 * @param {object} coin - coin
 * @param {string} coin.id - coin id
 * @return {Immutable.Map} New state
 */
const _ADD_COIN_DATA = coin => state => state.mergeIn([coin.id], coin);
