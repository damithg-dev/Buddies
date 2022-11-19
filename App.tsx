import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {BuddyList} from './src/screens/BuddyList';
import {BuddyDetail} from './src/screens/BuddyDetail';
import {BuddyCreate} from './src/screens/BuddyCreate';

import {BuddyRealmContext} from './src/realm';
import {BuddiesProvider} from './src/realm/Service';
import {BuddyEdit} from './src/screens/BuddyEdit';

export type NavigatorParamList = {
  List: undefined;
  Details: {
    buddy: IBuddy;
  };
  Create: undefined;
  Edit: {
    buddy: IBuddy;
  };
};

const Stack = createNativeStackNavigator();
const {RealmProvider} = BuddyRealmContext;

export default function App() {
  return (
    <RealmProvider>
      <BuddiesProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="List" component={BuddyList} />
            <Stack.Screen name="Details" component={BuddyDetail} />
            <Stack.Screen name="Create" component={BuddyCreate} />
            <Stack.Screen name="Edit" component={BuddyEdit} />
          </Stack.Navigator>
        </NavigationContainer>
      </BuddiesProvider>
    </RealmProvider>
  );
}
