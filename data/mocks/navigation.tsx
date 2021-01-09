import React, { FunctionComponent } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import IssueDetailsScreen from '../../ui/screens/IssueDetailsScreen';

const Stack = createStackNavigator();
const MockNavigation = ({ component, params = {} }: { component: FunctionComponent<any>; params?: object }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MockScreen" component={component} initialParams={params} />
        <Stack.Screen name="IssueDetails" component={IssueDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MockNavigation;
