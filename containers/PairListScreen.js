import { connect } from 'react-redux';
import PairsListScreen from '../screens/PairsListScreen';

import fetchCoinMarketFinanceList from '../actions/fetchCoinMarketFinanceList';
import clearPairsList from '../actions/clearPairsList';

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
  fetchCoinFinanceList: ({
    vs_currency,
    order,
    page,
  }) => dispatch(fetchCoinMarketFinanceList({
    vs_currency,
    order,
    page,
    networkKeyPath: NETWORK_KEY_PATH,
  })),
  clearPairsList: () => dispatch(clearPairsList({ screen: 'list' }))
})


export default connect(mapStateToProps, mapDispatchToProps)(PairsListScreen)