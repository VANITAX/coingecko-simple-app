import { combineReducers } from 'redux-immutable';

import lists from './lists';
import finances from './finances';
import coins from './coins';
import filters from './filters';
import networkings from './networkings';

export default combineReducers({
  lists,
  finances,
  coins,
  filters,
  networkings,
});