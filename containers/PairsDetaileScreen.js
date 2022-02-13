import { connect } from 'react-redux';
import PairDetailScreen from '../components/PairDetailScreen';

import fetchCoinGeckoMarketPairs from '../actions/fetchCoinMarketPairs';

const mapStateToProps = (state, { route }) => {
  const { dataKey } = route.params;
  return {
    id: state.getIn(['pairs', dataKey, 'id']),
    symbol: state.getIn(['pairs', dataKey, 'symbol']),
    name: state.getIn(['pairs', dataKey, 'name']),
    image: state.getIn(['pairs', dataKey, 'image']),
    current_price: state.getIn(['pairs', dataKey, 'current_price']),
    market_cap: state.getIn(['pairs', dataKey, 'market_cap']),
    market_cap_rank: state.getIn(['pairs', dataKey, 'market_cap_rank']),
    price_change_24h: state.getIn(['pairs', dataKey, 'price_change_24h']),
    price_change_percentage_24h: state.getIn(['pairs', dataKey, 'price_change_percentage_24h']),
    vs_currency: state.getIn(['pairs', dataKey, 'vs_currency']),
  };
}

const mapDispatchToProps = dispatch => ({
  fetchCoinData: ({}) => dispatch({}),
})


export default connect(mapStateToProps, mapDispatchToProps)(PairDetailScreen)