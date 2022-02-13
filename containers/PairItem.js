import { connect } from 'react-redux';
import PairItem from '../components/PairItem';

import fetchCoinMarketFinanceList from '../actions/fetchCoinMarketFinanceList';

const mapStateToProps = (state, { dataKey }) => {
  return {
    id: state.getIn(['finances', dataKey, 'id']),
    symbol: state.getIn(['finances', dataKey, 'symbol']),
    name: state.getIn(['finances', dataKey, 'name']),
    image: state.getIn(['finances', dataKey, 'image']),
    current_price: state.getIn(['finances', dataKey, 'current_price']),
    market_cap: state.getIn(['finances', dataKey, 'market_cap']),
    market_cap_rank: state.getIn(['finances', dataKey, 'market_cap_rank']),
    price_change_24h: state.getIn(['finances', dataKey, 'price_change_24h']),
    price_change_percentage_24h: state.getIn(['finances', dataKey, 'price_change_percentage_24h']),
  };
}
const mapDispatchToProps = dispatch => ({
  fetchCoinData: ({}) => dispatch({}),
})


export default connect(mapStateToProps, mapDispatchToProps)(PairItem)