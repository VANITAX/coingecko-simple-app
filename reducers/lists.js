import { fromJS } from 'immutable';

import {
  ADD_LIST_ITEMS,
  SET_LIST_ITEMS,
} from '../constants/actionTypes';


const defaultState = fromJS({});

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_LIST_ITEMS:
      return _SET_LIST_ITEMS(action.payload)(state);
    case ADD_LIST_ITEMS:
      return _ADD_LIST_ITEMS(action.payload)(state);
    default:
      return state;
  }
};


/**
 * Add list items
 * @kind reducer/actionType
 * @name ADD_LIST_ITEMS
 * @param {string} {select} - list select 
 * @param {array} [{itemIds}=[]] - list item ids
 * @param {number} [{nextPage}] - list next page
 * @return {Immutable.Map} New state
 */
const _ADD_LIST_ITEMS = ({
  select = `unknown-${Math.random()}`,
  itemIds = [],
  nextPage
}) => state => {
  const currentIds = state.getIn([select, 'itemIds']) || fromJS([]);
  return state
    .mergeIn([select], { nextPage })
    .setIn(
      [select, 'itemIds'],
      currentIds.concat(itemIds.filter(itemId => !currentIds.includes(itemId)))
    );
};

/**
 * Set list items
 * @kind reducer/actionType
 * @name SET_LIST_ITEMS
 * @param {string} {select} - list select
 * @param {array} [{itemIds}=[]] - list item ids
 * @param {number} [{nextPage}] - list next page
 * @return {Immutable.Map} New state
 */
const _SET_LIST_ITEMS = ({
  select = `unknown-${Math.random()}`,
  itemIds = [],
  nextPage,
}) => state => {
  const ids = fromJS(itemIds);
  return state
    .mergeIn([ select ], { nextPage })
    .setIn([select, 'itemIds'], ids);
};
