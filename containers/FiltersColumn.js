import { connect } from 'react-redux';
import FiltersColumn from '../components/FiltersColumn';

const mapStateToProps = (state, ownProps) => {
  const { screen } = ownProps;
  const selectScreen = screen || 'list';
  return {
    sorting: state.getIn(['filters',selectScreen, 'sort_by']),
    currency: state.getIn(['filters',selectScreen, 'currency']),
  };
}

export default connect(mapStateToProps, null)(FiltersColumn)