import { fromJS } from 'immutable';
import {
  SET_FILTER_OPTION,
} from '../constants/actionTypes';
import { sortOptions,  currenciesOptions } from '../constants/filterOptions';


const defaultState = fromJS({
  list: {
    sort_by: sortOptions[0].id,
    currency: currenciesOptions[1].id,
  },
  search: {
    currency: currenciesOptions[1].id,
  },
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_FILTER_OPTION:
      return _SET_FILTER_OPTION(action.payload)(state);
    default:
      return state;
  }
};

/**
 * Set Filter Options
 * @kind reducer/actionType
 * @name SET_FILTER_OPTION
 * @param {string} {screen} - select screen
 * @param {string} {filter} - select type
 * @param {string} {value} - set value
 * @return {Immutable.Map} New state
 */
const _SET_FILTER_OPTION = ({
  screen,
  filter,
  value
}) => state => state.setIn([screen, filter] ,value);
