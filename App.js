import React from "react";
import StartScreen from "./app/screens/StartScreen.js";
import RecordScreen from "./app/screens/RecordScreen.js";
import CreateUserScreen from "./app/screens/CreateUserScreen.js";
import FriendsScreen from "./app/screens/FriendsScreen.js";
import MapScreen from "./app/screens/MapScreen.js";
import SettingsScreen from "./app/screens/SettingsScreen.js";
import StatsScreen from "./app/screens/StatsScreen.js";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//rsf - react stateless function
//rnss - stylesheet

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavi = () => {
  return (
    <Tab.Navigator initialRouteName="Record">
      <Tab.Screen
        options={{ headerShown: false }}
        name="Map"
        component={MapScreen}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Friends"
        component={FriendsScreen}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Record"
        component={RecordScreen}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Stats"
        component={StatsScreen}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Settings"
        component={SettingsScreen}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={StartScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Create"
          component={CreateUserScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Tabs"
          component={TabNavi}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
