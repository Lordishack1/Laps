import React from "react";
import { View, Text, Button, SafeAreaView, StyleSheet } from "react-native";
// Things to measure every run: Runs, avg Speed, Distance, Time,
// Things to update every run if its beat: Top Speed, Tallest Run, Longest Run
function StatsScreen(props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bord}>
        <View style={styles.stat1}>
          <Text>12 mph</Text>
          <Text>Top Speed</Text>
        </View>
        <View style={styles.container2}>
          <View style={styles.stat2}>
            <Text>1586 ft</Text>
            <Text>Tallest Run</Text>
          </View>
          <View style={styles.stat2}>
            <Text>0.8 m</Text>
            <Text>Longest Run</Text>
          </View>
          <View style={styles.stat2}>
            <Text>75</Text>
            <Text>Total Runs</Text>
          </View>
        </View>
      </View>
      <View style={styles.log}>
        <Text>Log:</Text>
        <View style={styles.entry}>
          <Text>No Logged Trips!</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  entry: {
    borderWidth: "2%",
    borderColor: "black",
    borderRadius: 5,
  },
  log: {
    display: "flex",
    flex: 1,
    padding: "4%",
  },
  stat1: {
    flex: 1,
    alignItems: "center",
    paddingTop: "7%",
  },
  stat2: {
    flex: 1,
    alignItems: "center",
    padding: "4%",
    paddingBottom: "10%",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  container2: {
    display: "flex",
    flexDirection: "row",
  },
  bord: {
    display: "flex",
    flexDirection: "column",
    borderWidth: "2%",
    borderColor: "black",
    borderRadius: 15,
    height: "30%",
    margin: "3%",
    padding: "2%",
  },
  tQuestion: {
    fontSize: `120%`,
    justifyContent: "center",
  },
});

export default StatsScreen;
