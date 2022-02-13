import {
  SET_FILTER_OPTION,
} from '../constants/actionTypes';

const selectFilterOption = ({
  screen = 'list',
  filter = 'sort_by',
  value
} = {}) => async dispatch => dispatch({
    type: SET_FILTER_OPTION,
    payload: {
      screen,
      filter,
      value
    }
  });


export default selectFilterOption;