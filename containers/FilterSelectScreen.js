import { connect } from 'react-redux';
import FilterSelectScreen from '../screens/FilterSelectScreen';
import selectFilterOption from '../actions/selectFilterOption';

const mapStateToProps = (state, { route }) => {
  const { filterKind, screen } = route.params;
  return {
    filterKind, screen,
    current_selected: state.getIn(['filters', screen, filterKind]),
  }
};

const mapDispatchToProps = dispatch => ({
  selectOptions: ({screen, filter, value}) => dispatch(selectFilterOption({screen, filter, value}))
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterSelectScreen);