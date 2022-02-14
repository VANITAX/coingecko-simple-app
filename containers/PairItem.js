import { connect } from 'react-redux';
import fetchCoinMarketFinance from '../actions/fetchCoinMarketFinance';
import PairItem from '../components/PairItem';

const mapStateToProps = (state, { dataKey }) => {
  const vs_currency = dataKey?.split(':')?.[1];
  const id = state.getIn(['finances', dataKey, 'id']);
  return {
    id, vs_currency,
    symbol: state.getIn(['finances', dataKey, 'symbol']),
    name: state.getIn(['finances', dataKey, 'name']),
    image: state.getIn(['finances', dataKey, 'image']),
    current_price: state.getIn(['finances', dataKey, 'current_price']),
    market_cap: state.getIn(['finances', dataKey, 'market_cap']),
    market_cap_rank: state.getIn(['finances', dataKey, 'market_cap_rank']),
    price_change_24h: state.getIn(['finances', dataKey, 'price_change_24h']),
    price_change_percentage_24h: state.getIn(['finances', dataKey, 'price_change_percentage_24h']),
    isFetched: state.getIn(['networkings', 'coin', id, 'finance', 'detail', 'isFetched']),
  };
}

const mapDispatchToProps = dispatch => ({
  fetchCoinFinance: ({ coin_id, vs_currency }) => dispatch(fetchCoinMarketFinance({
    coin_id,
    vs_currency,
    networkKeyPath: ['coin', coin_id, 'finance', 'detail']
  })),
})


export default connect(mapStateToProps, mapDispatchToProps)(PairItem)