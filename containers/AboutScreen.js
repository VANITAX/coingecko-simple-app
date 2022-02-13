import { connect } from 'react-redux';
import AboutScreen from '../screens/AboutScreen';

const mapStateToProps = (state, { route }) => {
  const { dataKey } = route.params;
  const id = state.getIn(['finances', dataKey, 'id']);
  return {
    symbol: state.getIn(['finances', dataKey, 'symbol']),
    description: state.getIn(['coins', id, 'description', 'en']),
  }
};

export default connect(mapStateToProps, null)(AboutScreen)