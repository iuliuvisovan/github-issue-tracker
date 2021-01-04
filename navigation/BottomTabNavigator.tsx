import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import { Color } from '../components';
import Issues from '../screens/IssuesScreen';
import Bookmarks from '../screens/BookmarksScreen';
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator initialRouteName="Issues" tabBarOptions={{ activeTintColor: Color.blue }}>
      <BottomTab.Screen
        name="Issues"
        component={IssuesNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="check-square" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Bookmarks"
        component={BookmarksNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="star" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Feather size={25} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function IssuesNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="Issues"
        component={Issues}
        options={{
          headerTitle: 'Browse Issues',
          headerTitleStyle: { fontFamily: 'muli-extra-bold', color: Color.black },
        }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function BookmarksNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen name="TabTwoScreen" component={Bookmarks} options={{ headerTitle: 'Tab Two Title' }} />
    </TabTwoStack.Navigator>
  );
}
