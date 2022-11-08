import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {BuddyList} from './src/screens/BuddyList';
import {BuddyDetail} from './src/screens/BuddyDetail';
import {BuddyCreate} from './src/screens/BuddyCreate';

export type NavigatorParamList = {
  List: undefined;
  Details: {
    buddy: Buddy;
  };
  Create: undefined;
};

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="List" component={BuddyList} />
        <Stack.Screen name="Details" component={BuddyDetail} />
        <Stack.Screen name="Create" component={BuddyCreate} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
