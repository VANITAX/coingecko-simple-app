import { fromJS } from 'immutable';

import {
  ADD_LIST_ITEMS,
  REMOVE_LIST_ITEMS,
  SET_LIST_ITEMS,
} from '../constants/actionTypes';


const defaultState = fromJS({});

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_LIST_ITEMS:
      return _SET_LIST_ITEMS(action.payload)(state);
    case ADD_LIST_ITEMS:
      return _ADD_LIST_ITEMS(action.payload)(state);
    case REMOVE_LIST_ITEMS:
      return _REMOVE_LIST_ITEMS(action.payload)(state);
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
 * @param {number} [{lastPage}] - list last page
 * @return {Immutable.Map} New state
 */
const _ADD_LIST_ITEMS = ({
  select = `unknown-${Math.random()}`,
  itemIds = [],
  nextPage,
  lastPage,
}) => state => {
  const currentIds = state.getIn([select, 'itemIds']) || fromJS([]);
  return state
    .mergeIn([select], { nextPage, lastPage })
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
 * @param {number} [{lastPage}] - list last page
 * @return {Immutable.Map} New state
 */
const _SET_LIST_ITEMS = ({
  select = `unknown-${Math.random()}`,
  itemIds = [],
  nextPage,
  lastPage,
}) => state => {
  const ids = fromJS(itemIds);
  return state
    .mergeIn([ select ], { nextPage, lastPage })
    .setIn([select, 'itemIds'], ids);
};

/**
 * Remove list item
 * @kind reducer/actionType
 * @name REMOVE_LIST_ITEMS
 * @param {string} {select} - list select
 * @param {array} {itemIds} - list item ids
 * @param {number} [{nextPage}] - list next page
 * @param {number} [{lastPage}] - list last page
 * @return {Immutable.Map} New state
 */
const _REMOVE_LIST_ITEMS = ({
  select = `unknown-${Math.random()}`,
  itemIds = [],
  totalCount,
  nextPage,
  lastPage,
}) => state => {
  const currentIds = state.getIn([select, 'itemIds']) || fromJS([]);
  return state
    .merge(select, { nextPage, lastPage })
    .setIn(
      [select, 'itemIds'],
      currentIds.filter(id => itemIds.every(itemId => id !== itemId))
    );
};
