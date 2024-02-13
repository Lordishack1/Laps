import React from "react";
import {
  View,
  Text,
  Button,
  SafeAreaView,
  StyleSheet,
  TouchableHighlight,
  Image,
  Dimensions,
} from "react-native";

const RecordScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flexy}>
        <Text style={styles.tQuestion}>What will you be riding today?</Text>
      </View>
      <View style={styles.qContainer}>
        <TouchableHighlight style={styles.button}>
          <Image
            style={styles.snowboardingImg}
            source={require("../assets/snowboarding.png")}
          ></Image>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button}>
          <Image
            style={styles.snowboardingImg}
            source={require("../assets/skiing.png")}
          ></Image>
        </TouchableHighlight>
      </View>
      <View style={styles.stats}>
        <Text>Previous run stats</Text>
      </View>

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
      <View style={styles.record}>
        <Button title="RECORD"></Button>
      </View>
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  record: {
    flex: 0.1,
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
  container2: {
    display: "flex",
    flexDirection: "row",
  },
  bord: {
    display: "flex",
    flex: 0.4,
    flexDirection: "column",
    borderWidth: "2%",
    borderColor: "black",
    borderRadius: 15,
    width: width * 0.9,
    padding: "2%",
  },
  stats: {
    flex: 0.05,
    marginTop: "10%",
  },
  snowboardingImg: {
    height: height * 0.2,
    width: width * 0.4,
    resizeMode: "cover",
  },
  button: {
    padding: "5%",
    borderWidth: "2%",
    height: height * 0.25,
  },
  qContainer: {
    flex: 0.3,
    flexDirection: "row",
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  flexy: {
    flex: 0.1,
  },
  tQuestion: {
    paddingTop: "3%",
    fontSize: "20%",
  },
});

export default RecordScreen;
