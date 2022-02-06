/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ColorSchemeName, Pressable } from 'react-native';
import { Provider } from 'react-redux';

import store from '../reducers/createInitStore';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import CoinList from '../screens/CoinList';

export default function Navigation({ colorScheme }) {
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
const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={CoinList} options={{ headerShown: false }} />
      {/* <Stack.Screen name="CurrencySelect" component={TabOneScreen} options={{ headerShown: false }} /> */}
      {/* <Stack.Screen name="SortSelect" component={TabOneScreen} options={{ headerShown: false }} /> */}
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
