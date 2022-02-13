import { combineReducers } from 'redux-immutable';

import finances from './finances';
import lists from './lists';
import filters from './filters';
import networkings from './networkings';

export default combineReducers({
  lists,
  finances,
  filters,
  networkings,
});