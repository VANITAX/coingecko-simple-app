import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { View } from 'react-native';

import configureStore from '../reducers/configureStore';

import FilterSelectScreen from '../containers/FilterSelectScreen';
import PairDetailScreen from '../containers/PairDetaileScreen';
import PairsListScreen from '../containers/PairListScreen';
import SearchScreen from '../containers/SearchScreen';
import AboutScreen from '../containers/AboutScreen';

const store = configureStore();
const RootStack = createNativeStackNavigator();


export default function Navigation() {
  return (
    <Provider store={store}>
      <NavigationContainer theme={DarkTheme}>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
}

function RootNavigator() {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name="Root" component={PairsListScreen} options={{ headerShown: false }} />
      <RootStack.Screen name="PairDetail" component={PairDetailScreen} options={{ headerShown: false }} />
      <RootStack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
      <RootStack.Group screenOptions={{ presentation: 'modal' }}>
        <RootStack.Screen name="AboutTarget" component={AboutScreen} options={{ headerShown: false }} />
        <RootStack.Screen name="CurrencySelect" 
          component={FilterSelectScreen} 
          options={{ headerShown: false }} 
          initialParams={{ filterKind: 'currency' }} />
        <RootStack.Screen 
          name="SortSelect" 
          component={FilterSelectScreen} 
          options={{ headerShown: false }} 
          initialParams={{ filterKind: 'sort_by' }}
        />
      </RootStack.Group>
    </RootStack.Navigator>
  );
}
