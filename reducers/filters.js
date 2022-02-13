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
 * Add list items
 * @kind reducer/actionType
 * @name SET_FILTER_OPTION
 * @param {string} {select} - list select 
 * @param {array} [{itemIds}=[]] - list item ids
 * @param {number} [{nextPage}] - list next page
 * @param {number} [{lastPage}] - list last page
 * @return {Immutable.Map} New state
 */
const _SET_FILTER_OPTION = ({
  screen = 'list',
  filter = 'sort_by',
  value
}) => state => state.setIn(['screen', 'filter'] ,value);
