import * as React from 'react';
import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { Color, Text } from '../components';
import IssuesScreen from '../screens/IssuesScreen';
import IssuesDetailsScreen from '../screens/IssueDetailsScreen';
import BookmarksScreen from '../screens/BookmarksScreen';
import { IBottomTabParamList, IIssuesStackParamList, IBookmarksStackParamList } from '../types/navigation';

const BottomTab = createBottomTabNavigator<IBottomTabParamList>();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator initialRouteName="Issues" tabBarOptions={{ activeTintColor: Color.blue }}>
      <BottomTab.Screen
        name="Issues"
        component={IssuesNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="check-square" color={color} />,
          tabBarLabel: ({ color }) => <Text style={{ fontSize: 11, fontFamily: 'muli', color }}>Issues</Text>,
        }}
      />
      <BottomTab.Screen
        name="Bookmarks"
        component={BookmarksNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="star" color={color} />,
          tabBarLabel: ({ color }) => <Text style={{ fontSize: 11, fontFamily: 'muli', color }}>Bookmarks</Text>,
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: { name: any; color: string }) {
  return <Feather size={25} style={{ marginBottom: -10 }} {...props} />;
}

const IssuesStack = createStackNavigator<IIssuesStackParamList>();

function IssuesNavigator() {
  return (
    <IssuesStack.Navigator>
      <IssuesStack.Screen
        name="Issues"
        component={IssuesScreen}
        options={{
          headerTitle: 'Browse Issues',
          headerTitleStyle: { fontFamily: 'muli-extra-bold', color: Color.black },
        }}
      />
      <IssuesStack.Screen
        name="IssueDetails"
        component={IssuesDetailsScreen}
        options={{
          headerTitle: 'Issue details',
          headerTitleStyle: { fontFamily: 'muli-extra-bold', color: Color.black },
        }}
      />
    </IssuesStack.Navigator>
  );
}

const BookmarksStack = createStackNavigator<IBookmarksStackParamList>();

function BookmarksNavigator() {
  return (
    <BookmarksStack.Navigator>
      <BookmarksStack.Screen name="Bookmarks" component={BookmarksScreen} options={{ headerTitle: 'Tab Two Title' }} />
    </BookmarksStack.Navigator>
  );
}
