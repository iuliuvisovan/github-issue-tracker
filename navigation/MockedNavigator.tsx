import React, { FunctionComponent } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
const MockedNavigator = ({ component, params = {} }: { component: FunctionComponent<any>; params?: object }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MockedScreen" component={component} initialParams={params} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MockedNavigator;
