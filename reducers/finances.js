import { fromJS } from 'immutable';
import {
  ADD_FINANCE_DATA,
  ADD_FINANCES_DATA,
} from '../constants/actionTypes';

const defaultState = fromJS({});

export default (state = defaultState, action) => {
  switch (action.type) {
    case ADD_FINANCE_DATA:
      return _ADD_FINANCE_DATA(action.payload)(state);
    case ADD_FINANCES_DATA:
      return _ADD_FINANCES_DATA(action.payload)(state);
    default:
      return state;
  }
};

/**
 * Add Pair Data
 * @kind reducer/actionType
 * @name ADD_FINANCE_DATA
 * @param {object} finance - finance
 * @param {string} finance.id - finance id
 * @return {Immutable.Map} New state
 */
const _ADD_FINANCE_DATA = finance => state => state.mergeDeep({ [finance.id]: finance });

/**
 * Add Finances Data
 * @kind reducer/actionType
 * @name ADD_FINANCES_DATA
 * @param {object} {finances} - finances using finance id as keys
 * @return {Immutable.Map} New state
 */
const _ADD_FINANCES_DATA = ({ finances }) => state => state.mergeDeep(finances);
