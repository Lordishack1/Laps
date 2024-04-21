import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import * as Location from "expo-location";
import { useUser } from "../context/userContext.js";
import MatComIcons from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";

const RecordScreen = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [location, setLocation] = useState(null);
  const [locationSubscription, setLocationSubscription] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const { totalDistance, setTotalDistance } = useUser();
  const [tempTotalDistance, setTempTotalDistance] = useState(0);
  const { topSpeed, setTopSpeed } = useUser();
  const [tempTopSpeed, setTempTopSpeed] = useState(0);
  const [snowboardingt, setSnowboardingt] = useState(false);
  const { snowboarding, setSnowboarding } = useUser();
  const [skiingt, setSkiingt] = useState();
  const { skiing, setSkiing } = useUser();
  const { userEmail } = useUser();
  const [first, setfirst] = useState(true);

  useEffect(() => {
    const startTracking = async () => {
      if (isTracking) {
        try {
          await Location.requestForegroundPermissionsAsync();
          const subscription = await Location.watchPositionAsync(
            { timeInterval: 2 },
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

  useEffect(() => {
    if (!isTracking && first == false) {
      userStateSet();
      handleData(userEmail, topSpeed, totalDistance, snowboarding, skiing);
    }
  }, [isTracking]);

  const userStateSet = () => {
    setTotalDistance(tempTotalDistance);
    setSkiing(skiingt);
    setSnowboarding(snowboardingt);
    setTopSpeed(tempTopSpeed);
  };

  const toggleTracking = () => {
    if (skiingt || snowboardingt) {
      if (skiingt) {
        toggleSkiing();
      } else {
        toggleSnowboarding();
      }
      setIsTracking(!isTracking);
      setfirst(false);
      if (isTracking) {
        handleEntry();
      }
    } else {
      alert("Please select Skiing or Snowboarding");
    }
  };

  const toggleSnowboarding = () => {
    if (!snowboardingt) {
      setSnowboardingt(true);
      setSkiingt(false);
    }
  };

  const toggleSkiing = () => {
    if (!skiingt) {
      setSkiingt(true);
      setSnowboardingt(false);
    }
  };

  const handleEntry = () => {
    setTempTotalDistance(0);
    setTempTopSpeed(0);
    setSkiingt(false);
    setSnowboardingt(false);
  };

  const handleData = async () => {
    try {
      console.log(
        "speed: " +
          topSpeed +
          " Distance: " +
          totalDistance +
          " email: " +
          userEmail
      );
      if (!userEmail || !topSpeed || !totalDistance) {
        alert("error in handle entry");
        return;
      }

      const { data } = await axios.post(
        "http://192.168.1.19:8080/api/v1/auth/record",
        { userEmail, topSpeed, totalDistance, snowboarding, skiing }
      );

      alert(data && data.message);
      console.log(
        "speed, distance, snowboarding, skiing: " +
          data.topSpeed +
          " " +
          data.totalDistance +
          " " +
          data.snowboarding +
          " " +
          data.skiing
      );
    } catch (error) {
      console.log(error);
    }
  };

  const updateLocation = (newLocation) => {
    if (location) {
      const distance = calculateDistance(location.coords, newLocation.coords);
      setTempTotalDistance((prevTotalDistance) => prevTotalDistance + distance);

      if (newLocation.coords.speed > tempTopSpeed) {
        setTempTopSpeed(newLocation.coords.speed);
      }
    }
    setLocation(newLocation);
  };

  const calculateDistance = (coords1, coords2) => {
    const R = 6371000;
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
    if (speed > tempTopSpeed) {
      setTempTopSpeed(speed);
    }
    return tempTopSpeed;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flexy}>
        <Text style={styles.tQuestion}>What will you be riding today?</Text>
      </View>
      <View style={styles.qContainer}>
        <Pressable
          style={snowboardingt ? styles.buttonLeft : styles.buttonLeft2}
          onPress={toggleSnowboarding}
        >
          <Image
            style={styles.snowboardingImg}
            source={require("../assets/snowboarding.png")}
          ></Image>
        </Pressable>
        <Pressable
          style={skiingt ? styles.buttonRight : styles.buttonRight2}
          onPress={toggleSkiing}
        >
          <Image
            style={styles.snowboardingImg}
            source={require("../assets/skiing.png")}
          ></Image>
        </Pressable>
      </View>
      <View style={styles.stats}>
        <Text style={styles.sizeF}>Todays Stats</Text>
      </View>
      <View style={styles.bord}>
        <View style={styles.stat1}>
          <Text style={styles.sizeF}>{tempTotalDistance.toFixed(2)}M</Text>
          <Text style={styles.sizeF}>Distance</Text>
        </View>
        <View style={styles.container2}>
          <View style={styles.stat2}>
            <Text style={styles.sizeF}>
              {location?.coords?.speed
                ? (location.coords.speed * 2.23694).toFixed(2)
                : "0.00"}
              MPH
            </Text>
            <Text style={styles.sizeF}>current Speed</Text>
          </View>
          <View style={styles.stat2}>
            <Text style={styles.sizeF}>
              {location?.coords?.speed
                ? topSpeedChecker(location.coords.speed * 2.23694).toFixed(2)
                : tempTopSpeed.toFixed(2)}
              MPH
            </Text>
            <Text style={styles.sizeF}>Top Speed</Text>
          </View>
        </View>
      </View>
      <View style={styles.record}>
        {isTracking ? (
          <MatComIcons
            name="pause-circle-outline"
            size="65"
            color="red"
            //title="STOP RECORDING"
            onPress={() => {
              toggleTracking();
            }}
          ></MatComIcons>
        ) : (
          <MatComIcons
            name="record-circle-outline"
            size="65"
            color="red"
            //title="RECORD"
            onPress={() => {
              toggleTracking();
            }}
          ></MatComIcons>
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
  sizeF: {
    fontSize: 20,
  },
  stat1: {
    flex: 1,
    alignItems: "center",
    paddingTop: "10%",
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
    width: width * 0.37,
    resizeMode: "cover",
  },
  buttonLeft: {
    padding: "3.5%",
    borderWidth: "2%",
    borderRadius: 40,
    height: height * 0.25,
    marginRight: "2%",
    backgroundColor: "lightgrey",
  },
  buttonLeft2: {
    padding: "3.5%",
    borderWidth: "2%",
    borderRadius: 40,
    height: height * 0.25,
    marginRight: "2%",
  },
  buttonRight: {
    padding: "5%",
    borderWidth: "2%",
    borderRadius: 40,
    height: height * 0.25,
    marginLeft: "2%",
    backgroundColor: "lightgrey",
  },
  buttonRight2: {
    padding: "5%",
    borderWidth: "2%",
    borderRadius: 40,
    height: height * 0.25,
    marginLeft: "2%",
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
    fontSize: 25,
  },
});

export default RecordScreen;
