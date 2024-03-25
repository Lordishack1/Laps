import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  SafeAreaView,
  StyleSheet,
  TouchableHighlight,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import * as Location from "expo-location";

const RecordScreen = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [location, setLocation] = useState(null);
  const [locationSubscription, setLocationSubscription] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [totalDistance, setTotalDistance] = useState(0);
  const [topSpeed, setTopSpeed] = useState(0);

  useEffect(() => {
    const startTracking = async () => {
      if (isTracking) {
        try {
          await Location.requestForegroundPermissionsAsync();
          const subscription = await Location.watchPositionAsync(
            { distanceInterval: 1 },
            (newLocation) => {
              updateLocation(newLocation);
            }
          );
          setLocationSubscription(subscription);
        } catch (error) {
          console.error("Error starting tracking:", error);
          setErrorMsg("Error starting tracking");
        }
      } else {
        if (locationSubscription) {
          try {
            locationSubscription.remove();
          } catch (error) {
            console.error("Error stopping tracking:", error);
          }
        }
      }
    };
    startTracking();
    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
        setLocationSubscription(null);
      }
    };
  }, [isTracking, locationSubscription]);

  const toggleTracking = () => {
    setIsTracking(!isTracking);
  };

  const updateLocation = (newLocation) => {
    if (location) {
      const distance = calculateDistance(location.coords, newLocation.coords);
      setTotalDistance(totalDistance + distance);
    }
    setLocation(newLocation);
  };

  const calculateDistance = (coords1, coords2) => {
    const R = 6371000; // Earth radius in meters
    const dLat = ((coords2.latitude - coords1.latitude) * Math.PI) / 180;
    const dLon = ((coords2.longitude - coords1.longitude) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((coords1.latitude * Math.PI) / 180) *
        Math.cos((coords2.latitude * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    const distanceMiles = distance * 0.000621371;
    return distanceMiles;
  };

  const topSpeedChecker = (speed) => {
    if (speed > topSpeed) {
      setTopSpeed(speed);
    }
    return topSpeed;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flexy}>
        <Text style={styles.tQuestion}>What will you be riding today?</Text>
      </View>
      <View style={styles.qContainer}>
        <Pressable style={styles.button}>
          <Image
            style={styles.snowboardingImg}
            source={require("../assets/snowboarding.png")}
          ></Image>
        </Pressable>
        <Pressable style={styles.button}>
          <Image
            style={styles.snowboardingImg}
            source={require("../assets/skiing.png")}
          ></Image>
        </Pressable>
      </View>
      <View style={styles.stats}>
        <Text>Todays Stats</Text>
      </View>
      <View style={styles.bord}>
        <View style={styles.stat1}>
          <Text>
            {location?.coords?.speed
              ? topSpeedChecker(location.coords.speed * 2.23694).toFixed(2)
              : topSpeed.toFixed(2)}{" "}
            MPH
          </Text>
          <Text>Top Speed</Text>
          <Text>
            {location?.coords?.speed
              ? (location.coords.speed * 2.23694).toFixed(2)
              : "0.00"}{" "}
            MPH
          </Text>
          <Text>current Speed</Text>
        </View>
        <View style={styles.container2}>
          <View style={styles.stat2}>
            <Text>1586 ft</Text>
            <Text>Vertical</Text>
          </View>
          <View style={styles.stat2}>
            <Text>{totalDistance.toFixed(2)}M</Text>
            <Text>Distance</Text>
          </View>
          <View style={styles.stat2}>
            <Text>75</Text>
            <Text>Total Runs</Text>
          </View>
        </View>
      </View>
      <View style={styles.record}>
        {isTracking ? (
          <Button
            title="STOP RECORDING"
            onPress={() => {
              toggleTracking();
            }}
          ></Button>
        ) : (
          <Button
            title="RECORD"
            onPress={() => {
              toggleTracking();
            }}
          ></Button>
        )}
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
