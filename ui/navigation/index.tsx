import * as React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Color } from '../components';
import BottomTabNavigator from './BottomTabNavigator';
import IssuesDetailsScreen from '../screens/IssueDetailsScreen';

import { RootStackParamList } from '../../data/types/navigation';

export default function Navigation() {
  return (
    <NavigationContainer theme={DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="Root" component={BottomTabNavigator} />
      <Stack.Screen
        name="IssueDetails"
        options={{
          title: 'Issue Details',
          headerBackTitle: 'Back',
          headerTitleStyle: { fontFamily: 'muli-extra-bold', color: Color.black },
        }}
        component={IssuesDetailsScreen}
      />
    </Stack.Navigator>
  );
}
