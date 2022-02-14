import { connect } from 'react-redux';
import clearPairsList from '../actions/clearPairsList';
import fetchSearch from '../actions/fetchSearch';
import SearchScreen from '../screens/SearchScreen';

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
  clearSearchResults: () => 
    dispatch(clearPairsList({ select: 'search' }))
})


export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen)