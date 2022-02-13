import {
  ADD_PAIR_DATA,
  SET_NETWORKING_FETCHING,
  SET_NETWORKING_SUCCESS,
  SET_NETWORKING_ERROR,
} from '../constants/actionTypes';
import { API_BASE_URL } from '../config/config';

const API_END_POINT = '/coins/markets';


const fetchCoinMarketPairs = ({
  vs_currency = 'usd',
  id = '',
  category = '',
  order = '',
  per_page = DEFAULT_PAGE_LIMIT,
  page = 1,
  networkKeyPath = []
} = {}) => async dispatch => {
    const idsString = ids.toString();
    const requestUrl = new URL(`/coins/${}`, API_BASE_URL);
    requestUrl.searchParams.append('vs_currency', vs_currency);
    requestUrl.searchParams.append('ids', idsString);
    requestUrl.searchParams.append('per_page', per_page);
    requestUrl.searchParams.append('page', page);
    if(order && order !== 'rank') {
      // rank is default order, but coingecko api not provide relate params. see more: https://www.coingecko.com/en/api/documentation;
      requestUrl.searchParams.append('order', order);
    }
    if(category) requestUrl.searchParams.append('category', category);

    dispatch({ type: SET_NETWORKING_FETCHING, payload: { keyPath: networkKeyPath } });

    try{
      const response = await fetch(requestUrl);
      const result = await response.json();

      const itemIds = [];
      const pairsData = result.map(({id, ...pairData}) => {
        if(id) {
          const dataKey = `${id}:${vs_currency}`;
          itemIds.push(dataKey);
          return {
            ...pairData,
            vs_currency,
            dataKey
          }
        }
      });
      const pairItems = objectifyArrayById({ array: pairsData ,keyAsId: 'dataKey'});
      const nextPage = page + 1;

      // dispatch({
      //   type: ADD_PAIRS_DATA, 
      //   payload: {
      //     pairs: pairItems
      //   }
      // });
      return dispatch({ type: SET_NETWORKING_SUCCESS, payload: { keyPath: networkKeyPath } });
    }catch(error){
      return dispatch({
        type: SET_NETWORKING_ERROR,
        payload: { keyPath: networkKeyPath, error },
      });
    }
};


export default fetchCoinMarketPairs;