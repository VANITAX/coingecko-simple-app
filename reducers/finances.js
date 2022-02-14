import { fromJS } from 'immutable';
import {
  SET_FINANCE_DATA,
  ADD_FINANCE_DATA,
  ADD_FINANCES_DATA,
} from '../constants/actionTypes';

const defaultState = fromJS({});

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_FINANCE_DATA:
      return _SET_FINANCE_DATA(action.payload)(state);
    case ADD_FINANCE_DATA:
      return _ADD_FINANCE_DATA(action.payload)(state);
    case ADD_FINANCES_DATA:
      return _ADD_FINANCES_DATA(action.payload)(state);
    default:
      return state;
  }
};

/**
 * Set finance Data
 * @kind reducer/actionType
 * @name SET_FINANCE_DATA
 * @param {array} keyPath - select key path.
 * @param {object} financeData - finance data
 * @return {Immutable.Map} New state
 */
const _SET_FINANCE_DATA = ({ keyPath, financeData }) => state => state.mergeIn(keyPath, financeData);

/**
 * Add Finance Data
 * @kind reducer/actionType
 * @name ADD_FINANCE_DATA
 * @param {string} finance.dataKey - finance dataKey
 * @param {object} finance - finance data
 * @return {Immutable.Map} New state
 */
const _ADD_FINANCE_DATA = finance => state => state.mergeDeep({ [finance.dataKey]: finance });

/**
 * Add Finances Data
 * @kind reducer/actionType
 * @name ADD_FINANCES_DATA
 * @param {object} {finances} - finances using finance id as keys
 * @return {Immutable.Map} New state
 */
const _ADD_FINANCES_DATA = ({ finances }) => state => state.mergeDeep(finances);
