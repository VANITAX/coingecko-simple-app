import {
  SET_FINANCE_DATA,
  SET_NETWORKING_FETCHING,
  SET_NETWORKING_SUCCESS,
  SET_NETWORKING_ERROR,
} from '../constants/actionTypes';
import { API_BASE_URL } from '../config/config';

const REQUEST_ARG_SPARKLINE_INTERVAL = 'daily';
const REQUEST_ARG_SPARKLINE_RANGE_DAYS = 7;

const fetchCoinMarketFinanceGraph = ({
  vs_currency = 'usd',
  coin_id,
  networkKeyPath = []
} = {}) => async dispatch => {

    const requestUrl = new URL(`/coins/${coin_id}/market_chart`, API_BASE_URL)
    requestUrl.searchParams.append('vs_currency', vs_currency);
    requestUrl.searchParams.append('days', REQUEST_ARG_SPARKLINE_RANGE_DAYS);
    requestUrl.searchParams.append('interval', REQUEST_ARG_SPARKLINE_INTERVAL);

    dispatch({ type: SET_NETWORKING_FETCHING, payload: { keyPath: networkKeyPath } });

    try{
      const response = await fetch(requestUrl);
      const result = await response.json();
      const queryKey = `range:${REQUEST_ARG_SPARKLINE_RANGE_DAYS}:${REQUEST_ARG_SPARKLINE_INTERVAL}`;
      dispatch({
        type: SET_FINANCE_DATA, 
        payload: {
          keyPath: [`${coin_id}:${vs_currency}`],
          financeData: {
            marketFinance: {
              [queryKey] : result
            }
          }
        },
      });

      return dispatch({ type: SET_NETWORKING_SUCCESS, payload: { keyPath: networkKeyPath } });
    }catch(error){
      console.log(error);
      return dispatch({
        type: SET_NETWORKING_ERROR,
        payload: { keyPath: networkKeyPath, error },
      });
    }
};


export default fetchCoinMarketFinanceGraph;