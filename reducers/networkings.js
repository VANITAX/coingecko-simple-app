// networkings.js
'use strict';
import { fromJS } from 'immutable';
import {
  SET_NETWORKING_FETCHING,
  SET_NETWORKING_SUCCESS,
  SET_NETWORKING_ERROR,
  SET_NETWORKING_IDLE,
  CLEAR_NETWORKING_NODES,
} from '../constants/actionTypes';

export const getStateTemplate = () => ({
  isFetching: false,
  isFetched: false,
  error: null,
  fetchedTimestamp: null,
});

export const defaultState = fromJS({});

/**
 * Networkings.
 * @module reducer/networkings
 */
const networkings = (state = defaultState, action) => {
  switch (action.type) {
    case SET_NETWORKING_FETCHING:
      return _SET_NETWORKING_FETCHING(action.payload)(state);
    case SET_NETWORKING_SUCCESS:
      return _SET_NETWORKING_SUCCESS(action.payload)(state);
    case SET_NETWORKING_ERROR:
      return _SET_NETWORKING_ERROR(action.payload)(state);
    case SET_NETWORKING_IDLE:
      return _SET_NETWORKING_IDLE(action.payload)(state);
    case CLEAR_NETWORKING_NODES:
      return _CLEAR_NETWORKING_NODES(action.payload)(state);
    // -- PLOP_PREPEND_REDUCER_SWITCH_CASE --
    default:
      return state;
  }
};

/**
 * Set networking fetching
 * @kind reducer/actionType
 * @name SET_NETWORKING_FETCHING
 * @param {array} {keyPath} - immutable select path.
 * @return {Immutable.Map} New state
 */
const _SET_NETWORKING_FETCHING = ({ keyPath }) => state => {
  return state.mergeDeepIn(keyPath, {
    ...getStateTemplate(),
    isFetching: true,
  });
};

/**
 * Set networking success
 * @kind reducer/actionType
 * @name SET_NETWORKING_SUCCESS
 * @param {object} {keyPath} - immutable select path.
 * @return {Immutable.Map} New state
 */
const _SET_NETWORKING_SUCCESS = ({ keyPath }) => state => {
  return state.mergeDeepIn(keyPath, {
    isFetching: false,
    isFetched: true,
    error: null,
    fetchedTimestamp: Date.now(),
  });
};

/**
 * Set networking error
 * @kind reducer/actionType
 * @name SET_NETWORKING_ERROR
 * @param {object} {keyPath} - immutable select path.
 * @param {Error} {error} - error.
 * @return {Immutable.Map} New state
 */
const _SET_NETWORKING_ERROR = ({ keyPath, error }) => state => {
  return state.mergeDeepIn(keyPath, {
    isFetching: false,
    isFetched: true,
    fetchedTimestamp: Date.now(),
    error,
  });
};

/**
 * Set networking idle
 * @kind reducer/actionType
 * @name SET_NETWORKING_IDLE
 * @param {object} {keyPath} - immutable select path.
 * @return {Immutable.Map} New state
 */
const _SET_NETWORKING_IDLE = ({ keyPath }) => state => {
  return state.mergeDeepIn(keyPath, getStateTemplate());
};

/**
 * Clear networking nodes
 * @kind reducer/actionType
 * @name CLEAR_NETWORKING_NODES
 * @param {object} payload - payload.
 * @param {array} [payload.keyPaths] - select path list.
 * @return {Immutable.Map} New state
 */
const _CLEAR_NETWORKING_NODES = ({ keyPaths = [] }) => state => {
  const isValidPath = path => {
    if (path.length === 0) {
      return false;
    }
    return true;
  };
  return keyPaths
    .filter(path => isValidPath(path))
    .reduce((accumulator, path) => {
      return accumulator.setIn(path, fromJS({}));
    }, state);
};

// -- PLOP_PREPEND_REDUCER_ACTION_HANDLER --

export default networkings;
