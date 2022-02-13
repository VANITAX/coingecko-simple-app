import { connect } from 'react-redux';
import PairsListScreen from '../screens/PairsListScreen';

import fetchCoinMarketFinance from '../actions/fetchCoinMarketFinance';

const NETWORK_KEY_PATH = ['list', 'market_finance'];

const mapStateToProps = (state) => {
  return {
    pairItemIds: state.getIn(['lists','market_finance', 'itemIds'])?.toJS() || [],
    nextPage: state.getIn(['lists','market_finance', 'nextPage']),
    lastPage: state.getIn(['lists','market_finance', 'lastPage']),
    sorting: state.getIn(['filters','list', 'sort_by']),
    currency: state.getIn(['filters','list', 'currency']),
    isFetching: state.getIn(['networkings', ...NETWORK_KEY_PATH, 'isFetching']),
  };
}
const mapDispatchToProps = dispatch => ({
  fetchMarketFinance: ({
    currency,
    order,
    page,
  }) => dispatch(fetchCoinMarketFinance({
    vs_currency: currency,
    order,
    page,
    networkKeyPath: NETWORK_KEY_PATH,
  })),
})


export default connect(mapStateToProps, mapDispatchToProps)(PairsListScreen)