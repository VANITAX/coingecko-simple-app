import { connect } from 'react-redux';
import SearchScreen from '../screens/SearchScreen';

import fetchSearch from '../actions/fetchSearch';
import clearPairsList from '../actions/clearPairsList';

const NETWORK_KEY_PATH = ['list', 'search'];

const mapStateToProps = state => ({
  itemIds: state.getIn(['lists','search', 'itemIds'])?.toJS() || [],
  currency: state.getIn(['filters','list', 'currency']),
  isFetching: state.getIn(['networkings', ...NETWORK_KEY_PATH, 'isFetching']),
});

const mapDispatchToProps = dispatch => ({
  fetchSearch: ({
    query,
    vs_currency
  }) => dispatch(fetchSearch({
    query,
    vs_currency,
    networkKeyPath: NETWORK_KEY_PATH,
  })),
  clearSearchResults: () => dispatch(clearPairsList({ screen: 'search' }))
})


export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen)