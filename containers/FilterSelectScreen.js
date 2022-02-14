import { connect } from 'react-redux';
import selectFilterOption from '../actions/selectFilterOption';
import FilterSelectScreen from '../screens/FilterSelectScreen';

const mapStateToProps = (state, { route }) => {
  const { filterKind, screen } = route.params;
  return {
    filterKind, screen,
    current_selected: state.getIn(['filters', screen, filterKind]),
  }
};

const mapDispatchToProps = dispatch => ({
  selectOptions: ({screen, filter, value}) => 
    dispatch(selectFilterOption({screen, filter, value}))
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterSelectScreen);