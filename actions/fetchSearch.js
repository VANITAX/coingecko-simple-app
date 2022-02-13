
import {
  SET_LIST_ITEMS,
  ADD_FINANCES_DATA,
  SET_NETWORKING_FETCHING,
  SET_NETWORKING_SUCCESS,
  SET_NETWORKING_ERROR,
} from '../constants/actionTypes';
import { API_BASE_URL } from '../config/config';
import objectifyArrayById from '../utils/objectifyArrayById';

const fetchSearch = ({
  query,
  vs_currency,
  networkKeyPath = []
} = {}) => async dispatch => {
    const requestUrl = new URL('/search', API_BASE_URL);
    requestUrl.searchParams.append('query', query);

    dispatch({ type: SET_NETWORKING_FETCHING, payload: { keyPath: networkKeyPath } });

    try{
      const response = await fetch(requestUrl);
      const result = await response.json();
      const coinList = result.coins;
      const itemIds = [];

      if(coinList && coinList.length) {
        const financeMutation = coinList.map(({id, thumb, ...data}) => {
          if(id) {
            const dataKey = `${id}:${vs_currency}`;
            itemIds.push(dataKey);
            return {
              ...data,
              id,
              image: thumb,
              vs_currency,
              dataKey
            }
          }
        });
        const financeDataObj = objectifyArrayById({ array: financeMutation ,keyAsId: 'dataKey'});
        dispatch({
          type: ADD_FINANCES_DATA, 
          payload: {
            finances: financeDataObj
          }
        });
      }

      dispatch({
        type: SET_LIST_ITEMS,
        payload: {
          select: 'search',
          itemIds,
        },
      });

      return dispatch({ type: SET_NETWORKING_SUCCESS, payload: { keyPath: networkKeyPath } });
    }catch(error){
      console.log(error)
      return dispatch({
        type: SET_NETWORKING_ERROR,
        payload: { keyPath: networkKeyPath, error },
      });
    }
};


export default fetchSearch;