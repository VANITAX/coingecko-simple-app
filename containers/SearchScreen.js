import { connect } from 'react-redux';
import SearchScreen from '../screens/SearchScreen';

import fetchSearch from '../actions/fetchSearch';

const NETWORK_KEY_PATH = ['list', 'search'];

const mapStateToProps = state => ({
  itemIds: state.getIn(['lists','search', 'itemIds'])?.toJS() || [],
  currency: state.getIn(['filters','search', 'currency']),
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
})


export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen)