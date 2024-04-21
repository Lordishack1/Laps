import React, { useState } from "react";
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
import { UserProvider } from "./app/context/userContext.js";
import { DarkModeProvider } from "./app/context/darkModeContext.js";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwsome from "@expo/vector-icons/FontAwesome5.js";
import MatComIcons from "react-native-vector-icons/MaterialCommunityIcons";
import IonIcons from "react-native-vector-icons/Ionicons";
import Octicons from "react-native-vector-icons/Octicons";
//rsf - react stateless function
//rnss - stylesheet

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavi = () => {
  return (
    <Tab.Navigator initialRouteName="Record">
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarLabel: "Map",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="map" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Friends"
        component={FriendsScreen}
        options={{
          tabBarLabel: "Friends",
          tabBarIcon: ({ color, size }) => (
            <FontAwsome name="user-friends" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Record"
        component={RecordScreen}
        options={{
          tabBarLabel: "Record",
          tabBarIcon: ({ color, size }) => (
            <MatComIcons
              name="record-circle-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Stats"
        component={StatsScreen}
        options={{
          tabBarLabel: "Stats",
          tabBarIcon: ({ color, size }) => (
            <IonIcons name="stats-chart-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Octicons name="gear" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <UserProvider>
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
    </UserProvider>
  );
};

export default App;
