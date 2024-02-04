import React from "react";
import { View, Text, Button, SafeAreaView, StyleSheet } from "react-native";

function SettingsScreen(props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flexy}>
        <Text style={styles.tQuestion}>Settings Screen!!!</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  flexy: {
    flex: 1,
  },
  tQuestion: {
    fontSize: "20%",
    justifyContent: "center",
  },
});

export default SettingsScreen;
