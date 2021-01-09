import * as React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { Color, Text } from '../components';
import IssuesScreen from '../screens/IssuesScreen';
import BookmarksScreen from '../screens/BookmarksScreen';
import { BottomTabParamList, IssuesStackParamList, BookmarksStackParamList } from '../../data/types/navigation';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator initialRouteName="Issues" tabBarOptions={{ activeTintColor: Color.blue }}>
      <BottomTab.Screen
        name="Issues"
        component={IssuesNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="github" color={color} />,
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
  return <AntDesign size={25} style={{ marginBottom: -8 }} {...props} />;
}

const IssuesStack = createStackNavigator<IssuesStackParamList>();

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
    </IssuesStack.Navigator>
  );
}

const BookmarksStack = createStackNavigator<BookmarksStackParamList>();

function BookmarksNavigator() {
  return (
    <BookmarksStack.Navigator>
      <BookmarksStack.Screen
        name="Bookmarks"
        component={BookmarksScreen}
        options={{
          headerTitle: 'Bookmarks',
          headerTitleStyle: { fontFamily: 'muli-extra-bold', color: Color.black },
        }}
      />
    </BookmarksStack.Navigator>
  );
}
