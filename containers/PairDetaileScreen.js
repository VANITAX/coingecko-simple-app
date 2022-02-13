import { connect } from 'react-redux';
import PairDetailScreen from '../screens/PairDetailScreen';

import fetchCoinMarketFinanceGraph from '../actions/fetchCoinMarketFinanceGraph';
import fetchCoinMarketDetail from '../actions/fetchCoinMarketDetail';
import fetchCoinMarketFinance from '../actions/fetchCoinMarketFinance';

const CHART_RANGE_DATA_HARDCODE = 'range:7:daily';

const mapStateToProps = (state, { route }) => {
  const { dataKey } = route.params;
  const id = state.getIn(['finances', dataKey, 'id']);
  return {
    id, dataKey,
    symbol: state.getIn(['finances', dataKey, 'symbol']),
    name: state.getIn(['finances', dataKey, 'name']),
    image: state.getIn(['finances', dataKey, 'image']),
    current_price: state.getIn(['finances', dataKey, 'current_price']),
    market_cap: state.getIn(['finances', dataKey, 'market_cap']),
    market_cap_rank: state.getIn(['finances', dataKey, 'market_cap_rank']),
    price_change_percentage_24h: state.getIn(['finances', dataKey, 'price_change_percentage_24h']),
    high_24h: state.getIn(['finances', dataKey, 'high_24h']),
    low_24h: state.getIn(['finances', dataKey, 'low_24h']),
    all_time_high: state.getIn(['finances', dataKey, 'ath']),
    all_time_low: state.getIn(['finances', dataKey, 'atl']),
    total_volume: state.getIn(['finances', dataKey, 'total_volume']),
    max_supply: state.getIn(['finances', dataKey, 'max_supply']),
    total_supply: state.getIn(['finances', dataKey, 'total_supply']),
    fully_diluted_valuation: state.getIn(['finances', dataKey, 'fully_diluted_valuation']),
    circulating_supply: state.getIn(['finances', dataKey, 'circulating_supply']),
    last_updated: state.getIn(['finances', dataKey, 'last_updated']),
    vs_currency: state.getIn(['finances', dataKey, 'vs_currency']),
    description: state.getIn(['coins', id, 'description', 'en']),
    chartData: state.getIn(['finances', dataKey, 'marketFinance', CHART_RANGE_DATA_HARDCODE, 'prices']) || [],
    isDetailsFetching: state.getIn(['networkings', 'coins', id, 'details', 'isFetching']),
    isFinanceFetching: state.getIn(['networkings', 'coins', id, 'finance', 'isFetching']),
    isFinanceGraphFetching: state.getIn(['networkings', 'coins', id, 'finance', 'graph', 'isFetching']),
  };
}

const mapDispatchToProps = dispatch => ({
  fetchCoinDetail: ({ coin_id }) => dispatch(fetchCoinMarketDetail({
    coin_id,
    networkKeyPath: ['coin', coin_id, 'details']
  })),
  fetchCoinFinance: ({ coin_id, vs_currency }) => dispatch(fetchCoinMarketFinance({
    coin_id,
    vs_currency,
    networkKeyPath: ['coin', coin_id, 'finance', 'detail']
  })),
  fetchCoinFinanceGraph: ({ coin_id, vs_currency }) => dispatch(fetchCoinMarketFinanceGraph({
    coin_id,
    vs_currency,
    networkKeyPath: ['coin', coin_id, 'finance', 'graph']
  }))
})


export default connect(mapStateToProps, mapDispatchToProps)(PairDetailScreen)