import React from "react";
import { View, Text, Button, SafeAreaView, StyleSheet } from "react-native";

function FriendsScreen(props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flexy}>
        <Text style={styles.tQuestion}>Coming Soon!</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  flexy: {
    flex: 0.1,
  },
  tQuestion: {
    paddingTop: "3%",
    fontSize: 25,
  },
});

export default FriendsScreen;
