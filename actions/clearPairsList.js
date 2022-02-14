import {
  SET_LIST_ITEMS,
} from '../constants/actionTypes';

const clearPairsList = ({ 
  select, 
}={}) => dispatch => dispatch({
  type: SET_LIST_ITEMS,
  payload: {
    select,
    itemIds: [],
    nextPage: 1,
  }
})



export default clearPairsList