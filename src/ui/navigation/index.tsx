import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import { RootStackParamList } from "../../data/types/navigation";
import BottomTabNavigator from "./BottomTabNavigator";
import IssuesDetailsScreen from "../screens/IssueDetailsScreen";
import { Color } from "../components";

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
          title: "Issue Details",
          headerBackTitle: "Back",
          headerTitleStyle: { fontFamily: "muli-extra-bold", color: Color.black },
        }}
        component={IssuesDetailsScreen}
      />
    </Stack.Navigator>
  );
}
