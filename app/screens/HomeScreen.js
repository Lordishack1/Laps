import React from "react";
import { View, Text, Button, SafeAreaView, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../actions/actions";

const HomeScreen = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Dispatch the logoutUser action
    dispatch(logoutUser());
  };

  return (
    <View>
      {isLoggedIn ? (
        <View>
          <Text>Welcome, {user.username}!</Text>
          <Button title="Logout" onPress={handleLogout} />
        </View>
      ) : (
        <Text>You are not logged in</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
  },
  content: {
    flex: 1,
  },
  footer: {
    backgroundColor: "blue",
    padding: 40,
  },
});

export default HomeScreen;
