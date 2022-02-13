/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { View } from 'react-native';

import configureStore from '../reducers/configureStore';

import PairsListScreen from '../containers/PairListScreen';
import PairDetailScreen from '../containers/PairDetaileScreen';
import SearchScreen from '../containers/SearchScreen';
import AboutScreen from '../screens/AboutScreen';

const store = configureStore();

export default function Navigation() {
  return (
    <Provider store={store}>
      <NavigationContainer theme={DarkTheme}>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const RootStack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name="Root" component={PairsListScreen} options={{ headerShown: false }} />
      <RootStack.Screen name="PairDetail" component={PairDetailScreen} options={{ headerShown: false }} />
      <RootStack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
      {/* <RootStack.Screen name="CurrencySelect" component={TabOneScreen} options={{ headerShown: false }} /> */}
      {/* <RootStack.Screen name="SortSelect" component={TabOneScreen} options={{ headerShown: false }} /> */}
      <RootStack.Group screenOptions={{ presentation: 'modal' }}>
        <RootStack.Screen name="AboutTarget" component={AboutScreen} options={{ headerShown: false }} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
}
