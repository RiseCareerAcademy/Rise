/* Redux */
import { connect } from 'react-redux';
import { reduxifyNavigator } from 'react-navigation-redux-helpers';
import reducer from './reducer';

/* Routes */
import AppNavigator from './AppNavigator';

const { navReducer, navMiddleware } = reducer(AppNavigator);

const App = reduxifyNavigator(AppNavigator, 'root');
const mapStateToProps = state => ({
  state: state.nav,
});

const Navigator = connect(mapStateToProps)(App);

export { Navigator, navReducer, navMiddleware };
