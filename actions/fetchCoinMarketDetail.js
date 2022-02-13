import {
  ADD_COIN_DATA,
  SET_NETWORKING_FETCHING,
  SET_NETWORKING_SUCCESS,
  SET_NETWORKING_ERROR,
} from '../constants/actionTypes';
import { API_BASE_URL } from '../config/config';

const fetchCoinMarketDetail = ({
  coin_id = '',
  localization = false,
  tickers = false,
  market_data = false,
  community_data = false,
  developer_data = false,
  sparkline = false,
  networkKeyPath = []
} = {}) => async dispatch => {

    const requestUrl = new URL(`/coins/${coin_id}`, API_BASE_URL);
    requestUrl.searchParams.append('localization', localization);
    requestUrl.searchParams.append('tickers', tickers);
    requestUrl.searchParams.append('market_data', market_data);
    requestUrl.searchParams.append('community_data', community_data);
    requestUrl.searchParams.append('developer_data', developer_data);
    requestUrl.searchParams.append('sparkline', sparkline);

    dispatch({ type: SET_NETWORKING_FETCHING, payload: { keyPath: networkKeyPath } });

    try{
      const result = await fetch(requestUrl);
      const coinDetailData = await result.json();

      dispatch({
        type: ADD_COIN_DATA, 
        payload: coinDetailData,
      });

      return dispatch({ type: SET_NETWORKING_SUCCESS, payload: { keyPath: networkKeyPath } });
    }catch(error){
      return dispatch({
        type: SET_NETWORKING_ERROR,
        payload: { keyPath: networkKeyPath, error },
      });
    }
};


export default fetchCoinMarketDetail;