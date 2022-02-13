import {
  ADD_FINANCE_DATA,
  SET_NETWORKING_FETCHING,
  SET_NETWORKING_SUCCESS,
  SET_NETWORKING_ERROR,
} from '../constants/actionTypes';
import { API_BASE_URL } from '../config/config';

const fetchCoinMarketFinance = ({
  vs_currency = 'usd',
  coin_id,
  networkKeyPath = []
} = {}) => async dispatch => {
    const requestUrl = new URL('/coins/markets', API_BASE_URL);
    requestUrl.searchParams.append('vs_currency', vs_currency);
    requestUrl.searchParams.append('ids', coin_id);
    requestUrl.searchParams.append('per_page', 1);
    requestUrl.searchParams.append('page', 1);

    dispatch({ type: SET_NETWORKING_FETCHING, payload: { keyPath: networkKeyPath } });

    try{
      const response = await fetch(requestUrl);
      const result = await response.json();

      const [ financeData ] = result.map((data) => {
        const id = data.id;
        if(id) {
          const dataKey = `${id}:${vs_currency}`;
          return {
            ...data,
            vs_currency,
            dataKey
          }
        }
      });

      dispatch({
        type: ADD_FINANCE_DATA, 
        payload: financeData
      });
      return dispatch({ type: SET_NETWORKING_SUCCESS, payload: { keyPath: networkKeyPath } });
    }catch(error){
      return dispatch({
        type: SET_NETWORKING_ERROR,
        payload: { keyPath: networkKeyPath, error },
      });
    }
};


export default fetchCoinMarketFinance;